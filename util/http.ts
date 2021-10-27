import { VercelResponse } from '@vercel/node';
import nodeFetch from 'cross-fetch';

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'HEAD'
  | 'PATCH'
  | 'CONNECT'
  | 'TRACE';

export function fetch(
  url: string,
  method: HttpMethod = 'HEAD'
): Promise<Response> {
  return nodeFetch(url, {
    method,
  });
}

export function send(res: VercelResponse, data: object): void {
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.json(data);
}

export function sendError(res: VercelResponse, error: Error): void {
  res.status(400).json({ error: error.message });
}
