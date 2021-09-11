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
  padding-left: 150px;
  padding-right: 150px;


  @media ${breakpoint.desktop} { 
    padding-left: 100px;
    padding-right: 100px;
  }

  @media ${breakpoint.tablet} { 
    padding-left: 80px;
    padding-right: 80px;
  }

  @media ${breakpoint.mobile} { 
    padding-left: 30px;
    padding-right: 30px;
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

//export const ciBlue = '#222225'
//export const ciWhite = '#faf9f8'
//export const ciGray = '#acaba6'
//export const ciOrange = '#b55340'

export const ciBlue = '#313942'
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
        font-weight: 200;
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
        font-weight: 300;
        font-size: 15px;

        @media ${breakpoint.mobile} { 
          font-size: 14px;
        }
      }

      h1,
      h2,
      h3 {
        margin: 0px;
        padding: 0px;
        color: var(--color-blue);
        font-family: 'IBM Plex Mono';
        text-transform: uppercase;
      }

      h1 {
        font-size: 57px;
        font-weight: 400;

        @media ${breakpoint.tablet} { 
          font-size: 32px;
        }
      }

      h2 {
        font-size: 17px;
        font-weight: 300;

        @media ${breakpoint.tablet} { 
          font-size: 15px;
        }
      }


      h3 {
        font-size: 16px;
        font-weight: 300;

        @media ${breakpoint.tablet} { 
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

      .link-hover {
        position: relative;
        padding-right: 2.45rem;

        span {
          font-family: 'IBM Plex Mono';
          display: inline-block;
          transition: transform .5s cubic-bezier(.23,1,.32,1);
          font-weight: 300;
          text-transform: uppercase;
        }

        &::after {
          content: '';
          position: absolute;
          top: calc(50% - .15rem);
          right: 0;
          width: 1rem;
          height: .30rem;
          background-color: var(--color-blue);
          transform: scale(1);
          transition: .5s cubic-bezier(.23,1,.32,1);
              transition-property: all;
          will-change: transform;
          transition-property: transform,width,height;
        }

        &:hover span {
          transform: translateX(-1.0416666667vw);
        }
        
        &:hover::after {
          transform: scale(2.5,.5) translateX(-.2604166667vw);
        }
      }

      .link-hover--white {
        &::after {
          background-color: var(--color-white);
        }
      }

      .button-hover {
        font-family: 'IBM Plex Mono';
        text-transform: uppercase;
        border: 3px solid var(--color-blue);
        padding: 30px 50px;
        position: relative;
        display: inline-block;
        overflow: hidden;
        cursor: pointer;
      }

    `}
  />
)
