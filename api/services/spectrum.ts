import { send, sendError, fetch, NowResponse, NowRequest } from '../util/http'

export default async function handler(req: NowRequest, res: NowResponse) {
  const { query } = req.query

  if (!query) {
    return sendError(res, new Error('no query given'))
  }

  try {
    const response = await fetch(
      `https://spectrum.chat/${encodeURIComponent(query)}`,
      'GET'
    )
    const body = await response.text()
    const availability = body.includes(
      'You may be trying to view something that is deleted'
    )
    send(res, { availability })
  } catch (err) {
    sendError(res, err)
  }
}
