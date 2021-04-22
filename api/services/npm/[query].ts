import npmName from 'npm-name';
import { send, sendError } from '../../../util/http';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  try {
    const availability = await npmName(query);
    send(res, { availability });
  } catch (err) {
    sendError(res, err);
  }
}
