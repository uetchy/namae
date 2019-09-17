import npmName from 'npm-name';
import {send, sendError, NowRequest, NowResponse} from '../util/http';

export default async function handler(req: NowRequest, res: NowResponse) {
  const {query} = req.query;

  if (!query) {
    return sendError(res, new Error('no query given'));
  }

  try {
    const availability = await npmName(query);
    send(res, {availability});
  } catch (err) {
    sendError(res, err);
  }
}
