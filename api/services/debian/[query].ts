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

  if (/[^a-zA-Z0-9_-]/.test(query)) {
    return sendError(res, new Error('Invalid characters'));
  }

  try {
    const response = await fetch(
      `https://packages.debian.org/buster/${encodeURIComponent(query)}`,
      'GET'
    );
    const body = await response.text();
    const availability = body.includes('No such package');
    send(res, { availability });
  } catch (err) {
    sendError(res, err);
  }
}
