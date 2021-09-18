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
        font-weight: 500;
        font-size: 17px;
        line-height: 1.7;
        font-family: 'IBM Plex Sans', 'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        
        @media ${breakpoint.mobile} { 
          font-size: 15px;
        }
      }

      // BOLD STRONG

      b,
      strong {
        font-weight: 600;
      }

      // SMALL

      small {
        font-size: 15px;
        font-weight: 400;

        @media ${breakpoint.mobile} { 
          font-size: 14px;
        }
      }

      // HEADINGS

      h1,
      h2,
      h3 {
        margin: 0px;
        padding: 0px;
        color: var(--color-blue);
        font-weight: 500;
      }

      h1 {
        font-size: 57px;

        @media ${breakpoint.tablet} { 
          font-size: 32px;
        }
      }

      h2 {
        font-family: 'IBM Plex Mono';
        text-transform: uppercase;
        font-size: 17px;

        @media ${breakpoint.tablet} { 
          font-size: 15px;
        }
      }


      h3 {
        font-size: 32px;

        @media ${breakpoint.tablet} { 
          font-size: 19px;
        }
      }

      // SPAN DIV

      a,
      p,
      span, 
      div {
        margin: 0px;
        padding: 0px;
        color: var(--color-blue);
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
        font-weight: 500;
        font-size: 17px;
    
        @media ${breakpoint.mobile} { 
          font-size: 15px;
        }
      }

      // UNORDERED LIST

      ul {
        list-style: square inside;
      }

      // IMAGE

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
