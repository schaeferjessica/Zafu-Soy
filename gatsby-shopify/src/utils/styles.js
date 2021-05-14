import React from 'react'
import { Global, css } from '@emotion/react'

const device = {
  mobile: 576,
  tablet: 768,
  desktop: 992,
};

export const breakpoint = {
  mobile: `(max-width: ${device.mobile}px)`,
  tablet: `(max-width: ${device.tablet}px)`,
  desktop: `(max-width: ${device.desktop}px)`,
};

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      body {
        margin: 0;
        background-color: #FAF9F8;
      }

      html {
        font-weight: 300;
        font-size: 17px;
        line-height: 1.7;
        font-family: 'IBM Plex Sans', 'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        @media ${breakpoint.desktop} { 
          font-size: 16px;
        }
    
        @media ${breakpoint.tablet} { 
          font-size: 15px;
        }
    
        @media ${breakpoint.mobile} { 
          font-size: 14px;
        }
      }

      h1,
      h2,
      h3 {
        font-family: 'IBM Plex Serif';
        margin: 0px;
        padding: 0px;
      }

      h1 {
        font-size: 26px;

        @media ${breakpoint.desktop} { 
          font-size: 24px;
        }
    
        @media ${breakpoint.tablet} { 
          font-size: 22px;
        }
    
        @media ${breakpoint.mobile} { 
          font-size: 20px;
        }
      }

      h2 {
        font-weight: 300;
        font-size: 18px;

        @media ${breakpoint.desktop} { 
          font-size: 17px;
        }
    
        @media ${breakpoint.tablet} { 
          font-size: 16px;
        }
    
        @media ${breakpoint.mobile} { 
          font-size: 15px;
        }
      }

      a,
      p {
        margin: 0px;
        padding: 0px;
      }

      a {
        color: black;
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 5px;
      }

      button {
        font-family: 'IBM Plex Sans';
        border: 1px solid black;
        padding: 15px 30px;
      }

      ul {
        list-style: square inside;
      }
    `}
  />
)
