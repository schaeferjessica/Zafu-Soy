import React from 'react'
import { graphql } from 'gatsby'
import Seo from '~/components/seo'
import ProductDetailInput from '~/components/ProductDetailInput'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'

const ImageInner = styled.div`
  &.image-header {
    width: 500px;
  }

  .gatsby-image-wrapper-constrained {
    width: 100%;
  }

  &.image-product {
    width: 300px;
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
      <div>
        <div>
            {product.images.map((image, index) => {
              const pluginImage = getImage(image.localFile)
              return (
                <ImageInner className={index === 1 ? 'image-header' : 'image-product'} key={image.id}>
                  <GatsbyImage
                  image={pluginImage}
                  alt={product.title}
                />
                </ImageInner>
              )
            })}
          </div>
          <div>
            <h1>{product.title}</h1>
            
            <span>{price}</span>
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
            <ProductDetailInput product={product} />
          </div>
        </div>
    </>
  )
}

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

export default ProductDetail
