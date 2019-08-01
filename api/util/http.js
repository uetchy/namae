exports.send = (res, availability) => {
  res.setHeader('Cache-Control', 'maxage=0, s-maxage=3600')
  res.json({ availability })
}

exports.sendError = (res, error) => {
  res.status(400).json({ error: error.message })
}
