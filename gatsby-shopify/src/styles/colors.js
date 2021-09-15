import React from 'react'
import { Global, css } from '@emotion/react'

//export const ciBlue = '#222225'
//export const ciWhite = '#faf9f8'
//export const ciGray = '#acaba6'
//export const ciOrange = '#b55340'

export const ciBlue = '#313942'
export const ciWhite = '#f9f9f9'
export const ciGray = '#8d9092'
export const ciBeige = '#efeee7'

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      :root {
        --color-white: ${ciWhite};
        --color-gray: ${ciGray};
        --color-blue: ${ciBlue};
        --color-beige: ${ciBeige};
      }
    `}
  />
)
