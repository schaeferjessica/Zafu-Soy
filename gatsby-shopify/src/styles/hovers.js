import React from 'react'
import { Global, css } from '@emotion/react'
import { ciBlack } from './colors'


export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      // LINK HOVER

      .link-hover {
        position: relative;
        padding-right: 2.45rem;

        span {
          font-family: 'IBM Plex Sans';
          font-weight: 400;
          display: inline-block;
          transition: transform .5s cubic-bezier(.23,1,.32,1);
        }

        &::after {
          content: '';
          position: absolute;
          top: calc(50% - .15rem);
          right: 5px;
          width: 1rem;
          height: .30rem;
          background-color: var(--color-black);
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

      // BORDER HOVER 

      .border-hover {
        background-image: linear-gradient(180deg, transparent 95%, ${ciBlack} 0);
        background-repeat: no-repeat;
        transition: background-size 0.5s ease;
        background-size: 0% 100%;

        &:hover,
        &.focus-visible {
          background-size: 100% 100%;
        }
      }

      // BUTTON HOVER

      .button-hover {
        font-family: 'IBM Plex Sans';
        text-transform: uppercase;
        border: 2px solid var(--color-black);
        padding: 30px 50px;
        position: relative;
        display: inline-block;
        overflow: hidden;
        cursor: pointer;
      }


      // IMAGE HOVER

      .image-hover.gatsby-image-wrapper [data-main-image] {
        will-change: transform;
        transition: transform 1s cubic-bezier(0.33, 1, 0.68, 1) 0s;
        object-fit: contain;
        width: 100%;
        height: 100%;
      }

      .image-hover.gatsby-image-wrapper [data-main-image]:hover {
        transform: scale(1.1);
      }

    `}
  />
)
