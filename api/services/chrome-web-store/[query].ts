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
      `https://chrome.google.com/webstore/ajax/item?hl=en&pv=20210820&count=112&category=extensions&searchTerm=${term}`,
      'POST'
    );
    const body = await response.text();
    const json = JSON.parse(body.slice(5));
    console.log(json[1][1][0]);
    const items = json[1][1].map((item: any) => ({
      id: item[0],
      name: item[1],
      description: item[6],
      url: item[37],
    }));
    send(res, { result: items.slice(0, 10) });
  } catch (err: any) {
    sendError(res, err);
  }
}
