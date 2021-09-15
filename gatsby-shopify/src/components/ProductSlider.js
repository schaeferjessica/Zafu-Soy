// react
import React, { useContext, useRef } from 'react'

// components
import StoreContext from '~/context/StoreContext'
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';

// gatsby
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

// emotion
import styled from '@emotion/styled/macro';

// styles
import breakpoint from '../styles/breakpoints'
import { headerSpace } from '../styles/containers'


// PRODUCT SLIDER

const ProductSliderContainer = styled.div`
  text-align: center;

  .glide__slides {
    margin: 0;
  }

  .Glide-leftArrow,
  .Glide-rightArrow  {
    display: none;
  }
`

// PRODUCT SLIDER TOP

const ProductSliderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`

// PRODUCT SLIDER HEADER

const ProductSliderHeader = styled.h2`
  ${headerSpace}
`

// PRODUCT SLIDER NAVI

const ProductSliderNavi = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-right: 150px;

  @media ${breakpoint.desktop} { 
    margin-right: 100px;
  }

  @media ${breakpoint.tablet} { 
    margin-right: 80px;
  }

  @media ${breakpoint.mobile} { 
    margin-right: 30px;
  }
`

const ProductSliderButton = styled.button`
  height: 25px;
  width: 25px;
  margin-left: 15px;
  border: 1px solid var(--color-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0%);
  transition: .5s ease-in-out;
  padding: 4px;

  &:hover {
    transform: translate(0%) scale(1.2);
    border: 1px solid var(--color-blue);
  }

  svg.left {
    transform: translateX(-3px);
  }

  svg.right {
    transform: rotate(180deg) translateX(-3px);
  }

  path {
    fill: var(--color-blue);
  }
`


// PRODUCT SLIDER ITEM

const ProductSliderItem = styled.div`
  a:hover {
    .image-product:not(:only-child) {
      opacity: 0;
    }

    .image-detail {
      opacity: 1;
    }
  }

  .image-detail {
    opacity: 0;
  }

  .image-product,
  .image-detail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 200ms ease-in-out;
  }
`

// PRODUCT SLIDER LINK

const ProductSliderLink = styled(Link)`
  position: relative;
  padding-right: 25px;
  display: block;
`

const ProductSliderImage = styled.div`
  width: 100%;
  position: relative;

  > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &::after {
    content: "";
    display: block;
    height: 0;
    padding-bottom: 133.3333333333%;
  }
`

// PRODUCT SLIDER SOLD

const ProductSliderSold = styled.small`
  transform: rotate(-90deg);
  position: absolute;
  bottom: 0;
  left: 100%;
  transform-origin: left bottom;
  white-space: nowrap;
`

// PRODUCT SLIDER TITLE

const ProductSliderTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 0px;
`


const ProductSlider = ({products}) => {
  const productSliderRef = useRef(null);
  const containerRef = useRef(null);
  const {
    store: { checkout },
  } = useContext(StoreContext)


  return (
      <ProductSliderContainer ref={containerRef}>

        {/* PRODUCT SLIDER TOP */}
        <ProductSliderTop>
          {/* PRODUCT SLIDER HEADER */}
          <ProductSliderHeader>
            <Link to="/product/frontpage" className="link-hover">
              <span>discover more</span>
            </Link>
          </ProductSliderHeader>

          {/* PRODUCT SLIDER NAVI */}
          <ProductSliderNavi>
            <ProductSliderButton onClick={() => productSliderRef.current.go('<')}>
              <svg width="25" height="25" viewBox="0 0 1024 1024">
                <path d="M10.24 486.4c0 2.56 0 2.56 0 0-15.36 15.36-15.36 38.4 0 51.2l325.12 325.12c0 0 0 0 0 0 15.36 15.36 35.84 15.36 51.2 0 12.8-15.36 12.8-35.84 0-51.2l-261.12-261.12h865.28c17.92 0 33.28-15.36 33.28-33.28 0-20.48-15.36-38.4-33.28-38.4h-865.28l261.12-263.68c2.56-2.56 2.56-2.56 5.12-5.12 12.8-15.36 10.24-38.4-5.12-51.2s-38.4-10.24-51.2 5.12l-325.12 322.56z"></path>
              </svg>
            </ProductSliderButton>
            <ProductSliderButton onClick={() => productSliderRef.current.go('>')}>
              <svg width="25" height="25" viewBox="0 0 1024 1024">
                <path d="M688.64 163.84c-12.8-15.36-35.84-17.92-51.2-5.12s-17.92 35.84-5.12 51.2c2.56 2.56 2.56 2.56 5.12 5.12l261.12 261.12h-862.72c-20.48 0-35.84 17.92-33.28 38.4 0 17.92 15.36 33.28 33.28 33.28h865.28l-263.68 263.68c-12.8 15.36-12.8 35.84 0 51.2 15.36 15.36 35.84 15.36 51.2 0 0 0 0 0 0 0l325.12-325.12c15.36-12.8 15.36-35.84 0-51.2 0 0 0 0 0 0l-325.12-322.56z"></path>
              </svg>
            </ProductSliderButton>
          </ProductSliderNavi>
        </ProductSliderTop>

        <Glide
          ref={productSliderRef}
          type="slider"
          perView={3}
          breakpoints={{
            1200: {
              perView: 2,
              gap: 20,
              peek: {
                before: 0,
                after: 200,
              }
            },
            700: {
              perView: 1,
              gap: 20,
              peek: {
                before: 0,
                after: 200,
              },
            },
            500: {
              perView: 1,
              gap: 20,
              peek: {
                before: 0,
                after: 100,
              },
            },
          }} 
          gap={30}
          bound={true}
          peek={{
            before: 0,
            after: 200,
          }}
          slideClassName="slider__frame"
        >
          {products.map(
              ({
                  id,
                  handle,
                  title,
                  images,
                  variants: [firstVariant],
                },
              ) => {
                return (

                  <ProductSliderItem key={id}>

                  {/* PRODUCT SLIDER ITEM*/}

                    <ProductSliderLink to={`/product/${handle}/`}>

                      <ProductSliderImage>
                        {images.map((image, index) => {
                          const pluginImage = getImage(image.localFile)
                          return image.localFile && index <= 1 && (
                            <GatsbyImage 
                              image={pluginImage} 
                              alt={handle} 
                              key={image.id} 
                              className={index === 0 ? 'image-product' : 'image-detail'}
                            />
                          )
                        })}
                      </ProductSliderImage>

                      {/* PRODUCT SLIDER SOLD */}
                      {firstVariant.availableForSale ? '' : <ProductSliderSold>will be back soon</ProductSliderSold>}

                    </ProductSliderLink>

                    {/* PRODUCT SLIDER TITLE */}

                    <ProductSliderTitle>
                      <Link to={`/product/${handle}/`} className="link-hover">
                        <span>{title}</span>
                      </Link>
                    </ProductSliderTitle>

                  </ProductSliderItem>
                )
              }
            )}
        </Glide>
      </ProductSliderContainer>
  )
}

export default ProductSlider;
