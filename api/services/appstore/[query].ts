import { send, sendError, fetch } from '../../../util/http';
import { VercelRequest, VercelResponse } from '@vercel/node';

interface App {
  trackId: string;
  trackName: string;
  kind: string;
  version: string;
  price: string;
  trackViewUrl: string;
  sellerName: string;
  formattedPrice: string;
}

interface AppStoreResponse {
  results: App[];
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  const { query, country } = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  const term = encodeURIComponent(query);
  const countryCode = country || 'us';
  const limit = 5;

  try {
    const response = await fetch(
      `https://itunes.apple.com/search?media=software&entity=software,iPadSoftware,macSoftware&country=${countryCode}&limit=${limit}&term=${term}`,
      'GET'
    );
    const body: AppStoreResponse = await response.json();
    const apps = body.results.map((app) => ({
      id: app.trackId,
      name: app.trackName,
      author: app.sellerName,
      viewURL: app.trackViewUrl,
    }));
    send(res, { result: apps });
  } catch (err: any) {
    sendError(res, err);
  }
}
