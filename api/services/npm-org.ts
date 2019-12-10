import npmName from 'npm-name';
import {send, sendError, fetch, NowRequest, NowResponse} from '../util/http';

export default async function handler(req: NowRequest, res: NowResponse) {
  const {query} = req.query;

  if (!query) {
    return sendError(res, new Error('No query given'));
  }

  try {
    const availability = await npmName(`@${query}`);
    send(res, {availability});
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      return send(res, {availability: true});
    }
    sendError(res, err);
  }
}
