import React, { useState, useEffect, useContext } from 'react'
import StoreContext from '~/context/StoreContext'
import { graphql, Link } from 'gatsby'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import ProductDetailInput from '~/components/ProductDetailInput'
import { Product, ProductItem, ProductImage, H3} from '~/components/ProductGrid'
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
  grid-template-columns: 1fr 1fr 1fr;
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

const ProductContainer = styled.div`
  ${container}

  margin-top: 100px;

  @media ${breakpoint.tablet} {
    margin-top: 80px;
  }

  @media ${breakpoint.mobile} {
    margin-top: 50px;
  }
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
    allShopifyProduct(
      sort: { fields: createdAt, order: DESC }
      limit: 4
      filter: { handle: { ne: $handle } }
    ) {
      nodes {
        id
        title
        handle
        createdAt
        images {
          id
          originalSrc
          localFile {
            childImageSharp {
              gatsbyImageData(width: 500)
            }
          }
        }
        variants {
          price
        }
      }
    }
  }
`

const ProductDetail = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const product = data.shopifyProduct
  const newestProducts = data.allShopifyProduct.nodes;

  const {
    store: { checkout },
  } = useContext(StoreContext)

  const getPrice = price =>
  Intl.NumberFormat(undefined, {
    currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(parseFloat(price ? price : 0));

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll');
    }
  }, [isOpen]);

  const price = Intl.NumberFormat(undefined, {
    currency: product.priceRange.minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(product.variants[0].price)

  return (
    <>
      <Seo title={product.title} description={product.description} />
      <Navigation isTransparent={true} onOrderButtonClick={() => setIsOpen(!isOpen)} />
      <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>
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

        <ProductContainer>
          <h2>New arrivals</h2>
          <Product>
          {newestProducts.length ? (
            newestProducts.map(
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
                    <Link to={`/product/${handle}/`}>
                      <ProductImage>
                        {images.map((image, index) => {
                          const pluginImage = getImage(image.localFile)
                          return image.localFile && (
                            <GatsbyImage image={pluginImage} alt={handle} key={image.id} className={index === 0 ? 'image-product' : 'image-detail'}/>
                          )
                        })}
                      </ProductImage>
                      <H3>{title}</H3>
                    </Link>
                      <span>{getPrice(firstVariant.price)}</span>
                  </ProductItem>
                )
              }
            )
          ) : (
            <p>No Products found!</p>
          )}
          </Product>
        </ProductContainer>
    </>
  )
}


export default ProductDetail
