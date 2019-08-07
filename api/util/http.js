const fetch = require('isomorphic-unfetch')

exports.fetch = (url, method = 'HEAD') => {
  return fetch(url, { method })
}

exports.send = (res, data) => {
  res.setHeader('Cache-Control', 'maxage=0, s-maxage=43200')
  res.json(data)
}

exports.sendError = (res, error) => {
  res.status(400).json({ error: error.message })
}
