import { NowResponse } from '@vercel/node';
import nodeFetch, { Response } from 'node-fetch';

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
  return nodeFetch(url, { method: method });
}

export function send(res: NowResponse, data: object): void {
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.json(data);
}

export function sendError(res: NowResponse, error: Error): void {
  res.status(400).json({ error: error.message });
}
