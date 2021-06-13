import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { breakpoint, container } from '../utils/styles'

const Collection = styled.section`
  display: flex;
  flex-direction: column;
`

const CollectionItem = styled.div`
  margin-top: 80px;

  @media ${breakpoint.desktop} { 
    margin-top: 70px;
  }

  @media ${breakpoint.tablet} { 
    margin-top: 50px;
  }

  @media ${breakpoint.mobile} { 
    margin-top: 40px;
  }
`

const CollectionPicture = styled.div`
  margin: 0 auto; 
  display: none;

  .gatsby-image-wrapper {
    height: 100vh;
  }
`

export const ProductContainer = styled.div`
  ${container}
`

export const Product = styled.ul`
  list-style: none;
  display: grid;
  padding: 0;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-top: 50px;

  @media ${breakpoint.desktop} {
    margin-top: 30px;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
  }

  @media ${breakpoint.tablet} {
    margin-top: 20px;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media ${breakpoint.mobile} {
    margin-bottom: 60px;
    gap: 1rem;
  } 
`

export const ProductItem = styled.li`
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

export const ProductImage = styled.div`
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

const Context = styled.div`
  ${container}
`

const ContextWrapper = styled.div`
  max-width: 70%;

  @media ${breakpoint.tablet} {
    max-width: 100%;
  }
`

const H2 = styled.h2`
  font-size: 17px;

  @media ${breakpoint.desktop} {
    font-size: 16px;
  }
  
  @media ${breakpoint.tablet} {
    font-size: 15px;
  }
`

const Text = styled.div`
  font-size: 22px;

  @media ${breakpoint.desktop} {
    font-size: 20px;
  }
  
  @media ${breakpoint.tablet} {
    font-size: 18px;
  }

  p {
    margin-top: 10px;
    width: 70%;
  
    @media ${breakpoint.desktop} {
      margin-top: 5px;
      width: 65%;
    }
    
    @media ${breakpoint.tablet} {
      margin-top: 0px;
      width: 100%;
    }
  }
`

export const H3 = styled.h3`
  margin-top: 5px;
`

export const SpanPrice = styled.span`
  display: block;
`

export const SpanSold = styled.span`
  color: var(--color-gray);
  border: 1px solid var(--color-gray);
  padding: 0px 5px;
  display: inline-block;
  margin-top: 5px;
  font-size: 15px;

  @media ${breakpoint.mobile} {
    font-size: 14px;
  }
`


const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const { allShopifyCollection } = useStaticQuery(
    graphql`
    query {
      allShopifyCollection(sort: { fields: [updatedAt], order:  ASC}) {
        nodes {
          image {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          id
          title
          descriptionHtml
          products {
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
    }
    `
  )

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0));

  return (
    <Collection>
      {allShopifyCollection.nodes.map(collection => {
        const image = collection.image ? getImage(collection.image.localFile) : null;
        return <CollectionItem key={collection.id}>
          {image && (
            <CollectionPicture>
              <GatsbyImage image={image} alt={collection.title} key={image.id} layout="fullWidth"/>  
            </CollectionPicture>
          )}
        <Context>
          <ContextWrapper>
            <H2>{collection.title}</H2>
            <Text
              dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}>
            </Text>
          </ContextWrapper>
        </Context>

        <ProductContainer>
          <Product>
          {collection.products ? (
            collection.products.map(
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
                      <SpanPrice>{getPrice(firstVariant.price)}</SpanPrice>
                      {firstVariant.availableForSale ? '' : <SpanSold>Sold out</SpanSold>}
                  </ProductItem>
                )
              }
            )
          ) : (
            <p>No Products found!</p>
          )}
          </Product>
        </ProductContainer>
      </CollectionItem>
      })}
    </Collection>
  )
}

export default ProductGrid
