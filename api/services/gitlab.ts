import {send, sendError, fetch, NowRequest, NowResponse} from '../util/http';
import nodeFetch from 'node-fetch'

export default async function handler(req: NowRequest, res: NowResponse) {
  const {query} = req.query;

  if (!query) {
    return sendError(res, new Error('no query given'));
  }

  if (
    /[^\w-]/.test(
      query,
    )
  ) {
    return sendError(res, new Error('invalid characters'));
  }

  try {
    const response = await nodeFetch(`https://gitlab.com/${query}`, {redirect: 'manual'});
    const availability = response.status === 302;
    send(res, {availability});
  } catch (err) {
    sendError(res, err);
  }
}
