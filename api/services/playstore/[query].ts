import { VercelRequest, VercelResponse } from '@vercel/node';
import 'cross-fetch';
import { fetch, send, sendError } from '../../../util/http';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  try {
    const responseText = await fetch(
      `https://play.google.com/store/search?c=apps&q=${encodeURIComponent(
        query
      )}`,
      'GET'
    ).then((res) => res.text());

    const response = JSON.parse(
      responseText.match(
        /AF_initDataCallback.+?hash: '7'.+?data:([\w\W]+?), sideChannel/m
      )?.[1] ?? ''
    );

    console.log(JSON.stringify(response[0][1][0][22][0][0][0], null, 2));

    const list = response[0][1][0][22][0];

    const apps = list.map((entry: any) => ({
      id: entry[0][0][0],
      name: entry[0][3],
      description: entry[0][13][1],
      author: entry[0][14],
      url: 'https://play.google.com' + entry[0][10][4][2],
    }));
    send(res, { result: apps.slice(0, 5) });
  } catch (err: any) {
    sendError(res, err);
  }
}

class WeirdJSONReader {
  p = 0;
  c = 0;
  buf: string;

  constructor(buf: string) {
    this.buf = buf;
  }

  parse() {
    this.verify();
    const jsons = [];
    while (this.c < this.buf.length) {
      jsons.push(JSON.parse(this.eatPayload()));
    }
    return jsons;
  }

  verify() {
    if (!this.buf.startsWith(")]}'")) {
      throw new Error('Invalid payload');
    }
    this.c = 6;
  }

  eatHeader() {
    this.p = this.c;
    while (this.buf[this.c] !== '\n' && this.c < this.buf.length) {
      this.c += 1;
    }
    return Number(this.buf.slice(this.p, this.c));
  }

  eatPayload() {
    const blen = this.eatHeader();
    this.p = this.c;
    this.c = this.c + blen;
    return this.buf.slice(this.p, this.c);
  }
}
