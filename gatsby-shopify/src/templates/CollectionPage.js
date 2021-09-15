// react
import React, { useState, useEffect, useContext } from 'react'
import Seo from '~/components/seo'

// gatsby
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// components
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import StoreContext from '~/context/StoreContext'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container, moduleSpace } from '../styles/containers'

// COLLECTION

const Collection = styled.section`
  display: flex;
  flex-direction: column;
`

const CollectionItem = styled.div`
  ${moduleSpace};
`


// COLLECTION CONTEXT

const CollectionContext = styled.div`
  ${container}
`

const CollectionContextInner = styled.div`
  max-width: 70%;

  @media ${breakpoint.tablet} {
    max-width: 100%;
  }
`

const CollectionTitle = styled.h1`
    margin-bottom: 10px;
`

const CollectionText = styled.div`
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


// COLLECTION FILTER

const CollectionFilterList = styled.ul`
    ${container}
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
`

const CollectionFilterItem = styled.li`
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

const CollectionFilterLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`


// COLLECTION GRID

const CollectionGrid = styled.div`
  ${container}
`

const CollectionGridList = styled.ul`
  list-style: none;
  display: grid;
  padding: 0;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 3.2rem;
  margin-top: 50px;
  margin-bottom: 0px;

  @media ${breakpoint.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 30px;
  }

  @media ${breakpoint.tablet} {
    margin-top: 20px;
    grid-template-columns: 1fr 1fr;
  }

  @media ${breakpoint.mobile} {
    grid-gap: 2rem;
    grid-column-gap: 1rem;
    grid-template-columns: 1fr;
    padding-left: 15px;
    padding-right: 15px;
  } 
`

const CollectionGridListItem = styled.li`
  margin-top: 20px;
  position: relative;

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

const CollectionGridImage = styled.div`
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

// COLLECTION GRID TITLE

const CollectionGridTitle = styled.h3`
  margin-bottom: 10px;
`

// COLLECTION GRID PRICE

const CollectionGridPrice = styled.small`
  display: block;
  margin-top: 10px;
`

const CollectionGridSold = styled.small`
  transform: rotate(270deg) translateX(80px);
  position: absolute;
  bottom: 0;
  right: -67px;
`



export const query = graphql`
    query {
      allShopifyCollection(sort: { fields: [updatedAt], order:  ASC}) {
        nodes {
          title
          handle
        }
      }
    }
`;
 
const CollectionPage = ({pageContext, data}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    store: { checkout },
  } = useContext(StoreContext);


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
    
  return (
    <>
    <Seo title={pageContext.title} description={pageContext.descriptionHtml} />
    <Navigation onOrderButtonClick={() => setIsOpen(!isOpen)} hasScroll={false} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>

    {/* COLLECTION */}

    <Collection>
        <CollectionItem>

            {/* COLLECTION CONTEXT */}

            <CollectionContext>
                <CollectionContextInner>

                    <CollectionTitle>{pageContext.title}</CollectionTitle>
                    <CollectionText dangerouslySetInnerHTML={{ __html: pageContext.descriptionHtml }}></CollectionText>
                    
                </CollectionContextInner>
            </CollectionContext>

            {/* COLLECTION FILTER */}

            <CollectionFilterList>{data.allShopifyCollection.nodes.filter(node => node.title !== pageContext.title).map(node => 
              <CollectionFilterItem key={node.handle}>
                <CollectionFilterLink to={`/collection/${node.handle}`}>{node.title}</CollectionFilterLink>
              </CollectionFilterItem>)}
            </CollectionFilterList>
            
            {/* COLLECTION GRID */}

            <CollectionGrid>
                <CollectionGridList>
                    {pageContext.products ? (
                        pageContext.products.map(
                        ({
                            id,
                            handle,
                            title,
                            images,
                            variants: [firstVariant],
                            },
                        ) => {
                            return (
                            <CollectionGridListItem key={id}>

                              {/* COLLECTION GRID TITLE */}
                              <CollectionGridTitle>
                                  <Link to={`/product/${handle}/`} className="link-hover">
                                    <span>{title}</span>
                                  </Link>
                                </CollectionGridTitle>

                                {/* COLLECTION GRID ITEM */}
                                <Link to={`/product/${handle}/`}>
                                  <CollectionGridImage>
                                      {images.map((image, index) => {
                                      const pluginImage = getImage(image.localFile)
                                      return image.localFile && index <= 1 &&(
                                          <GatsbyImage image={pluginImage} alt={handle} key={image.id} className={index === 0 ? 'image-product' : 'image-detail'}/>
                                      )
                                      })}
                                  </CollectionGridImage>
                                </Link>

                                {/* COLLECTION GRID PRICE */}
                                <CollectionGridPrice>{getPrice(firstVariant.price)}</CollectionGridPrice>
                                {firstVariant.availableForSale ? '' : <CollectionGridSold>will be back soon</CollectionGridSold>}
                            </CollectionGridListItem>
                            )
                        }
                        )
                    ) : (
                        <p>No Products found!</p>
                    )}
                </CollectionGridList>

            </CollectionGrid>
        </CollectionItem>
    </Collection>
    </>
  )
}

export default CollectionPage
