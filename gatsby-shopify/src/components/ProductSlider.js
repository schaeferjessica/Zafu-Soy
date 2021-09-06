import React, { useContext, useRef } from 'react'
import StoreContext from '~/context/StoreContext'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled/macro';
import { headerSpace } from '../utils/styles'
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import { Link } from 'gatsby'

// PRODUCT SLIDER

const ProductSliderContainer = styled.div`
  text-align: center;

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
  margin-right: 30px;
`

const ProductSliderButton = styled.div`
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
    transform: translate(0%) scale(1.3);
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
  margin-top: 20px;

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

const ProductSliderImage = styled.div`
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

// PRODUCT SLIDER TITLE

const ProductSliderTitle = styled.h3`
  margin-top: 20px;
  margin-bottom: 0px;
`


const ProductSliderSold = styled.small`
  color: var(--color-white);
  padding: 2px 5px;
  display: inline-block;
  margin-top: 5px;
  background-color: var(--color-orange);
  font-weight: 400;
`


const ProductSlider = ({products}) => {
  const sliderRef = useRef(null);
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
              <span>Compliment with</span>
            </Link>
          </ProductSliderHeader>

          {/* PRODUCT SLIDER NAVI */}
          <ProductSliderNavi>
            <ProductSliderButton onClick={() => sliderRef.current.go('<')}>
              <svg width="1024" height="1024" viewBox="0 0 1024 1024">
                <path d="M10.24 486.4c0 2.56 0 2.56 0 0-15.36 15.36-15.36 38.4 0 51.2l325.12 325.12c0 0 0 0 0 0 15.36 15.36 35.84 15.36 51.2 0 12.8-15.36 12.8-35.84 0-51.2l-261.12-261.12h865.28c17.92 0 33.28-15.36 33.28-33.28 0-20.48-15.36-38.4-33.28-38.4h-865.28l261.12-263.68c2.56-2.56 2.56-2.56 5.12-5.12 12.8-15.36 10.24-38.4-5.12-51.2s-38.4-10.24-51.2 5.12l-325.12 322.56z"></path>
              </svg>
            </ProductSliderButton>
            <ProductSliderButton onClick={() => sliderRef.current.go('>')}>
              <svg width="1024" height="1024" viewBox="0 0 1024 1024">
                <path d="M688.64 163.84c-12.8-15.36-35.84-17.92-51.2-5.12s-17.92 35.84-5.12 51.2c2.56 2.56 2.56 2.56 5.12 5.12l261.12 261.12h-862.72c-20.48 0-35.84 17.92-33.28 38.4 0 17.92 15.36 33.28 33.28 33.28h865.28l-263.68 263.68c-12.8 15.36-12.8 35.84 0 51.2 15.36 15.36 35.84 15.36 51.2 0 0 0 0 0 0 0l325.12-325.12c15.36-12.8 15.36-35.84 0-51.2 0 0 0 0 0 0l-325.12-322.56z"></path>
              </svg>
            </ProductSliderButton>
          </ProductSliderNavi>
        </ProductSliderTop>

        <Glide
          ref={sliderRef}
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

                    <Link to={`/product/${handle}/`}>

                      <ProductSliderImage>
                        {images.map((image, index) => {
                          const pluginImage = getImage(image.localFile)
                          return image.localFile && index <= 1 && (
                            <GatsbyImage image={pluginImage} alt={handle} key={image.id} className={index === 0 ? 'image-product' : 'image-detail'}/>
                          )
                        })}
                      </ProductSliderImage>

                    </Link>

                    {/* PRODUCT SLIDER TITLE */}

                    <ProductSliderTitle>
                      <Link to={`/product/${handle}/`} className="link-hover">
                        <span>{title}</span>
                      </Link>
                    </ProductSliderTitle>

                    {firstVariant.availableForSale ? '' : <ProductSliderSold>will be back soon</ProductSliderSold>}
                  </ProductSliderItem>
                )
              }
            )}
        </Glide>
      </ProductSliderContainer>
  )
}

export default ProductSlider;
