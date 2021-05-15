import React from 'react'
import { graphql } from 'gatsby'

import Seo from '~/components/seo'
import ProductDetail from '~/components/ProductDetail'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct
  return (
    <>
      <Seo title={product.title} description={product.description} />
      <div>
        <div>
          <div>
            {product.images.map(image => {
              const pluginImage = getImage(image.localFile)
              return (
                <GatsbyImage
                  image={pluginImage}
                  alt={product.title}
                  key={image.id}
                />
              )
            })}
          </div>
          <div>
            <h1>{product.title}</h1>
            <div
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
            <ProductDetail product={product} />
          </div>
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
            gatsbyImageData(width: 1000)
          }
        }
      }
    }
  }
`

export default ProductPage
