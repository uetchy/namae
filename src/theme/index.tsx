import styled, { createGlobalStyle } from 'styled-components';
import { mobile } from '../util/css';

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  line-height: 1.625em;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #ffffff;

  ${mobile} {
    background: #f5f5f5;
  }
}
`;

export const Content = styled.div`
  padding-top: 100px;

  ${mobile} {
    padding-top: 60px;
  }
`;

export const Header = styled.header`
  padding: 0 40px;
  background-image: linear-gradient(#9f78ff, #1b24cc 99%);

  ${mobile} {
    padding: 0 20px;
  }
`;

export const Section = styled.div`
  padding: 100px 20vw;

  ${mobile} {
    padding: 60px 40px;
  }
`;
