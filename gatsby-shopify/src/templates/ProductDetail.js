import React, { useState, useEffect, useRef } from 'react'
import { graphql, Link   } from 'gatsby'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import ImageSlider from '~/components/ImageSlider'
import ProductSlider from '~/components/ProductSlider'
import DetailInput from '~/components/DetailInput'
import { getImage } from 'gatsby-plugin-image'
import { convertToBgImage } from "gbimage-bridge"
import BackgroundImage from 'gatsby-background-image'
import styled from '@emotion/styled/macro'
import { breakpoint, container, moduleSpace } from '../utils/styles'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import aniScroll from '../utils/ani-scroll';

// PRODUCT DETAIL COMPONENT

const ProductDetailComponent = styled.div`
  align-items: flex-end;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 60px);
  margin-top: 60px;
`

// PRODUCT DETAIL INNER

const ProductDetailInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  width: 100%;
  flex-grow: 1;
`

// PRODUCT DETAIL IMAGE

const ProductDetailImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.2);
    z-index: 1;
  }
`;

const StyledBackgroundSection = styled(BackgroundImage)`
  background-position: center;
  background-repeat: repeat-y;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-attachment: fixed;

  @media ${breakpoint.mobile} {
    background-attachment: unset !important;

    &::before,
    &::after {
      background-attachment: unset !important;
    }
  }
`

// PRODUCT DETAIL BUTTON

const ProductDetailButton = styled.button`
  position: relative;
  padding: 0;
  display: block;

`

// PRODUCT DETAIL CONTEXT

const ProductDetailContext = styled.div`
  ${container};

  padding-bottom: 140px;
`;


// PRODUCT DETAIL FILTER

const ProductDetailFilter = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 0;
`

const ProductDetailFilterList = styled.li`
  border-radius: 18px;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid var(--color-white);
  line-height: 28px;
  margin-right: 12px;

  &:hover {
      border: 1px solid var(--color-gray);
  }
`

const ProductDetailFilterLink = styled(Link)`
  color: var(--color-white);

  &:hover {
      text-decoration: none;
  }    
`

// PRODUCT DETAIL TITLE H1

const ProductDetailTitle = styled.h1`
  margin-bottom: 5px;
  color: var(--color-white);
`;

// PRODUCT DETAIL PRICE

const ProductDetailPrice = styled.span`
  color: var(--color-white);
  font-weight: 400;
`;


// PRODUCT DETAIL SCROLL BUTTON

const ProductDetailScroll = styled.button`
   position: absolute;
    transform: rotate(90deg);
    right: 20px;
    bottom: 250px;

  @media ${breakpoint.tablet} {
    right: -30px;
    top: 200px;
    bottom: inherit;
  }

  span {
    font-weight: 400;
    color: var(--color-white);
  }
`;


// PRODUCT DETAIL SLIDER

const ProductDetailSlider = styled.div` 
  ${moduleSpace};
`

const ProductDetailSliderContext = styled.div` 
  ${container};

  width: 40%;
  padding-right: 0px;

  @media ${breakpoint.desktop} {
    width: 100%;
  }
`

const ProductDetailSliderText = styled.div` 
  b {
    margin-top: 25px;
    margin-bottom: 5px;
    display: block;
  }
`

const ProductDetailSliderInner = styled.div`
  ${container}

  padding-right: 0px;

  @media ${breakpoint.desktop} {
    padding-right: 0px;
  }

  @media ${breakpoint.tablet} {
    padding-right: 0px;
  }

  @media ${breakpoint.mobile} {
    padding-right: 0px;
  }
`

const ProductDetailProductSlider = styled.div`
  ${moduleSpace};
  ${container};

  padding-right: 0px;

  @media ${breakpoint.desktop} { 
    padding-right: 0px;
  }

  @media ${breakpoint.tablet} { 
    padding-right: 0px;
  }

  @media ${breakpoint.mobile} { 
    padding-right: 0px;
  }
`

export const query = graphql`
  query ($handle: String!, $sku: String, $collection: String) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
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
            gatsbyImageData(width: 1920)
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
              gatsbyImageData(width: 700)
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


  const jumpTo = (hash) => {
    const target = document.querySelector(hash);
    const rect = target.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    aniScroll(rect.top + scrollTop - 52, 1000, 'easeInOutQuart');
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

      {/* PRODUCT DETAIL COMPONENT */}
      <ProductDetailComponent>

        {/* PRODUCT DETAIL INNER */}
        <ProductDetailInner ref={galleryEl}>

              {/* PRODUCT DETAIL IMAGE */}
              {product.images.map((image, index) => {
                if (index === 1) { 
                const pluginImage = getImage(image.localFile)
                const bgImage = convertToBgImage(pluginImage)
                return (
                  <ProductDetailImage key={image.id}>
                    
                        <StyledBackgroundSection
                          Tag="div"
                          {...bgImage}
                          preserveStackingContext
                        />
                    
                  </ProductDetailImage>
                )
                } else {
                  return null;
                }
              })}

            {/* PRODUCT DETAIL CONTEXT */}

            <ProductDetailContext>
              {/* PRODUCT DETAIL FILTER */}
             <ProductDetailFilter className="filter-tag">
                {product.tags.map(tag => (
                  <ProductDetailFilterList key={tag}>
                    <ProductDetailFilterLink to={`/collection/${tag}`}><small>{tag}</small></ProductDetailFilterLink>
                  </ProductDetailFilterList>
                ))}
              </ProductDetailFilter>

              <ProductDetailButton 
                  onClick={() => jumpTo('#discoverTarget')}
                  >
                {/* PRODUCT DETAIL TITLE H1 */}
                <ProductDetailTitle>{product.title}</ProductDetailTitle>
              </ProductDetailButton>

              {/* PRODUCT DETAIL PRICE*/}
              <ProductDetailPrice>{price}</ProductDetailPrice>
            </ProductDetailContext>

            {/* PRODUCT DETAIL SCROLL BUTTON */}
            <ProductDetailScroll className="link-hover link-hover--white" onClick={() => jumpTo('#discoverTarget')}>
              <span>Discover more</span>
            </ProductDetailScroll>

        </ProductDetailInner>
      </ProductDetailComponent>

      <div id="discoverTarget"></div>

      {/* DETAIL INPUT */}
      <DetailInput product={product} />

      
      {/* PRODUCT DETAIL SLIDER */}
      {detailInfo ? <ProductDetailSlider>
        <ProductDetailSliderContext>
          {/* PRODUCT DETAIL SLIDER TEXT */}
          <ProductDetailSliderText>{documentToReactComponents(JSON.parse(detailInfo.text.raw), options)}</ProductDetailSliderText>
        </ProductDetailSliderContext>

        {/* PRODUCT DETAIL SLIDER INNER */}
        <ProductDetailSliderInner>
          {/* SLIDER CONTENTFUL */}
          <ImageSlider images={detailInfo.images} />
        </ProductDetailSliderInner>
      </ProductDetailSlider> : ''} 


      {/* PRODUCT DETAIL PRODUCT SLIDER */}
      <ProductDetailProductSlider>
        {/* PRODUCT SLIDER */}
        {filteredCollectionProducts.length ? <ProductSlider products={filteredCollectionProducts} /> : ''}
      </ProductDetailProductSlider>
    </>
  )
}


export default ProductDetail
