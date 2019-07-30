const fetch = require('isomorphic-unfetch')

async function getAvailability(name) {
  const response = await fetch(`https://github.com/${encodeURIComponent(name)}`)
  return response.status !== 200
}

module.exports = async (req, res) => {
  const name = req.query.name

  if (!name) {
    return res.status(400).json({ error: 'no query given' })
  }

  try {
    const availability = await getAvailability(name)
    res.json({ availability })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
