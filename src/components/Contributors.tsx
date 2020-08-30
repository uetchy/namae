import React from 'react';
import styled from 'styled-components';
import useSWR from 'swr';

export interface Contributors {
  projectName: string;
  projectOwner: string;
  repoType: string;
  repoHost: string;
  files: string[];
  imageSize: number;
  commit: boolean;
  commitConvention: string;
  contributors: Contributor[];
  contributorsPerLine: number;
  skipCi: boolean;
}

export interface Contributor {
  login: string;
  name: string;
  avatar_url: string;
  profile: string;
  contributions: string[];
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const Contributors: React.FC = () => {
  const { data } = useSWR<Contributors>(
    'https://raw.githubusercontent.com/uetchy/namae/master/.all-contributorsrc',
    fetcher
  );

  if (!data) return <Container>Loading</Container>;

  return (
    <Container>
      {data.contributors.map((contributor) => (
        <Item key={contributor.login}>
          <a
            href={contributor.profile}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar src={contributor.avatar_url} alt={contributor.name} />
          </a>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Item = styled.div`
  margin-left: 10px;
  :first-child {
    margin-left: 0;
  }
`;

const avatarSize = 32;
const Avatar = styled.img.attrs({ width: avatarSize, height: avatarSize })`
  border-radius: ${avatarSize}px;
`;

export default Contributors;
