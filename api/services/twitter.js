const { send, sendError, fetch } = require('../util/http')

async function getAvailability(name) {}

module.exports = async (req, res) => {
  const { query } = req.query

  if (!query) {
    return res.status(400).json({ error: 'no query given' })
  }

  try {
    const response = await fetch(
      `https://twitter.com/${encodeURIComponent(query)}`
    )
    const availability = response.status !== 200
    send(res, { availability })
  } catch (err) {
    sendError(res, err)
  }
}
