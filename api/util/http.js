const fetch = require('isomorphic-unfetch')

exports.fetch = (url, method = 'HEAD') => {
  return fetch(url, { method })
}

exports.send = (res, obj) => {
  res.setHeader('Cache-Control', 'maxage=0, s-maxage=3600')
  res.json(obj)
}

exports.sendError = (res, error) => {
  res.status(400).json({ error: error.message })
}
