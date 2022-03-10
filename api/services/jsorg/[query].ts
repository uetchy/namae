import { VercelRequest, VercelResponse } from '@vercel/node';
import { fetch, send, sendError } from '../../../util/http';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  if (!/([a-zA-Z0-9_-])\.js\.org/.test(query)) {
    return sendError(res, new Error('Invalid format'));
  }

  const cname = query.replace(/\.js\.org$/, '');

  try {
    // Get cnames from js.org repo
    const source = await fetch(
      `https://raw.githubusercontent.com/js-org/js.org/master/cnames_active.js`,
      'GET'
    ).then((res) => res.text());
    const cnames = Array.from(source.matchAll(/^  "(.+)":/gm)).map((m) => m[1]);

    if (cnames.includes(cname)) {
      send(res, { availability: false });
    } else {
      send(res, { availability: true });
    }
  } catch (err: any) {
    console.log(err);
    sendError(res, err);
  }
}
