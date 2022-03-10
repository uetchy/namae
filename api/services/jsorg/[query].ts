import { VercelRequest, VercelResponse } from '@vercel/node';
import { VM } from 'vm2';
import { fetch, send, sendError } from '../../../util/http';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  if (!/([a-zA-Z0-9_-])\.js\.org/.test(query)) {
    return sendError(res, new Error('Invalid format'));
  }

  const cname = query.replace(/\.js\.org$/, '');

  try {
    // Get cnames from js.org repo
    const source = await fetch(
      `https://raw.githubusercontent.com/js-org/js.org/master/cnames_active.js`,
      'GET'
    ).then((res) => res.text());
    const vm = new VM();
    vm.run(source);
    const cnames = Object.keys(vm.sandbox.cnames_active);

    if (cnames.includes(cname)) {
      send(res, { availability: false });
    } else {
      send(res, { availability: true });
    }
  } catch (err: any) {
    sendError(res, err);
  }
}
