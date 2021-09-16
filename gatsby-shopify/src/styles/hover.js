import React from 'react'
import { Global, css } from '@emotion/react'


export const GlobalStyle = props => (
  <Global
    {...props}
    styles={css`

      // LINK HOVER

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
          right: 5px;
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


      // BUTTON HOVER

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


      // IMAGE HOVER

      .image-hover.gatsby-image-wrapper [data-main-image] {
        will-change: transform;
        transition: transform 0.4s cubic-bezier(0.33, 1, 0.68, 1) 0s;
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
