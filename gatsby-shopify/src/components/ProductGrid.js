import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'

import { breakpoint } from '../utils/styles'

const Collection = styled.section`
margin: 30px 0 0 0;
padding: 0;
list-style: none;
display: flex;
min-height: 100%;
flex-direction: column;
`

const CollectionPicture = styled.div`
  margin-top: 70px; 

  @media ${breakpoint.desktop} {
    margin-top: 50px;
  }

  @media ${breakpoint.tablet} {
    margin-top: 40px;
  }

  @media ${breakpoint.mobile} {
    margin-top: 30px;
  }
`


const Product = styled.ul`
  margin: 50px 0 0 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 4rem;

  @media ${breakpoint.desktop} {
    margin: 30px 0 0 0;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
  }

  @media ${breakpoint.tablet} {
    margin: 20px 0 0 0;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  @media ${breakpoint.mobile} {
    gap: 1rem;
  } 
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
      allShopifyCollection(sort: { fields: [updatedAt], order:  DESC}) {
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
        return <div key={collection.id}>
          {image && (
            <CollectionPicture>
              <GatsbyImage image={image} alt={collection.title} key={image.id} layout="fullWidth"/>
            </CollectionPicture>
          )}
        <H2>{collection.title}</H2>
        <Text>{collection.description}</Text>

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
      </div>
      })}
    </Collection>
  )
}

export default ProductGrid
