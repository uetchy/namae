const fetch = require('isomorphic-unfetch')
const npmName = require('npm-name')

async function getNpmOrgAvailability(name) {
  const npmOrgURL = 'https://www.npmjs.com/org'
  const response = await fetch(`${npmOrgURL}/${encodeURIComponent(name)}`)
  return response.status === 404
}

module.exports = async (req, res) => {
  const name = req.query.name
  if (!name) {
    return res.status(400).json({ error: 'no query given' })
  }
  const availability = await npmName.many([name])
  console.log(availability)
  res.json({ availability })
}
