// react
import React from 'react'

// emotion
import { Global, css } from '@emotion/react'


export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      // BULLETS

      .bullets {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        padding: 0px;
        margin: 0px;
      }

      // BULLET

      .bullet {
        display: inherit;
      }

      // BULLET BUTTON

      .bullet-button {
        width: 1rem;
        height: .30rem;
        background-color: var(--color-blue);
        padding: 0px;
        margin: 0px 0px 0px 10px;
        transition: all .5s cubic-bezier(.23,1,.32,1);
      }
      
      .bullet-button.is-active {
        height: 1rem;
      }

    `}
  />
)
