import React, { useContext, useRef } from 'react'
import StoreContext from '~/context/StoreContext'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { breakpoint } from '../utils/styles'
import styled from '@emotion/styled/macro';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import { Link } from 'gatsby'
import { ProductImage, H3, SpanPrice, SpanSold } from '~/components/ProductGrid'

const ProductsSlider = styled.div`
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
    left: 1rem;
  }

  .Glide-rightArrow  {
    right: 1rem;
  }

  .glide__slides {
    margin-top: 0px;
  }

  button {
    top: 45%;
    text-align: left;
  }
`

const ProductItem = styled.div`
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

const LinkItem = styled(Link)`
  &:hover {
    text-decoration: none;
  }    
`

const ProductSlider = ({products}) => {
  const gliderRef = useRef(null);
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
      <ProductsSlider ref={containerRef}>
        <Glide
          ref={gliderRef}
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
                  <ProductItem key={id}>
                    <LinkItem to={`/product/${handle}/`}>
                      <ProductImage>
                      
                        {images.map((image, index) => {
                          const pluginImage = getImage(image.localFile)
                          return image.localFile && index <= 1 && (
                            <GatsbyImage image={pluginImage} alt={handle} key={image.id} className={index === 0 ? 'image-product' : 'image-detail'}/>
                          )
                        })}
                      </ProductImage>

                      <H3>{title}</H3>
                    </LinkItem>

                    {/* SLIDER PRODUCTS PRICE*/}

                    <SpanPrice>{getPrice(firstVariant.price)}</SpanPrice>
                    {firstVariant.availableForSale ? '' : <SpanSold>will be back soon</SpanSold>}
                  </ProductItem>
                )
              }
            )}
        </Glide>
      </ProductsSlider>
  )
}

export default ProductSlider;
