import React, { useState, useEffect, useContext, useRef } from 'react'
import StoreContext from '~/context/StoreContext'
import { graphql, Link } from 'gatsby'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import ProductDetailInput from '~/components/ProductDetailInput'
import { Product, ProductItem, ProductImage, H3, SpanPrice, SpanSold} from '~/components/ProductGrid'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'
import { breakpoint, container, moduleSpace, moduleSpaceSmall } from '../utils/styles'
import Lightbox from '../utils/photoswipe/Lightbox';

const ImageInner = styled.div`
  .gatsby-image-wrapper-constrained {
    width: 100%;
  }
`
const ImageHeader = styled.div`
  img {
    width: 100%;
    height: 100vh;
  }

  .gatsby-image-wrapper-constrained {
    width: 100%;
  }
`

const ImageProduct = styled.div`
  ${container}
  ${moduleSpaceSmall}
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  align-items: center;

  @media ${breakpoint.tablet} {
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
`

const ProductDetailInner = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: var(--color-white);
  padding: 20px;
  width: 40%;

  @media ${breakpoint.desktop} {
    width: 50%;
  }

  @media ${breakpoint.tablet} {
    width: 70%;
  }

  @media ${breakpoint.mobile} {
    width: 100%;
    position: static;
    box-sizing: border-box;
    display: flex;
    flex-direction: column-reverse;
    margin-top: -130px;
  }
`

const ProductDetailContext = styled.div`
  @media ${breakpoint.mobile} {
    margin-top: 100px;
  }
`

const Description = styled.div`
  margin-top: 15px;
  display: block;
`

const ProductContainer = styled.div`
  ${container}
  ${moduleSpace}
`

const LinkItem = styled(Link)`
    &:hover {
        text-decoration: none;
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
        altText
        id
        localFile {
          childImageSharp {
            gatsbyImageData
            original {
              width
              height
            }
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
          availableForSale
        }
      }
    }
  }
`
 
const ProductDetail = ({ data }) => {
  const galleryEl = useRef(null);
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
      document.querySelector('body').classList.add('prevent-scroll--overlay');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll--overlay');
    }
  }, [isOpen]);
  
  useEffect(() => {
    if (galleryEl) {
      new Lightbox(galleryEl.current, {
        selector: '.lightbox-toggle',
      }).init();
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
      <Navigation onOrderButtonClick={() => setIsOpen(!isOpen)} />
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
              } else {
                return null;
              }
            })}
          </ImageHeader>
          <ProductDetailInner>
            <ProductDetailContext>
              <h1>{product.title}</h1>
              <span>{price}</span>
              <Description
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </ProductDetailContext>
            <ProductDetailInput product={product} />
          </ProductDetailInner>
          <ImageProduct ref={galleryEl}>
            {product.images.map((image, index) => {
              if (index !== 0) {
                const pluginImage = getImage(image.localFile)
                return (
                  <ImageInner
                    key={image.id}
                    className='image-product lightbox-toggle'
                    aria-label="Bild in einem Leuchtkasten öffnen"
                    data-size={`${image.localFile.childImageSharp.original.width}x${image.localFile.childImageSharp.original.height}`}
                    data-src={image.originalSrc}
                    data-title={image.altText}
                    data-figcaption=""
                    data-copyright=""
                  >
                    <GatsbyImage
                    image={pluginImage}
                    alt={product.title}
                  />
                  </ImageInner>
                )
              } else {
                return null;
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
                    <LinkItem to={`/product/${handle}/`}>
                      <ProductImage>
                        {images.map((image, index) => {
                          const pluginImage = getImage(image.localFile)
                          return image.localFile && (
                            <GatsbyImage image={pluginImage} alt={handle} key={image.id} className={index === 0 ? 'image-product' : 'image-detail'}/>
                          )
                        })}
                      </ProductImage>
                      <H3>{title}</H3>
                    </LinkItem>
                      <SpanPrice>{getPrice(firstVariant.price)}</SpanPrice>
                      {firstVariant.availableForSale ? '' : <SpanSold>will be back soon</SpanSold>}
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
