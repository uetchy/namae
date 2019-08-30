import { send, sendError, fetch, NowRequest, NowResponse } from '../util/http'

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
  req: NowRequest<{ query: string; country: string }>,
  res: NowResponse
) {
  const { query, country } = req.query

  if (!query) {
    return sendError(res, new Error('no query given'))
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
