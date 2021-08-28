import React, { useContext, useRef } from 'react'
import StoreContext from '~/context/StoreContext'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled/macro';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import { Link } from 'gatsby'

// PRODUCT SLIDER

const ProductSliderContainer = styled.div`
  .Glide-leftArrow,
  .Glide-rightArrow  {
    padding: 3px;
    color: var(--color-blue);

    svg {
      width: 40px;
      height: 16px;
    }
  }

  .Glide-leftArrow  {
    left: 1%;
  }

  .Glide-rightArrow  {
    right: 8%;
  }

  .glide__slides {
    margin-top: 0px;
  }

  button {
    top: 45%;
    text-align: left;
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

const ProductSliderLink = styled(Link)`
  &:hover {
    text-decoration: none;
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

const ProductSliderTitle = styled.h3`
  margin-top: 5px;
  margin-bottom: 0px;
`


// PRODUCT SLIDER PRICE

const ProductSliderPrice = styled.small`
  display: block;
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

  const getPrice = price =>
  Intl.NumberFormat(undefined, {
    currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : 0));


  return (
      <ProductSliderContainer ref={containerRef}>
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

                    <ProductSliderLink to={`/product/${handle}/`}>

                      <ProductSliderImage>
                        {images.map((image, index) => {
                          const pluginImage = getImage(image.localFile)
                          return image.localFile && index <= 1 && (
                            <GatsbyImage image={pluginImage} alt={handle} key={image.id} className={index === 0 ? 'image-product' : 'image-detail'}/>
                          )
                        })}
                      </ProductSliderImage>

                      <ProductSliderTitle>{title}</ProductSliderTitle>
                    </ProductSliderLink>

                    {/* PRODUCT SLIDER PRICE*/}

                    <ProductSliderPrice>{getPrice(firstVariant.price)}</ProductSliderPrice>
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
