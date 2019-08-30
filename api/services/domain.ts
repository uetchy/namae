import whois from 'whois-json'
import { send, sendError, NowRequest, NowResponse } from '../util/http'

export default async function handler(req: NowRequest, res: NowResponse) {
  const { query } = req.query

  if (!query) {
    return sendError(res, new Error('no query given'))
  }

  try {
    const response = await whois(query, { follow: 3, verbose: true })
    const availability = response[0].data.domainName ? false : true
    send(res, { availability })
  } catch (err) {
    sendError(res, err)
  }
}
