const npmName = require('npm-name')

module.exports = async (req, res) => {
  const name = req.query.name

  if (!name) {
    return res.status(400).json({ error: 'no query given' })
  }

  try {
    const availability = await npmName(`@${name}`)
    res.json({ availability })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
