import React from 'react'
import { Global, css } from '@emotion/react'

const device = {
  mobile: 500,
  tablet: 800,
  desktop: 1200,
};

export const breakpoint = {
  mobile: `(max-width: ${device.mobile}px)`,
  tablet: `(max-width: ${device.tablet}px)`,
  desktop: `(max-width: ${device.desktop}px)`,
};

export const container = `
  margin: 0 auto;
  max-width: 1440px;
  padding-left: 45px;
  padding-right: 45px;


  @media ${breakpoint.desktop} { 
    padding-left: 35px;
    padding-right: 35px;
  }

  @media ${breakpoint.tablet} { 
    padding-left: 25px;
    padding-right: 25px;
  }

  @media ${breakpoint.mobile} { 
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const ciColor = '#313942'

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      :root {
        --color-green: #596460;
        --color-white: #faf9f8;
        --color-gray: #acaba6;
        --color-blue: ${ciColor};
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: -1px;
        padding: 0;
        overflow: hidden;
        border: 0;
        clip: rect(0, 0, 0, 0);
      }
      
      body {
        margin: 0;
        box-sizing: border-box;
        background-color: var(--color-white);
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

      strong {
        font-weight: 400;
      }

      small {
        font-size: 15px;

        @media ${breakpoint.mobile} { 
          font-size: 14px;
        }
      }

      h1,
      h2,
      h3 {
        font-family: 'IBM Plex Serif';
        font-weight: 300;
        margin: 0px;
        padding: 0px;
        color: var(--color-blue);
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
        font-size: 24px;

        @media ${breakpoint.desktop} { 
          font-size: 22px;
        }
    
        @media ${breakpoint.tablet} { 
          font-size: 20px;
        }
    
        @media ${breakpoint.mobile} { 
          font-size: 18px;
        }
      }


      h3 {
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
      p,
      span, 
      div {
        margin: 0px;
        padding: 0px;
        color: var(--color-blue);
      }

      a {
        text-decoration: none;
      }

      a:hover {
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 5px;
      }

      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }

      button,
      input {
        font-family: 'IBM Plex Sans';
        font-weight: 300;
        font-size: 17px;

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

      ul {
        list-style: square inside;
      }

      .gatsby-image-wrapper-constrained {
        display: block;
      }

      img {
        width: 100%;
      }

      .prevent-scroll {
        overflow: hidden;

        &::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 10;
          background-color: rgba(0,0,0,0.7);
        } 
      }
    `}
  />
)
