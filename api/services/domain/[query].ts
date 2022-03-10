import { VercelRequest, VercelResponse } from '@vercel/node';
import 'cross-fetch';
import whois from 'whois-json';
import { send, sendError } from '../../../util/http';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  try {
    const response = await whois(query, { follow: 3, verbose: true });
    const availability = response[0].data.domainName ? false : true;
    send(res, { availability });
  } catch (err: any) {
    sendError(res, err);
  }
}
