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
  margin-top: 100px;

  @media ${breakpoint.desktop} {
    margin-top: 80px;
  }

  @media ${breakpoint.tablet} {
    margin-top: 50px;
  }
`

const CollectionPicture = styled.div`
  max-width: 1440px;
  margin: 0 auto; 
`

const ProductContainer = styled.div`
  ${container}
`

const Product = styled.ul`
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
    gap: 1rem;
  } 
`
const Context = styled.div`
  ${container}
`

const H2 = styled.h2`
  margin-top: 50px;

  @media ${breakpoint.desktop} {
    margin-top: 30px;
  }

  @media ${breakpoint.tablet} {
    margin-top: 20px;
  }
`

const Text = styled.p`
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
`

const H3 = styled.h3`
  margin-top: 5px;
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
                gatsbyImageData(width: 1440, height: 810)
              }
            }
          }
          id
          title
          description
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
                  gatsbyImageData(width: 1000)
                }
              }
            }
            variants {
              price
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
    }).format(parseFloat(price ? price : 0))

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
          <H2>{collection.title}</H2>
          <Text>{collection.description}</Text>
        </Context>

        <ProductContainer>
          <Product>
          {collection.products ? (
            collection.products.map(
              ({
                  id,
                  handle,
                  title,
                  images: [firstImage],
                  variants: [firstVariant],
                },
              ) => {
                const image = getImage(firstImage.localFile)
                return (
                  <div key={id}>
                    <Link to={`/product/${handle}/`}>
                      {firstImage && firstImage.localFile && (
                        <GatsbyImage image={image} alt={handle} key={image.id} />
                      )}
                      <H3>{title}</H3>
                    </Link>
                      <span>{getPrice(firstVariant.price)}</span>
                  </div>
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
