import { NowRequest, NowResponse } from '@vercel/node';
import fetch from 'cross-fetch';
import { send, sendError } from '../../../util/http';

export default async function handler(
  req: NowRequest,
  res: NowResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  try {
    const response = await fetch(
      `https://domainr.p.rapidapi.com/v2/search?query=${encodeURIComponent(
        query
      )}`,
      {
        headers: {
          'X-RapidAPI-Key': process.env.DOMAINR_API_KEY,
        },
      }
    ).then((res) => res.json());
    send(res, response);
  } catch (err) {
    sendError(res, err);
  }
}
