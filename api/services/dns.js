var dns = require('dns')

function resolvePromise(hostname) {
  return new Promise((resolve, reject) => {
    dns.resolve4(hostname, function(err, addresses) {
      if (err) return reject(err)
      resolve(addresses)
    })
  })
}

module.exports = async (req, res) => {
  const name = req.query.name

  if (!name) {
    return res.status(400).json({ error: 'no query given' })
  }

  try {
    const response = await resolvePromise(name)
    const availability = response && response.length > 0 ? false : true

    res.json({ availability })
  } catch (err) {
    if (err.code === 'ENODATA' || err.code === 'ENOTFOUND') {
      return res.status(200).json({ availability: true })
    }
    res.status(400).json({ error: err.message })
  }
}
