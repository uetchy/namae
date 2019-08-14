import nock from 'nock'

nock.disableNetConnect()

// nock.recorder.rec()

global.mockProvider = async (provider, query) => {
  const req = {
    query,
  }
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn(),
  }
  await provider(req, res)
  return res.json.mock.calls[0][0]
}
