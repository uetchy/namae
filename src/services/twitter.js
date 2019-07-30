const fetch = require('isomorphic-unfetch')

async function getTwitterAvailability(name) {
  const twitterURL = 'https://twitter.com'
  const response = await fetch(`${twitterURL}/${encodeURIComponent(name)}`)
  return response.status === 404
}

module.exports = async (req, res) => {
  const name = req.query.name

  if (!name) {
    return res.status(400).json({ error: 'no query given' })
  }

  try {
    const availability = await getTwitterAvailability(name)
    res.json({ availability })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
}
