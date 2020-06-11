import isURL from 'validator/lib/isURL';
import {send, sendError, fetch, NowRequest, NowResponse} from '../util/http';

export default async function handler(
  req: NowRequest,
  res: NowResponse,
): Promise<void> {
  const {query} = req.query;

  if (!query) {
    return sendError(res, new Error('no query given'));
  }

  if (!isURL(query)) {
    return sendError(res, new Error('Invalid URL: ' + query));
  }

  try {
    const response = await fetch(`https://${query}`);
    const availability = response.status === 404;
    send(res, {availability});
  } catch (err) {
    console.log(err.code);
    if (err.code === 'ENOTFOUND') {
      return send(res, {availability: true});
    }
    sendError(res, err);
  }
}
