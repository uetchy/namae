const npmName = require('npm-name')
const { send, sendError } = require('../util/http')

module.exports = async (req, res) => {
  const name = req.query.name

  if (!name) {
    return sendError(res, new Error('no query given'))
  }

  try {
    const availability = await npmName(`@${name}`)
    send(res, availability)
  } catch (err) {
    sendError(res, err)
  }
}
