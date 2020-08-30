import whois from 'whois-json';
import { send, sendError } from '../../../util/http';
import { NowRequest, NowResponse } from '@vercel/node';

export default async function handler(
  req: NowRequest,
  res: NowResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  try {
    const response = await whois(query, { follow: 3, verbose: true });
    const availability = response[0].data.domainName ? false : true;
    send(res, { availability });
  } catch (err) {
    sendError(res, err);
  }
}
