import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { breakpoint, container, moduleSpace } from '../utils/styles'

const Collection = styled.section`
  display: flex;
  flex-direction: column;
`

const CollectionItem = styled.div`
  ${moduleSpace}
`

export const ProductContainer = styled.div`
  ${container}
`

export const Product = styled.ul`
  list-style: none;
  display: grid;
  padding: 0;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 4rem;
  margin-top: 40px;
  margin-bottom: 0px;

  @media ${breakpoint.desktop} {
    margin-top: 20px;
    grid-gap: 3rem;

  }

  @media ${breakpoint.tablet} {
    margin-top: 10px;
    grid-gap: 2rem;
    grid-template-columns: 1fr 1fr;
  }

  @media ${breakpoint.mobile} {
    grid-column-gap: 1rem;
    grid-row-gap: 1.5rem;
  } 
`

export const ProductItem = styled.li`
  margin-top: 15px;

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

const Text = styled.div`
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

const H2 = styled.h2`
    margin-bottom: 10px;
`

export const H3 = styled.h3`
  margin-top: 5px;
  margin-bottom: 0px;
`

export const SpanPrice = styled.small`
  display: block;
`

export const SpanSold = styled.small`
  color: var(--color-white);
  padding: 2px 5px;
  display: inline-block;
  margin-top: 5px;
  background-color: var(--color-orange);
  font-weight: 400;
`

export const UlFilter = styled.ul`
    ${container}
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`

export const LiFilter = styled.li`
    border-radius: 18px;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid var(--color-gray);
    line-height: 28px;
    margin-right: 12px;
    margin-top: 10px;

    &:hover {
        border: 1px solid var(--color-blue);
    }
`

export const LinkItem = styled(Link)`
    &:hover {
        text-decoration: none;
    }    
`

export const LinkFilter = styled(Link)`
    &:hover {
        text-decoration: none;
    }    
`


const ProductGrid = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const { allShopifyCollection, filters, shopifyCollection} = useStaticQuery(
    graphql`
    query {
      filters: allShopifyCollection(sort: { fields: [updatedAt], order:  ASC}, filter: { handle: { ne: "frontpage" } }) {
        nodes {
          title
          handle
        }
      }
      allShopifyCollection(filter: { handle: { eq: "frontpage" } }) {
        nodes {
          title
          handle
          descriptionHtml
          id
        }
      }
      shopifyCollection(title: {eq: "shop all"}) {
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
    `
  )

  const getPrice = price =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : 'EUR',
      minimumFractionDigits: 2,
      style: 'currency',
    }).format(parseFloat(price ? price : 0));

  return (
    <Collection id="shopnow">
      {allShopifyCollection.nodes.map(collection => {
        return (
        <CollectionItem key={collection.id}>
          <Context>
            <ContextWrapper>
              <H2>{collection.title}</H2>
              <Text
                dangerouslySetInnerHTML={{ __html: collection.descriptionHtml }}>
              </Text>
            </ContextWrapper>
          </Context>

          <UlFilter>
          {filters.nodes.map((filter) => {
              if (filter.handle !== 'frontpage') {
                return <LiFilter key={filter.handle}><LinkFilter to={`/collection/${filter.handle}`}>{filter.title}</LinkFilter></LiFilter>
              } else {
                return null;
              }
            })}
          </UlFilter>

          <ProductContainer>
            <Product>
            {shopifyCollection ? (
              shopifyCollection.products.map(
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
      </CollectionItem>
      )
      })}
    </Collection>
  )
}

export default ProductGrid
