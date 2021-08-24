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
import styled from '@emotion/styled/macro'
import { breakpoint, container, moduleSpace } from '../utils/styles'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import aniScroll from '../utils/ani-scroll';

const ProductDetailWrapper = styled.div`
  ${container}
  height: calc(100vh - 70px);
  margin-top: 70px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;


  @media ${breakpoint.mobile} {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-top: 60px;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const ProductDetailLeft = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  width: 48%;

  @media ${breakpoint.mobile} {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
`

const ProductImageItem = styled.div`
  position: relative;
  overflow: hidden;

  @media ${breakpoint.mobile} {
    width: 100%;
  }
`;

const ProductImageButton = styled.button`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 0;
  display: block;

  @media ${breakpoint.mobile} {
    height: 70vh;
  }
  
  .gatsby-image-wrapper {
    height: 100%;

    img {
      object-fit: cover !important;
    }
  }

`

const ProductDetailRight = styled.div`
  position: relative;
  width: 48%;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;

  @media ${breakpoint.mobile} {
    align-items: flex-start;
    width: 100%;
    height: 100%;
  }

  .filter-tag {
    padding-left: 0;
  }
`

const ProductDetailRightContext = styled.div`
  position: relative;
  top: 50%;
  width: 80%;

  @media ${breakpoint.mobile} {
    position: static;
    width: 100%;
  }
`;

const ProductDetailTitle = styled.div`
   @media ${breakpoint.mobile} {
    display: none;
  }
`;

const H1 = styled.h1`
  margin-top: 30px;
  margin-bottom: 5px;
`;

const Description = styled.div`
  display: none;
`

const DiscoverButton = styled.button`
  position: absolute;
  right: -80px;
  bottom: 50px;
  transform: rotate(90deg);
  font-size: 12px;
  border-radius: 20px;
  text-align: center;
  border-radius: 18px;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid var(--color-gray);

  &:hover {
        border: 1px solid var(--color-blue);
    }

  @media ${breakpoint.mobile} {
    right: -20px;
    bottom: 100px;
    border: 1px solid var(--color-white);
    color: var(--color-white);
    font-weight: 500;

    &:hover {
        border: 1px solid var(--color-gray);
    }
  }
`;

const ProductTest = styled(Product)`
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media ${breakpoint.mobile} {
    grid-template-columns: 1fr 1fr;
  }
`;

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

  @media ${breakpoint.mobile} {

    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    padding-left: 20px;
    padding-right: 0px;
    margin-top: 0px;
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

  @media ${breakpoint.mobile} {
    width: 100%;
    margin-bottom: 0px;
    padding-left: 0px;
    padding-right: 20px;
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

  @media ${breakpoint.mobile} {
    width: 100%;
  }
`



export const query = graphql`
  query ($handle: String!, $sku: String, $collection: String) {
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
    shopifyCollection(handle: {eq: $collection}) {
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
    contentfulDetail(contentfulid: { eq: $sku }) {
      contentfulid
      text {
        raw
      }
      images {
        description
        file {
          url
          details {
            image {
              width
              height
            }
          }
        }
        gatsbyImageData(width: 500)
      }
    }
  }
`
 
const ProductDetail = ({ data }) => {
  const galleryEl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const product = data.shopifyProduct
  const collectionProducts = data.shopifyCollection.products;
  collectionProducts.length = 4; // only keep the first 4 items in the array
  const filteredCollectionProducts = collectionProducts.filter(collectionProduct => collectionProduct.handle !== product.handle);
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

  const jumpTo = (hash) => {
    const target = document.querySelector(hash);
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    aniScroll(rect.top + scrollTop, 1000, 'easeInOutQuart');
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll--overlay');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll--overlay');
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
              {product.images.map((image, index) => {
                if (index === 1) { 
                const pluginImage = getImage(image.localFile)
                return (
                  <ProductImageItem key={image.id}>
                    <ProductImageButton 
                      className='image-heading'
                      onClick={() => jumpTo('#discoverTarget')}
                      >
                        <GatsbyImage
                        image={pluginImage}
                        alt={product.title}
                      />
                    </ProductImageButton>
                  </ProductImageItem>
                )
                } else {
                  return null;
                }
              })}
            <DiscoverButton onClick={() => jumpTo('#discoverTarget')}>Discover more</DiscoverButton> 
        </ProductDetailLeft>
        <ProductDetailRight>
            <ProductDetailRightContext>
              <ProductDetailInput product={product} />
              
              <UlFilter className="filter-tag">
                {product.tags.map(tag => (
                  <LiFilter key={tag}>
                    <LinkFilter to={`/collection/${tag}`}><small>{tag}</small></LinkFilter>
                  </LiFilter>
                ))}
              </UlFilter>

              <ProductDetailTitle>
                <H1>{product.title}</H1>
                <span>{price}</span>
              </ProductDetailTitle>
              
              <Description
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            </ProductDetailRightContext>
        </ProductDetailRight>
      </ProductDetailWrapper>

      <div id="discoverTarget"></div>

      {detailInfo ? <DetailWrapper>
        <DetailText>{documentToReactComponents(JSON.parse(detailInfo.text.raw), options)}</DetailText>
        <DetailSlider>
          <ImageSlider images={detailInfo.images} />
        </DetailSlider>
      </DetailWrapper> : ''} 
        

        <ProductContainer>
          <h2>You might also like</h2>
          <ProductTest>
          {filteredCollectionProducts.length ? (
            filteredCollectionProducts.map(
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
