import { send, sendError, fetch } from '../../../util/http';
import { NowRequest, NowResponse } from '@vercel/node';

export default async function handler(
  req: NowRequest,
  res: NowResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  if (!/([a-zA-Z0-9_-])\.js\.org/.test(query)) {
    return sendError(res, new Error('Invalid format'));
  }

  try {
    // Get js.org domain data from js.org.json repo
    const domains = await fetch(
      `https://raw.githubusercontent.com/raikasdev/js.org.json/master/output/subdomains_registered.min.json`,
      'GET'
    ).then((res) => res.json());
    if (domains.includes(query)) {
      send(res, { availability: false });
    } else {
      send(res, { availability: true });
    }
  } catch (err) {
    sendError(res, err);
  }
}
