import React from 'react'
import { Global, css } from '@emotion/react'


const device = {
  mobile: 768,
  tablet: 1200,
  desktop: 1440,
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
  margin-top: 160px;


  @media ${breakpoint.tablet} { 
    margin-top: 130px;
  }

  @media ${breakpoint.mobile} { 
    margin-top: 80px;
  }
`;

export const moduleSpaceSmall = `
  margin-top: 80px;

  @media ${breakpoint.tablet} { 
    margin-top: 60px;
  }
`

export const headerSpace = `
  margin-bottom: 30px;

  @media ${breakpoint.mobile} { 
    margin-bottom: 20px;
  }
`;

//export const ciBlue = '#313942'
//export const ciWhite = '#faf9f8'
//export const ciGray = '#acaba6'
//export const ciOrange = '#b55340'

export const ciBlue = '#222225'
export const ciWhite = '#f9f9f9'
export const ciGray = '#8d9092'
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
        font-size: 16px;
        line-height: 1.7;
        font-family: 'IBM Plex Sans', 'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        
        @media ${breakpoint.mobile} { 
          font-size: 15px;
        }
      }

      b,
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
        font-weight: 200;
        margin: 0px;
        padding: 0px;
        color: var(--color-blue);
      }

      h1 {
        font-size: 32px;

        @media ${breakpoint.desktop} { 
          font-size: 28px;
        }
    
        @media ${breakpoint.tablet} { 
          font-size: 26px;
        }
    
        @media ${breakpoint.mobile} { 
          font-size: 24px;
        }
      }

      h2 {
        font-size: 26px;

        @media ${breakpoint.desktop} { 
          font-size: 24px;
        }
    
        @media ${breakpoint.mobile} { 
          font-size: 22px;
        }
      }


      h3 {
        font-size: 20px;
    
        @media ${breakpoint.mobile} { 
          font-size: 18px;
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
        font-size: 16px;
    
        @media ${breakpoint.mobile} { 
          font-size: 15px;
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
