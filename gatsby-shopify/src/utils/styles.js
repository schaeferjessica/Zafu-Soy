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
  padding-left: 100px;
  padding-right: 100px;


  @media ${breakpoint.desktop} { 
    padding-left: 50px;
    padding-right: 50px;
  }

  @media ${breakpoint.tablet} { 
    padding-left: 30px;
    padding-right: 30px;
  }

  @media ${breakpoint.mobile} { 
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const moduleSpace = `
  margin-top: 150px;


  @media ${breakpoint.desktop} { 
    margin-top: 130px;
  }

  @media ${breakpoint.tablet} { 
    margin-top: 100px;
  }
`;

export const moduleSpaceSmall = `
  margin-top: 80px;

  @media ${breakpoint.desktop} { 
    margin-top: 70px;
  }

  @media ${breakpoint.tablet} { 
    margin-top: 60px;
  }

  @media ${breakpoint.mobile} { 
    margin-top: 50px;
  }
`

//export const ciBlue = '#313942'
//export const ciWhite = '#faf9f8'
//export const ciGray = '#acaba6'
//export const ciOrange = '#b55340'

export const ciBlue = '#222225'
export const ciWhite = '#f9f9f9'
export const ciGray = '#acaba6'
export const ciOrange = '#c16654'

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      :root {
        --color-white: ${ciWhite};
        --color-gray: ${ciGray};
        --color-blue: ${ciBlue};
        --color-orange: ${ciOrange};
      }

      * {
        box-sizing: border-box;
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
        font-size: 15px;
        line-height: 1.7;
        font-family: 'IBM Plex Sans', 'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    
        @media ${breakpoint.tablet} { 
          font-size: 14px;
        }
      }

      strong {
        font-weight: 400;
      }

      small {
        font-size: 14px;

        @media ${breakpoint.mobile} { 
          font-size: 13px;
        }
      }

      h1,
      h2 {
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
        font-family: 'IBM Plex Sans';
        font-weight: 400;
        font-size: 15px;
        margin: 0px;
    
        @media ${breakpoint.mobile} { 
          font-size: 14px;
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
        text-decoration-color: var(--color-gray);
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
        font-size: 15px;
    
        @media ${breakpoint.tablet} { 
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
      }

      .prevent-scroll--overlay {
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
