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
        padding: 5px;
      }

      .bullet-button::after {
        content: '';
        width: 1rem;
        height: .30rem;
        background-color: var(--color-blue);
        padding: 0px;
        margin: 0px;
        transition: all .5s cubic-bezier(.23,1,.32,1);
        display: inherit;
      }
      
      .bullet-button.is-active::after {
        height: 1rem;
      }

    `}
  />
)
