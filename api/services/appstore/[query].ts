import { send, sendError, fetch } from '../../../util/http'
import { NowRequest, NowResponse } from '@vercel/node'

interface App {
  trackId: string
  trackName: string
  kind: string
  version: string
  price: string
  trackViewUrl: string
}

interface AppStoreResponse {
  results: App[]
}

export default async function handler(
  req: NowRequest,
  res: NowResponse
): Promise<void> {
  const { query, country } = req.query

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'))
  }

  const term = encodeURIComponent(query)
  const countryCode = country || 'us'
  const limit = 10

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?media=software&entity=software,iPadSoftware,macSoftware&country=${countryCode}&limit=${limit}&term=${term}`,
      'GET'
    )
    const body: AppStoreResponse = await response.json()
    const apps = body.results.map((app) => ({
      id: app.trackId,
      name: app.trackName,
      kind: app.kind,
      version: app.version,
      price: app.price,
      viewURL: app.trackViewUrl,
    }))
    send(res, { result: apps || [] })
  } catch (err) {
    sendError(res, err)
  }
}
