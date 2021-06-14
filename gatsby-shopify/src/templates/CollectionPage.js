import React, { useState, useEffect, useContext } from 'react'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import { graphql, Link } from 'gatsby'
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
    margin-top: 0px;
  }

  @media ${breakpoint.tablet} { 
    margin-top: 50px;
  }

  @media ${breakpoint.mobile} { 
    margin-top: 40px;
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

export const query = graphql`
    query {
      allShopifyCollection(sort: { fields: [updatedAt], order:  ASC}, filter: { handle: { ne: "frontpage" } }) {
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
    
      const isShopAllPage = pageContext.handle === 'frontpage';
  return (
    <>
    <Seo title={pageContext.title} description={pageContext.descriptionHtml} />
    <Navigation isTransparent={true} onOrderButtonClick={() => setIsOpen(!isOpen)} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>
    <Collection>
        <CollectionItem>
            <Context>
                <ContextWrapper>
                    <h2>{pageContext.title}</h2>
                    <Text
                    dangerouslySetInnerHTML={{ __html: pageContext.descriptionHtml }}>
                    </Text>
                </ContextWrapper>
            </Context>
            {isShopAllPage ? <ul>{data.allShopifyCollection.nodes.map(node => <li key={node.handle}><Link to={`/collection/${node.handle}`}>{node.title}</Link></li>)}</ul>: ''}
            <ProductContainer>
                <Product>
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
    </Collection>
    </>
  )
}

export default CollectionPage
