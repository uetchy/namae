import { send, sendError, fetch, NowRequest, NowResponse } from '../util/http'

export default async function handler(req: NowRequest, res: NowResponse) {
  const { query } = req.query

  if (!query) {
    return sendError(res, new Error('no query given'))
  }

  try {
    const response = await fetch(
      `https://packages.debian.org/buster/${encodeURIComponent(query)}`,
      'GET'
    )
    const body = await response.text()
    const availability = body.includes('No such package')
    send(res, { availability })
  } catch (err) {
    sendError(res, err)
  }
}
