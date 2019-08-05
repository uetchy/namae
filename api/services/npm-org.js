const npmName = require('npm-name')
const { send, sendError } = require('../util/http')

module.exports = async (req, res) => {
  const { query } = req.query

  if (!query) {
    return sendError(res, new Error('no query given'))
  }

  try {
    const availability = await npmName(`@${query}`)
    send(res, { availability })
  } catch (err) {
    sendError(res, err)
  }
}
