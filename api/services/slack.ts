import { send, sendError, fetch, NowRequest, NowResponse } from '../util/http'

export default async function handler(req: NowRequest, res: NowResponse) {
  const { query } = req.query

  if (!query) {
    return sendError(res, new Error('no query given'))
  }

  try {
    const response = await fetch(
      `https://${encodeURIComponent(query)}.slack.com`
    )
    const availability = response.status !== 200
    send(res, { availability })
  } catch (err) {
    if (err.code === 'ENOTFOUND') {
      send(res, { availability: true })
    } else {
      sendError(res, err)
    }
  }
}
