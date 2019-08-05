const { send, sendError, fetch } = require('../util/http')

module.exports = async (req, res) => {
  const name = req.query.name

  if (!name) {
    return sendError(res, new Error('no query given'))
  }

  try {
    const response = await fetch(
      `https://rubygems.org/gems/${encodeURIComponent(name)}`
    )
    const availability = response.status !== 200
    send(res, availability)
  } catch (err) {
    sendError(res, err)
  }
}
