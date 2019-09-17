import dns from 'dns';
import {send, sendError, NowRequest, NowResponse} from '../util/http';

function resolvePromise(hostname: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    dns.resolve4(hostname, function(err, addresses) {
      if (err) return reject(err);
      resolve(addresses);
    });
  });
}

export default async function handler(req: NowRequest, res: NowResponse) {
  const {query} = req.query;

  if (!query) {
    return sendError(res, new Error('no query given'));
  }

  try {
    const response = await resolvePromise(query);
    const availability = response && response.length > 0 ? false : true;
    send(res, {availability});
  } catch (err) {
    if (err.code === 'ENODATA' || err.code === 'ENOTFOUND') {
      return res.status(200).json({availability: true});
    }
    sendError(res, err);
  }
}
