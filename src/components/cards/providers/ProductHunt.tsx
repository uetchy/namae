import useFetch from 'fetch-suspense';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaProductHunt } from 'react-icons/fa';
import { Card, Result } from '../core';

const Search: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();
  const response = useFetch(
    `https://0h4smabbsg-dsn.algolia.net/1/indexes/Post_production?query=${encodeURIComponent(
      query
    )}`,
    {
      headers: {
        'X-Algolia-API-Key': '9670d2d619b9d07859448d7628eea5f3',
        'X-Algolia-Application-Id': '0H4SMABBSG',
      },
    }
  ) as Response;

  const hits = response.hits;

  return (
    <>
      {hits.length > 0 ? (
        hits
          .slice(0, 10)
          .map((hit) => (
            <Result
              title={hit.name}
              message={`${hit.tagline} (⬆️ ${hit.vote_count})`}
              link={hit.url}
              icon={<FaProductHunt />}
              key={hit.id}
            />
          ))
      ) : (
        <Result
          title={t('noResult')}
          message={t('noResult')}
          icon={<FaProductHunt />}
        />
      )}
    </>
  );
};

const ProductHuntCard: React.FC<{ query: string }> = ({ query }) => {
  const { t } = useTranslation();

  return (
    <Card title={t('providers.productHunt')}>
      <Search query={query} />
    </Card>
  );
};

export default ProductHuntCard;

interface Response {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  query: Query;
  params: string;
  processingTimeMS: number;
}

interface Hit {
  comments_count: number;
  name: string;
  slug: string;
  tagline: string;
  topics: Topic[];
  id: number;
  user_id: number;
  thumbnail_image_uuid?: string;
  created_at: string;
  featured_at: null | string;
  exclusive: null;
  is_featured: boolean;
  media: Media[];
  posted_date: number;
  product_links: ProductLink[];
  product_state: ProductState;
  shortened_url: string;
  text_content: any[];
  url: string;
  user: User;
  vote_count: number;
  objectID: string;
  _highlightResult: HighlightResult;
  thumbnail?: Thumbnail;
}

interface HighlightResult {
  name: Name;
  tagline: Name;
}

interface Name {
  value: string;
  matchLevel: MatchLevel;
  fullyHighlighted?: boolean;
  matchedWords: Query[];
}

export enum MatchLevel {
  Full = 'full',
  None = 'none',
}

export enum Query {
  Namae = 'namae',
}

interface Media {
  id: number;
  metadata: MediaMetadata;
  original_height: number;
  original_width: number;
  image_url: string;
  image_uuid: string;
  media_type: MediaType;
}

export enum MediaType {
  Image = 'image',
  Video = 'video',
}

interface MediaMetadata {
  video_id?: null | string;
  url?: null | string;
  kindle_asin?: null;
  platform?: null;
}

interface ProductLink {
  store_name: StoreName;
  id: number;
  url: string;
}

export enum StoreName {
  AppStore = 'App Store',
  Chrome = 'Chrome',
  PlayStore = 'Play Store',
  Website = 'Website',
}

export enum ProductState {
  Default = 'default',
  NoLongerOnline = 'no_longer_online',
}

interface Thumbnail {
  image_uuid: string;
  media_type: MediaType;
  metadata: ThumbnailMetadata;
  original_height: number;
  id: number;
  original_width: number;
  image_url: string;
}

interface ThumbnailMetadata {}

interface Topic {
  id: number;
  name: string;
  description: string;
  slug: string;
  followers_count: number;
  image_uuid: string;
}

interface User {
  username: string;
  id: number;
  twitter_username: null | string;
  name: string;
  headline: null | string;
  image_urls: { [key: string]: string };
  link: string;
  avatar_url: string;
  is_maker: boolean;
}
