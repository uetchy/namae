export async function mockProvider(provider: any, query: any) {
  const req = {
    query,
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
    setHeader: jest.fn(),
  };
  await provider(req, res);
  return res.json.mock.calls[0][0];
}
