const { send, sendError, fetch } = require('../util/http')

module.exports = async (req, res) => {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({ error: 'no query given' })
  }

  const term = encodeURIComponent(query)
  const country = 'us'
  const limit = 3

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?media=software&entity=software,iPadSoftware,macSoftware,softwareDeveloper&country=${country}&limit=${limit}&term=${term}`,
      'GET'
    )
    const body = await response.json()
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
