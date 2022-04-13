import { send, sendError, fetch } from '../../../util/http';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  const term = encodeURIComponent(query);

  try {
    const response = await fetch(
      `https://addons.mozilla.org/api/v5/addons/search/?app=firefox&appversion=100.0&type=extension&lang=en-US&q=${term}`,
      'GET'
    );
    const json = await response.json();
    console.log(json.results.map((i: any) => i.name));
    const items = json.results.map((item: any) => {
      const locale = item.name._default || 'en-US';
      return {
        id: item.id,
        name: item.name[locale],
        description: item.summary[locale],
        url: item.url,
        author: item.authors[0].name,
      };
    });
    send(res, { result: items.slice(0, 10) });
  } catch (err: any) {
    sendError(res, err);
  }
}
