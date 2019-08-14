import provider from './github'
import nock from 'nock'

test('return false if name is taken', async () => {
  const result = await mockProvider(provider, { query: 'uetchy' })
  expect(result).toStrictEqual({ availability: false })
})

test('return true if name is not taken', async () => {
  const result = await mockProvider(provider, { query: 'uetchyasdf' })
  expect(result).toStrictEqual({ availability: true })
})

beforeEach(() => {
  nock('https://github.com:443', { encodedQueryParams: true })
    .head('/uetchyasdf')
    .reply(
      404,
      [],
      [
        'Date',
        'Wed, 14 Aug 2019 10:52:54 GMT',
        'Content-Type',
        'text/plain; charset=utf-8',
        'Connection',
        'close',
        'Server',
        'GitHub.com',
        'Status',
        '404 Not Found',
        'Vary',
        'X-PJAX',
        'Cache-Control',
        'no-cache',
        'Set-Cookie',
        'has_recent_activity=1; path=/; expires=Wed, 14 Aug 2019 11:52:54 -0000',
        'Set-Cookie',
        'logged_in=no; domain=.github.com; path=/; expires=Sun, 14 Aug 2039 10:52:54 -0000; secure; HttpOnly',
        'Set-Cookie',
        '_gh_sess=L0ZETUlMOEYxa3R3ZHRmMXlwYlRDQ1htRXZDMXA0WTJaMm5FTmJ6WnNjL0wrRERtbVRnck10Q3R6ZHpoV1JEaWoyQ3RNSFdXSW9KWFAycy9JZnJUY0RRbXlsSGpHREdPTmluTDA3S1JmamVIUXI0U29xVnhUNkRZZEVZNEdnSm8tLWIyZTA4OU12MHVhblhzSmIvYzFFdWc9PQ%3D%3D--2c1699922db712db405ce841c8863aaccd1dc293; path=/; secure; HttpOnly',
        'X-Request-Id',
        'c9060424-821a-4a42-aacb-f8325f946d3a',
        'Strict-Transport-Security',
        'max-age=31536000; includeSubdomains; preload',
        'X-Frame-Options',
        'deny',
        'X-Content-Type-Options',
        'nosniff',
        'X-XSS-Protection',
        '1; mode=block',
        'Referrer-Policy',
        'origin-when-cross-origin, strict-origin-when-cross-origin',
        'Expect-CT',
        'max-age=2592000, report-uri="https://api.github.com/_private/browser/errors"',
        'Content-Security-Policy',
        "default-src 'none'; base-uri 'self'; connect-src 'self'; form-action 'self'; img-src 'self' data:; script-src 'self'; style-src 'unsafe-inline'",
        'Content-Encoding',
        'gzip',
        'X-GitHub-Request-Id',
        'BA06:51D6:125A0F:1A9B4A:5D53E806',
      ]
    )
  nock('https://github.com:443', { encodedQueryParams: true })
    .head('/uetchy')
    .reply(
      200,
      [],
      [
        'Date',
        'Wed, 14 Aug 2019 10:43:09 GMT',
        'Content-Type',
        'text/html; charset=utf-8',
        'Connection',
        'close',
        'Server',
        'GitHub.com',
        'Status',
        '200 OK',
        'Vary',
        'X-Requested-With',
        'ETag',
        'W/"1d0b1abdacee756e874ad8ecbc350aea"',
        'Cache-Control',
        'max-age=0, private, must-revalidate',
        'Set-Cookie',
        'has_recent_activity=1; path=/; expires=Wed, 14 Aug 2019 11:43:08 -0000',
        'Set-Cookie',
        '_octo=GH1.1.1968814248.1565779389; domain=.github.com; path=/; expires=Sat, 14 Aug 2021 10:43:09 -0000',
        'Set-Cookie',
        'logged_in=no; domain=.github.com; path=/; expires=Sun, 14 Aug 2039 10:43:09 -0000; secure; HttpOnly',
        'Set-Cookie',
        '_gh_sess=VFVEY3RvRkp6UGlHZnAxM1JET3lGV1dDU2lzbTltcDZGNlVaWUp4cGx2WERIaDhvU3QydU83UUU3WkdzSHVCRGZSZUhrNG85Q2llRVA4TUg0Q1BRYUVhRVhIUHozSGJ2cDVab1J5SkE0dW9tVU04TW96bVRJcWpXSU0ydmQ0V1FiNy9tVitBQTdYS0tvR3UzVjdpTXd1MHJJeSt3OTB5RkFJUlpxSm1rT0VFRDNIb2RGeEhvWHhaUzlOc1JEdlZkTTJRQnNOamZaSEVMWHBacVkrdys3Zz09LS1tT05yQUpQUWdrR2hvKzhkK2U1WGFRPT0%3D--fa39d5bf1e2d5a9bc9fcf927fce211a2a0cf07bb; path=/; secure; HttpOnly',
        'X-Request-Id',
        '38b2d3b9-21df-49d4-9cf5-8b85181fa67e',
        'Strict-Transport-Security',
        'max-age=31536000; includeSubdomains; preload',
        'X-Frame-Options',
        'deny',
        'X-Content-Type-Options',
        'nosniff',
        'X-XSS-Protection',
        '1; mode=block',
        'Referrer-Policy',
        'origin-when-cross-origin, strict-origin-when-cross-origin',
        'Expect-CT',
        'max-age=2592000, report-uri="https://api.github.com/_private/browser/errors"',
        'Content-Security-Policy',
        "default-src 'none'; base-uri 'self'; block-all-mixed-content; connect-src 'self' uploads.github.com www.githubstatus.com collector.githubapp.com api.github.com www.google-analytics.com github-cloud.s3.amazonaws.com github-production-repository-file-5c1aeb.s3.amazonaws.com github-production-upload-manifest-file-7fdce7.s3.amazonaws.com github-production-user-asset-6210df.s3.amazonaws.com wss://live.github.com; font-src github.githubassets.com; form-action 'self' github.com gist.github.com; frame-ancestors 'none'; frame-src render.githubusercontent.com; img-src 'self' data: github.githubassets.com identicons.github.com collector.githubapp.com github-cloud.s3.amazonaws.com *.githubusercontent.com; manifest-src 'self'; media-src 'none'; script-src github.githubassets.com; style-src 'unsafe-inline' github.githubassets.com",
        'Content-Encoding',
        'gzip',
        'Vary',
        'Accept-Encoding',
        'X-GitHub-Request-Id',
        'A922:19B1:AD411:FB69F:5D53E5BC',
      ]
    )
})
