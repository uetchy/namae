const { send, sendError, fetch } = require('../util/http')

module.exports = async (req, res) => {
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
