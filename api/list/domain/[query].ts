import { VercelRequest, VercelResponse } from '@vercel/node';
import assert from 'assert';
import fetch from 'cross-fetch';
import { send, sendError } from '../../../util/http';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query } = req.query;

  assert(process.env.DOMAINR_API_KEY);

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
  } catch (err: any) {
    sendError(res, err);
  }
}
