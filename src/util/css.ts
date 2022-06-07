import { keyframes } from '@emotion/react';

export const mobile = '@media screen and (max-width: 800px)';
export const tablet = '@media screen and (max-width: 1200px)';

export const slideUp = keyframes`
from {
  transform: translateY(200%) skewY(10deg);
}
to {
  transform: translateY(0) skewY(0);
}
`;
