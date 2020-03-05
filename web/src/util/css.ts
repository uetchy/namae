import {keyframes} from 'styled-components';

export const mobile = '@media screen and (max-width: 800px)';

export const slideUp = keyframes`
from {
  transform: translateY(100%);
}
to {
  transform: translateY(0);
}
`;
