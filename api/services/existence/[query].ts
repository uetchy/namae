import isURL from 'validator/lib/isURL';
import { send, sendError, fetch } from '../../../util/http';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('no query given'));
  }

  if (!isURL(query)) {
    return sendError(res, new Error('Invalid URL: ' + query));
  }

  try {
    const response = await fetch(`https://${query}`);
    const availability = response.status === 404;
    send(res, { availability });
  } catch (err: any) {
    if ((err as any).code === 'ENOTFOUND') {
      return send(res, { availability: true });
    }
    sendError(res, err);
  }
}
