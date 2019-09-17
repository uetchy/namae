import nodeFetch from 'isomorphic-unfetch';

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'HEAD'
  | 'PATCH'
  | 'CONNECT'
  | 'TRACE';

export interface NowRequest<T = {query: string}> {
  query: T;
}

export interface NowResponse {
  setHeader: (label: string, body: string) => void;
  json: (obj: object) => void;
  status: (code: number) => NowResponse;
  length: number;
}

export function fetch(url: string, method: HttpMethod = 'HEAD') {
  return nodeFetch(url, {method: method});
}

export function send(res: NowResponse, data: object) {
  res.setHeader('Cache-Control', 's-maxage=86400');
  res.json(data);
}

export function sendError(res: NowResponse, error: Error) {
  res.status(400).json({error: error.message});
}
