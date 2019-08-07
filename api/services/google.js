const { send, sendError, fetch } = require('../util/http')
const googleIt = require('google-it')

module.exports = async (req, res) => {
  const { query } = req.query

  return send(res, { result: [] }) // DISABLE

  if (!query) {
    return res.status(400).json({ error: 'no query given' })
  }

  try {
    const result = await googleIt({ query: query })
    send(res, { result: result || [] })
  } catch (err) {
    sendError(res, err)
  }
}
