import isURL from 'validator/lib/isURL';
import { send, sendError, fetch } from '../../../util/http';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query, existIf = '404' } = req.query;

  const availableStatus = (existIf as string).split(',').map((s) => s.trim());

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('no query given'));
  }

  if (!isURL(query)) {
    return sendError(res, new Error('Invalid URL: ' + query));
  }

  try {
    const response = await fetch(`https://${query}`);
    const availability = availableStatus.includes(response.status.toString());
    send(res, { availability });
  } catch (err: any) {
    if ((err as any).code === 'ENOTFOUND') {
      return send(res, { availability: true });
    }
    sendError(res, err);
  }
}
