import {send, sendError, fetch} from '../../../util/http';
import {NowRequest, NowResponse} from '@vercel/node';

const APPLICATION_ID = process.env.NTA_APPLICATION_ID;

export default async function handler(
  req: NowRequest,
  res: NowResponse,
): Promise<void> {
  const {query} = req.query;

  if (!query || typeof query !== 'string') {
    return sendError(res, new Error('No query given'));
  }

  const encodedQuery = encodeURIComponent(
    query.replace(/[A-Za-z0-9]/g, (str) =>
      String.fromCharCode(str.charCodeAt(0) + 0xfee0),
    ),
  );

  try {
    const response = await fetch(
      `https://api.houjin-bangou.nta.go.jp/4/name?id=${APPLICATION_ID}&name=${encodedQuery}&mode=1&target=1&type=02`,
      'GET',
    );
    const body: string[] = (await response.text()).split('\n').slice(0, -1);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const header = body.shift()!.split(',');
    const result = body.map((csv) => {
      const entry = csv.split(',').map((item) =>
        item
          .replace(/(^"|"$)/g, '')
          .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (str) =>
            String.fromCharCode(str.charCodeAt(0) - 0xfee0),
          )
          // eslint-disable-next-line no-irregular-whitespace
          .replace(/　/g, ' '),
      );

      return {
        index: entry[0],
        orgID: entry[1],
        name: entry[6],
        englishName: entry[24],
        phoneticName: entry[28],
        type: entry[8],
        created: entry[22],
        lastUpdate: entry[4],
        lastModified: entry[5],
        imageID: entry[7],
        location: {
          pref: entry[9],
          city: entry[10],
          address: entry[11],
          imageID: entry[12],
          prefCode: entry[13],
          cityCode: entry[14],
          postalCode: entry[15],
          englishPref: entry[25],
          englishAddress: entry[26],
        },
        foreignLocation: {
          address: entry[16],
          imageID: entry[17],
          englishForeignLocation: entry[27],
        },
        historyCount: entry[23],
        closedAt: entry[18],
        closedReason: entry[19],
        successorOrgID: entry[20],
        memo: entry[21],
        excluded: entry[29],
        processSection: entry[2],
        modifiedSection: entry[3],
      };
    });

    send(res, {
      meta: {
        lastUpdate: header[0],
        count: parseInt(header[1]),
        cursor: parseInt(header[2]),
        pages: parseInt(header[3]),
      },
      result:
        result
          .map((entry) => ({
            name: entry.name,
            phoneticName: entry.phoneticName,
            englishName: entry.englishName,
          }))
          .slice(10) || [],
    });
  } catch (err) {
    sendError(res, err);
  }
}
