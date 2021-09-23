import React from 'react'
import { Global, css } from '@emotion/react'

//export const ciBlue = '#222225'
//export const ciWhite = '#faf9f8'
//export const ciGray = '#acaba6'
//export const ciOrange = '#b55340'

export const ciBlack = '#212529'
export const ciWhite = '#fff'

export const ciBlue = '#313942'
export const ciGray = '#8d9092'
export const ciBeige = '#efeee7'

export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      :root {
        --color-black: ${ciBlack};
        --color-white: ${ciWhite};
        --color-blue: ${ciBlue};
        --color-gray: ${ciGray};
        --color-beige: ${ciBeige};
      }
    `}
  />
)
