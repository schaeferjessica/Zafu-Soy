import React, { useState, useEffect, useContext, useRef } from 'react'
import StoreContext from '~/context/StoreContext'
import { graphql, Link } from 'gatsby'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import ImageSlider from '~/components/ImageSlider'
import ProductDetailInput from '~/components/ProductDetailInput'
import { Product, ProductItem, ProductImage, H3, SpanPrice, SpanSold, UlFilter, LiFilter, LinkFilter} from '~/components/ProductGrid'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'
import { breakpoint, container, moduleSpace } from '../utils/styles'
import Lightbox from '../utils/photoswipe/Lightbox';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

const ProductDetailWrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 70px);
  margin-top: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;


  @media ${breakpoint.tablet} {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-top: 60px;
  }
`

const ProductDetailLeft = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60%;
  height: 100%;

  @media ${breakpoint.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
`

const ProductTest = styled(Product)`
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media ${breakpoint.tablet} {
    grid-template-columns: 1fr 1fr;
  }
`;

const ImageHeaderLeft = styled.div`
  width: 68%;
  height: 100%;

  @media ${breakpoint.tablet} {
    display: block;
    width: 71%;
  }

  img {
    width: 100%;
    height: 100%;
  }

  .gatsby-image-wrapper-constrained {
    width: 100%;
    height: 100%;
  }
`

const ProductDetailLeftInner = styled.button`
  height: 100%;
  padding: 0;
  display: block;

  .gatsby-image-wrapper-constrained {
    width: 100%;
    height: 100%;
  }
`

const ProductDetailCenter = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  max-height: 100vh;
  height: 100%;
  width: 30%;
  flex-shrink: 1;
  align-items: center;

  
  @media ${breakpoint.tablet} {
    height: auto;
    max-height: inherit;
    justify-content: space-between;
    flex-direction: column;
    width: 22%;
    margin-left: 10px;

    &.img-col-two {
      width: 32%;
    }
  }
`

const ProductDetailCenterInner = styled.div`
  width: 100%;
  height: 32%;
  cursor: pointer;

  &.img-col-two {
    height: 48%;
    }

  @media ${breakpoint.tablet} {
    height: auto;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 5px;
    }
  }

  &:first-of-type {
    display: none;
  }

  .gatsby-image-wrapper-constrained {
    width: 100%;
    height: 100%;
  }
`

const ProductDetailRight = styled.div`
  width: 40%;
  padding: 40px;

  @media ${breakpoint.desktop} {
    width: 44%;
    padding: 20px;
  }

  @media ${breakpoint.tablet} {
    width: 100%;
  }

  .filter-tag {
    padding-left: 0;
    padding-right: 20px;
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

const DetailWrapper = styled.div` 
  ${moduleSpace}
  display: flex;
  align-items: flex-end;
  justify-content: space-between;  

  @media ${breakpoint.tablet} {
    ${container}
    display: block;
  }
`

const DetailText = styled.div` 
  width: 30%;
  padding-left: 100px;
  margin-bottom: 20px;

  @media ${breakpoint.desktop} {
    width: 40%;
    padding-left: 50px;
  }

  @media ${breakpoint.tablet} {
    width: 100%;
    margin-bottom: 30px;
    padding-left: 0px;
  }

  b {
    margin-top: 25px;
    margin-bottom: 5px;
    display: block;
  }
`

const DetailSlider = styled.div` 
  width: 59%;

  @media ${breakpoint.desktop} {
    width: 50%;
  }

  @media ${breakpoint.tablet} {
    width: 100%;
  }
`



export const query = graphql`
  query ($handle: String!, $sku: String) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      tags
      options {
        id
        name
        values
      }
      variants {
        id
        sku
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
            gatsbyImageData(width: 850)
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
    contentfulDetail(contentfulid: { eq: $sku }) {
      contentfulid
      text {
        raw
      }
      images {
        description
        gatsbyImageData(width: 500)
      }
    }
  }
`
 
const ProductDetail = ({ data }) => {
  const galleryEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const product = data.shopifyProduct
  const newestProducts = data.allShopifyProduct.nodes;
  const detailInfo = data.contentfulDetail;
  const options  = {
    renderText: text => {
      return text.split('\n').reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, []);
    },
  };

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
      <ProductDetailWrapper>

        <ProductDetailLeft ref={galleryEl}>
            <ImageHeaderLeft>
              {product.images.map((image, index) => {
                if (index === 0) { 
                const pluginImage = getImage(image.localFile)
                return (
                  <ProductDetailLeftInner 
                    className='image-heading lightbox-toggle' 
                    key={image.id}
                    aria-label="Bild in einem Leuchtkasten öffnen"
                    data-size={`${image.localFile.childImageSharp.original.width}x${image.localFile.childImageSharp.original.height}`}
                    data-src={image.originalSrc}
                    data-title={image.altText || ''}
                    data-figcaption="" 
                    data-copyright="">
                    <GatsbyImage
                    image={pluginImage}
                    alt={product.title}
                  />
                  </ProductDetailLeftInner>
                )
                } else {
                  return null;
                }
              })}
            </ImageHeaderLeft>
            
            <ProductDetailCenter className={`${product.images.length === 3 && 'img-col-two'}`}>
              {product.images.map((image, index) => {
                  const pluginImage = getImage(image.localFile)
                  return (
                    <ProductDetailCenterInner
                      key={image.id}
                      className={`image-product ${index !== 0 && 'lightbox-toggle'} ${product.images.length === 3 && 'img-col-two'}`}
                      aria-label="Bild in einem Leuchtkasten öffnen"
                      data-size={`${image.localFile.childImageSharp.original.width}x${image.localFile.childImageSharp.original.height}`}
                      data-src={image.originalSrc}
                      data-title={image.altText || ''}
                      data-figcaption="" 
                      data-copyright=""
                    >
                      <GatsbyImage
                      image={pluginImage}
                      alt={product.title}
                    />
                    </ProductDetailCenterInner>
                  )
              })}
            </ProductDetailCenter>
          </ProductDetailLeft>

          <ProductDetailRight>
              <UlFilter className="filter-tag">
                {product.tags.map(tag => (
                  <LiFilter key={tag}>
                    <LinkFilter to={`/collection/${tag}`}><small>{tag}</small></LinkFilter>
                  </LiFilter>
                ))}
              </UlFilter>
              <h1>{product.title}</h1>
              <span>{price}</span>
              <Description
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            <ProductDetailInput product={product} />
          </ProductDetailRight>

        </ProductDetailWrapper>

        {detailInfo ? <DetailWrapper>
          <DetailText>{documentToReactComponents(JSON.parse(detailInfo.text.raw), options)}</DetailText>
          <DetailSlider>
            <ImageSlider images={detailInfo.images} />
          </DetailSlider>
        </DetailWrapper> : ''}
        

        <ProductContainer>
          <h2>You might also like</h2>
          <ProductTest>
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
          </ProductTest>
        </ProductContainer>
    </>
  )
}


export default ProductDetail
