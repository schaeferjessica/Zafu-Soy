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


      // TAG HOVER 

      .tag-hover {
        position: relative;
        z-index: 1;
        display: inline-flex;
        padding: 4px;
        overflow: hidden;
        transition: all 0.3s ease;
        }

        .tag-hover:hover,
        .tag-hover.focus-visible {
          color: var(--color-white);
        }

        .tag-hover::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          z-index: -1;
          width: 100%;
          height: 100%;
          background: var(--color-black);
          transform: translateY(90%);
          transition: all .3s;
        }

        .tag-hover:hover::after {
          transform: translateY(0);
        }


      // UNDERLINE HOVER 

      .underline-hover {
        color: var(--color-black);
        background-image: linear-gradient(180deg, transparent 95%, currentColor 0);
        background-repeat: no-repeat;
        transition: background-size 0.5s ease;
        background-size: 0% 100%;
        display: inline;
        padding: 0px;

        &:hover,
        &.focus-visible {
          background-size: 100% 100%;
        }
      }

      // BUTTON HOVER

      .button-hover {
        padding: 45px 20px;
        text-align: center;
        cursor: pointer;
        border: 2px solid var(--color-white);
        border-radius: 50%;
      }

      .button-hover--black {
        border: 1px solid var(--color-black);
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
