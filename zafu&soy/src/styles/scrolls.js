import React from 'react'
import { Global, css } from '@emotion/react'


export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

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
