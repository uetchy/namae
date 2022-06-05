import { VercelRequest, VercelResponse } from '@vercel/node';
import 'cross-fetch';
import whoiser from 'whoiser';
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
    const response = await whoiser(query, { follow: 1, timeout: 5000 });
    const first = Object.values<any>(response)[0];
    if (first.error) {
      throw new Error(`Got error while querying for ${query}: ${first.error}`);
    }
    try {
      const availability = first['Domain Status'].length > 0 ? false : true;
      send(res, { availability });
    } catch (err) {
      console.log(response);
    }
  } catch (err: any) {
    sendError(res, err);
  }
}
