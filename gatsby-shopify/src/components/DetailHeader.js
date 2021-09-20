// react
import React, { useRef } from 'react'

// gatsby
import { getImage } from 'gatsby-plugin-image'
import BackgroundImage from 'gatsby-background-image'
import { convertToBgImage } from "gbimage-bridge"

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container } from '../styles/containers'

// utils
import aniScroll from '../utils/ani-scroll';

// components 
import DetailInput from '~/components/DetailInput'


// PRODUCT DETAIL COMPONENT

const DetailHeaderComponent = styled.div`
  align-items: flex-end;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 52px);
  margin-top: 62px;

  @media ${breakpoint.mobile} {
    margin-top: 52px;
  }
`

// PRODUCT DETAIL INNER

const DetailHeaderInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`

// PRODUCT DETAIL IMAGE

const DetailHeaderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
    z-index: 1;
  }
`;

const DetailHeaderBackgroundImage = styled(BackgroundImage)`
  background-position: center;
  background-repeat: repeat-y;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-attachment: fixed;

  @media ${breakpoint.mobile} {
    background-attachment: unset !important;

    &::before,
    &::after {
      background-attachment: unset !important;
    }
  }
`

// PRODUCT DETAIL BUTTON

const DetailHeaderButton = styled.button`
  position: relative;
  padding: 0;
  text-align: left;
  display: block;

`

// PRODUCT DETAIL CONTEXT

const DetailHeaderContext = styled.div`
  ${container};

  position: absolute;
  top: 40%;
  left: 0;
`;


// PRODUCT DETAIL TITLE H1

const DetailHeaderTitle = styled.h1`
  color: var(--color-white);
  background-image: linear-gradient(180deg, transparent 95%, #fff 0);
`;


// PRODUCT DETAIL SCROLL BUTTON

const DetailHeaderScroll = styled.button`
   position: absolute;
    transform: rotate(90deg);
    right: 20px;
    bottom: 250px;

  @media ${breakpoint.tablet} {
    right: -30px;
    top: 200px;
    bottom: inherit;
  }

  span {
    color: var(--color-white);
  }
`;

const DetailHeader = ({ product }) => {
  const galleryEl = useRef(null);
  
  const jumpTo = (hash) => {
    const target = document.querySelector(hash);
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    aniScroll(rect.top + scrollTop - 52, 1000, 'easeInOutQuart');
  };

  return (
    <>
      {/* PRODUCT DETAIL COMPONENT */}
      <DetailHeaderComponent>

        {/* PRODUCT DETAIL INNER */}
        <DetailHeaderInner ref={galleryEl}>

              {/* PRODUCT DETAIL IMAGE */}
              {product.images.map((image) => {
                const pluginImage = getImage(image.localFile)
                const bgImage = convertToBgImage(pluginImage)
                return (
                  <DetailHeaderImage key={image.id}>
                    
                        <DetailHeaderBackgroundImage
                          Tag="div"
                          {...bgImage}
                          preserveStackingContext
                        />
                    
                  </DetailHeaderImage>
                )
              })}

            {/* PRODUCT DETAIL CONTEXT */}

            <DetailHeaderContext>
              <DetailHeaderButton 
                  onClick={() => jumpTo('#discoverTarget')}
                  >
                {/* PRODUCT DETAIL TITLE H1 */}
                <DetailHeaderTitle className="border-hover">{product.title}</DetailHeaderTitle>
              </DetailHeaderButton>

              {/* DETAIL INPUT */}
              <DetailInput product={product} />

            </DetailHeaderContext>

            {/* PRODUCT DETAIL SCROLL BUTTON */}
            <DetailHeaderScroll className="link-hover link-hover--white" onClick={() => jumpTo('#discoverTarget')}>
              <span>Discover more</span>
            </DetailHeaderScroll>

        </DetailHeaderInner>
      </DetailHeaderComponent>
    </>
  )
}


export default DetailHeader
