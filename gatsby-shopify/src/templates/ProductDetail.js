// react
import React, { useState, useEffect, useRef } from 'react'
import Seo from '~/components/seo'

// gatsby
import { graphql, Link   } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import BackgroundImage from 'gatsby-background-image'
import { convertToBgImage } from "gbimage-bridge"

// contentful
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// components
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import ImageSlider from '~/components/ImageSlider'
import ProductSlider from '~/components/ProductSlider'
import DetailInput from '~/components/DetailInput'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container, moduleSpace } from '../styles/containers'

// utils
import aniScroll from '../utils/ani-scroll';


// PRODUCT DETAIL COMPONENT

const ProductDetailComponent = styled.div`
  align-items: flex-end;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 52px);
  margin-top: 62px;

  @media ${breakpoint.mobile} {
    margin-top: 52px;
  }
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
  text-align: left;
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
  padding-left: 12px;
  padding-right: 12px;
  border: 2px solid var(--color-white);
  line-height: 28px;
  margin-right: 12px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
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
  border-bottom: 6px solid var(--color-white);
`;

// PRODUCT DETAIL PRICE

const ProductDetailPrice = styled.span`
  color: var(--color-white);
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

const ProductDetailProductSlider = styled.div`
  ${moduleSpace};
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
              })}

            {/* PRODUCT DETAIL CONTEXT */}

            <ProductDetailContext>
              {/* PRODUCT DETAIL FILTER */}
             <ProductDetailFilter className="filter-tag">
                {product.tags.map(tag => (
                  <ProductDetailFilterList key={tag}>
                    <ProductDetailFilterLink to={`/collection/${tag}`}>{tag}</ProductDetailFilterLink>
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


          {/* SLIDER CONTENTFUL */}
          <ImageSlider images={detailInfo.images} />
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
