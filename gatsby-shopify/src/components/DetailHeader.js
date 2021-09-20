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

const ProductDetailComponent = styled.div`
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

const ProductDetailInner = styled.div`
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

const ProductDetailImage = styled.div`
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

const StyledBackgroundSection = styled(BackgroundImage)`
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

const ProductDetailButton = styled.button`
  position: relative;
  padding: 0;
  text-align: left;
  display: block;

`

// PRODUCT DETAIL CONTEXT

const ProductDetailContext = styled.div`
  ${container};

  position: absolute;
  top: 40%;
  left: 0;
`;


// PRODUCT DETAIL TITLE H1

const ProductDetailTitle = styled.h1`
  color: var(--color-white);
  background-image: linear-gradient(180deg, transparent 95%, #fff 0);
`;


// PRODUCT DETAIL SCROLL BUTTON

const ProductDetailScroll = styled.button`
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

const ProductDetail = ({ product }) => {
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
      <ProductDetailComponent>

        {/* PRODUCT DETAIL INNER */}
        <ProductDetailInner ref={galleryEl}>

              {/* PRODUCT DETAIL IMAGE */}
              {product.images.map((image) => {
                const pluginImage = getImage(image.localFile)
                const bgImage = convertToBgImage(pluginImage)
                return (
                  <ProductDetailImage key={image.id}>
                    
                        <StyledBackgroundSection
                          Tag="div"
                          {...bgImage}
                          preserveStackingContext
                        />
                    
                  </ProductDetailImage>
                )
              })}

            {/* PRODUCT DETAIL CONTEXT */}

            <ProductDetailContext>
              <ProductDetailButton 
                  onClick={() => jumpTo('#discoverTarget')}
                  >
                {/* PRODUCT DETAIL TITLE H1 */}
                <ProductDetailTitle className="border-hover">{product.title}</ProductDetailTitle>
              </ProductDetailButton>

              {/* DETAIL INPUT */}
              <DetailInput product={product} />

            </ProductDetailContext>

            {/* PRODUCT DETAIL SCROLL BUTTON */}
            <ProductDetailScroll className="link-hover link-hover--white" onClick={() => jumpTo('#discoverTarget')}>
              <span>Discover more</span>
            </ProductDetailScroll>

        </ProductDetailInner>
      </ProductDetailComponent>
    </>
  )
}


export default ProductDetail
