import React, { useState, useEffect, useContext } from 'react'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { breakpoint, container, moduleSpace } from '../utils/styles'
import { CollectionCount} from '~/components/Menu'


const Collection = styled.section`
  display: flex;
  flex-direction: column;
`

const CollectionItem = styled.div`
  ${moduleSpace};
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

const ProductItem = styled.li`
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

const ProductImage = styled.div`
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

const H3 = styled.h3`
  margin-top: 5px;
`

const H2 = styled.h2`
    margin-bottom: 10px;
`

const SpanPrice = styled.small`
  display: block;
`

const SpanSold = styled.small`
  color: var(--color-white);
  padding: 2px 5px;
  display: inline-block;
  margin-top: 5px;
  background-color: #b55340; 
  font-weight: 400;
`
const UlFilter = styled.ul`
    ${container}
    list-style: none;
    display: flex;
`

const LiFilter = styled.li`
    border-radius: 18px;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    border: 1px solid var(--color-gray);
    line-height: 30px;
    margin-right: 12px;
    margin-top: 25px;

    &:hover {
        border: 1px solid var(--color-blue);
    }
`

const LinkItem = styled(Link)`
    &:hover {
        text-decoration: none;
    }    
`

const LinkFilter = styled(Link)`
    &:hover {
        text-decoration: none;
    }    
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
    <Navigation onOrderButtonClick={() => setIsOpen(!isOpen)} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>
    <Collection>
        <CollectionItem>
            <Context>
                <ContextWrapper>
                    <H2>{pageContext.title} <CollectionCount>{pageContext.products.length}</CollectionCount></H2>
                    <Text
                    dangerouslySetInnerHTML={{ __html: pageContext.descriptionHtml }}>
                    </Text>
                </ContextWrapper>
            </Context>
            <UlFilter>{data.allShopifyCollection.nodes.filter(node => node.title !== pageContext.title).map(node => <LiFilter key={node.handle}><LinkFilter to={`/collection/${node.handle}`}>{node.title}</LinkFilter></LiFilter>)}</UlFilter>
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
        </CollectionItem>
    </Collection>
    </>
  )
}

export default CollectionPage
