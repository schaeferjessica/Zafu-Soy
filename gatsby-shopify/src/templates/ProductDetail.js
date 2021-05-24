import React from 'react'
import { graphql } from 'gatsby'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import ProductDetailInput from '~/components/ProductDetailInput'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'
import { breakpoint, container } from '../utils/styles'

const ImageInner = styled.div`
  .gatsby-image-wrapper-constrained {
    width: 100%;
  }
`
const ImageHeader = styled.div`
  img {
    width: 100%;
    height: 100vh;

    @media ${breakpoint.mobile} {
      height: auto;
    }
  }

  .gatsby-image-wrapper-constrained {
    width: 100%;
  }
`

const ImageProduct = styled.div`
  ${container}
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  margin-top: 80px;
  align-items: center;

  @media ${breakpoint.tablet} {
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    margin-top: 50px;
  }

  @media ${breakpoint.mobile} {
    margin-top: 30px;
  }
`

const Box = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #FAF9F8;
  padding: 20px;
  width: 40%;

  @media ${breakpoint.desktop} {
    width: 50%;
  }

  @media ${breakpoint.tablet} {
    width: 60%;
  }

  @media ${breakpoint.mobile} {
    width: 100%;
    position: static;
    box-sizing: border-box;
  }
`

const Description = styled.div`
  margin-top: 15px;
  display: block;
`

export const query = graphql`
  query ($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
        name
        values
      }
      variants {
        id
        title
        price
        availableForSale
        shopifyId
        selectedOptions {
          name
          value
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

const ProductDetail = ({ data }) => {
  const product = data.shopifyProduct

  const price = Intl.NumberFormat(undefined, {
    currency: product.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(product.variants[0].price)

  return (
    <>
      <Seo title={product.title} description={product.description} />
      <Navigation isTransparent={true}/>
      <div>
        <div>
        <ImageHeader>
          {product.images.map((image, index) => {
            if (index === 0) { 
            const pluginImage = getImage(image.localFile)
            return (
              <ImageInner className='image-heading' key={image.id}>
                <GatsbyImage
                image={pluginImage}
                alt={product.title}
              />
              </ImageInner>
            )
            }
          })}
        </ImageHeader>
        <Box>
          <h1>{product.title}</h1>
          
          <span>{price}</span>
          <Description
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
          <ProductDetailInput product={product} />
        </Box>
        <ImageProduct>
          {product.images.map((image, index) => {
              if (index !== 0) {
                const pluginImage = getImage(image.localFile)
                return (
                  <ImageInner className='image-product' key={image.id}>
                    <GatsbyImage
                    image={pluginImage}
                    alt={product.title}
                  />
                  </ImageInner>
                )
              }
            })}
          </ImageProduct>
          </div>
        </div>
    </>
  )
}


export default ProductDetail
