import {send, sendError, fetch, NowRequest, NowResponse} from '../util/http';

export default async function handler(req: NowRequest, res: NowResponse) {
  const {query} = req.query;

  if (!query) {
    return sendError(res, new Error('No query given'));
  }

  if (/[^a-zA-Z0-9_-]/.test(query)) {
    return sendError(res, new Error('Invalid characters'));
  }

  try {
    const response = await fetch(
      `https://${encodeURIComponent(query)}.slack.com`,
    );
    const availability = response.status !== 200;
    send(res, {availability});
  } catch (err) {
    sendError(res, err);
  }
}
