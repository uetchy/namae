import React from 'react';
import styled from '@emotion/styled';
import useSWR from 'swr';
import Tooltip from 'rc-tooltip';

export interface IContributors {
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
  const { data } = useSWR<IContributors>(
    'https://raw.githubusercontent.com/uetchy/namae/master/.all-contributorsrc',
    fetcher
  );

  if (!data) return <Container>Loading</Container>;

  return (
    <Container>
      {data.contributors.map((contributor) => (
        <Tooltip
          key={contributor.login}
          overlay={`${contributor.name} (${contributor.contributions.join(
            ', '
          )})`}
          placement="top"
          trigger={['hover']}
        >
          <Item key={contributor.login}>
            <a
              href={contributor.profile}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar src={contributor.avatar_url} alt={contributor.name} />
            </a>
          </Item>
        </Tooltip>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Item = styled.div`
  margin-right: 10px;
`;

const avatarSize = 32;
const Avatar = styled.img`
  border-radius: ${avatarSize}px;
`;
Avatar.defaultProps = { width: avatarSize, height: avatarSize };

export default Contributors;
