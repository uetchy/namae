import {send, sendError, fetch, NowResponse, NowRequest} from '../util/http';

export default async function handler(
  req: NowRequest,
  res: NowResponse,
): Promise<void> {
  const {query} = req.query;

  if (!query) {
    return sendError(res, new Error('No query given'));
  }

  if (/[^a-zA-Z0-9_-]/.test(query)) {
    return sendError(res, new Error('Invalid characters'));
  }

  try {
    const response = await fetch(
      `https://spectrum.chat/${encodeURIComponent(query)}`,
      'GET',
    );
    const body = await response.text();
    const availability = body.includes(
      'You may be trying to view something that is deleted',
    );
    send(res, {availability});
  } catch (err) {
    sendError(res, err);
  }
}
