import npmName from 'npm-name'
import { send, sendError } from '../../../util/http'
import { NowRequest, NowResponse } from '@vercel/node'

export default async function handler(
  req: NowRequest,
  res: NowResponse
): Promise<void> {
  const { query } = req.query

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'))
  }

  try {
    const availability = await npmName(query)
    send(res, { availability })
  } catch (err) {
    sendError(res, err)
  }
}
