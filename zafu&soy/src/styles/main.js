// react
import React from 'react'

// emotion
import { Global, css } from '@emotion/react'

// styles
import breakpoint from './breakpoints'


export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      // ALL

      * {
        box-sizing: border-box;
      }

      // SCREEN READER ONLY

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
      
      // BODY

      body {
        margin: 0;
        box-sizing: border-box;
        background-color: var(--color-white);
      }

      // HTML

      html {
        font-family: 'IBM Plex Sans', 'Roboto','Fira Sans', 'Helvetica Neue', sans-serif;
        font-weight: 400;
        font-size: 16px;
        line-height: 1.4;
        -webkit-font-smoothing: antialiased;
        font-feature-settings: "lnum" 1,"pnum" 1,"kern" 1,"liga" 1;
        font-kerning: normal;
        font-variant-ligatures: contextual;
        -moz-osx-font-smoothing: grayscale;
        -webkit-text-size-adjust: 100%;
        
        @media ${breakpoint.mobile} { 
          font-size: 15px;
        }
      }


      // CAPTION

      .caption-regular {
        font-family: 'IBM Plex Mono';
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
      }

      .caption-bold {
        font-family: 'IBM Plex Mono';
        font-weight: 500;
      }


      b,
      strong {
        font-family: 'IBM Plex Mono';
        font-weight: 500;
      }

      // HEADINGS

      h1,
      h2,
      h3 {
        margin: 0px;
        padding: 0px;
        color: var(--color-black);
        font-weight: 400;
      }

      h1 {
        font-family: 'IBM Plex Sans';
        font-weight: 500;
        font-size: 38px;

        @media ${breakpoint.mobile} { 
          font-size: 28px;
        }
      }

      h2 {
        font-family: 'IBM Plex Sans';
        font-weight: 400;
        font-size: 24px;

        @media ${breakpoint.mobile} { 
          font-size: 20px;
        }
      }


      h3 {
        font-family: 'IBM Plex Sans';
        font-weight: 400;
        font-size: 21px;

        @media ${breakpoint.mobile} { 
          font-size: 18px;
        }
      }

      // SPAN DIV

      a,
      p,
      span, 
      div {
        margin: 0px;
        padding: 0px;
        color: var(--color-black);
      }

      // LINK

      a {
        text-decoration: none;
      }

      // BUTTON

      button {
        border: none;
        background-color: transparent;
        cursor: pointer;
      }

      // INPUT

      button,
      input {
        font-family: 'IBM Plex Sans';
        font-weight: 400;
        font-size: 16px;
    
        @media ${breakpoint.mobile} { 
          font-size: 15px;
        }
      }

      // UNORDERED LIST

      ul {
        list-style: square;
      }

      // IMAGE

      .gatsby-image-wrapper-constrained {
        display: block;
      }

      img {
        width: 100%;
      }

    `}
  />
)
