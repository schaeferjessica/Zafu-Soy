import React from 'react'
import { Global, css } from '@emotion/react'

export const breakpoints = {
  s: 576,
  m: 768,
  l: 992,
  xl: 1200,
}

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`
      body {
        margin: 0;
      }
      html {
        font-weight: 300;
        font-size: 18px;
        line-height: 1.7;
        font-family: 'IBM Plex Sans', 'Roboto', 'Segoe UI', 'Oxygen', 'Ubuntu', 'Cantarell',
        'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      h1,
      h2,
      h3 {
        font-family: 'IBM Plex Serif';
      }

      a {
        color: black;
        text-decoration-thickness: 1.5px;
        text-underline-offset: 7px;
      }

      button {
        font-family: 'IBM Plex Sans';
        font-size: 16px;
        border: 1.5px solid black;
        padding: 15px 30px
      }

      ul {
        list-style: square inside;
      }
    `}
  />
)
