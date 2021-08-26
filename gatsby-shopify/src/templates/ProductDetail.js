import React, { useState, useEffect, useRef } from 'react'
import { graphql  } from 'gatsby'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import ImageSlider from '~/components/ImageSlider'
import ProductSlider from '~/components/ProductSlider'
import ProductDetailInput from '~/components/ProductDetailInput'
import {UlFilter, LiFilter, LinkFilter} from '~/components/ProductGrid'
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


  @media ${breakpoint.tablet} {
    display: flex;
    flex-direction: column;
    height: auto;
    margin-top: 60px;
    padding-left: 0px;
    padding-right: 0px;
  }
`

const ProductDetailLeft = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  width: 48%;
  flex-grow: 1;

  @media ${breakpoint.tablet} {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
`

const ProductImageItem = styled.div`
  position: relative;
  overflow: hidden;

  @media ${breakpoint.tablet} {
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

  @media ${breakpoint.tablet} {
    height: 65vh;
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

  @media ${breakpoint.tablet} {
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

  @media ${breakpoint.tablet} {
    position: static;
    width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const ProductDetailLeftTitle = styled.div`
    display: none;

    @media ${breakpoint.tablet} {
    display: block;
    position: absolute;
    bottom: 40px;
    left: 20px;
    width: 65%;
  }
`;

const ProductDetailRightTitle = styled.div`
  display: block;

   @media ${breakpoint.tablet} {
    display: none;
  }
`;

const H1 = styled.h1`
  margin-top: 30px;
  margin-bottom: 5px;

  @media ${breakpoint.tablet} {
    color: var(--color-white);
    font-weight: 400;
  }
`;

const Price = styled.span`
  @media ${breakpoint.tablet} {
    color: var(--color-white);
    font-weight: 400;
  }
`;

const Description = styled.div`
  display: none;
`

const DiscoverButton = styled.button`
  position: absolute;
  right: -100px;
  bottom: 100px;
  transform: rotate(90deg);
  border-radius: 20px;
  text-align: center;
  border-radius: 18px;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid var(--color-gray);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
      border: 1px solid var(--color-blue);
    }

  &:hover svg {
    fill: var(--color-blue);
    transform: translateX(5px);
  }

  @media ${breakpoint.tablet} {
    right: -30px;
    bottom: 100px;
    border: 1px solid var(--color-white);
    color: var(--color-white);
    font-weight: 500;

    &:hover {
        border: 1px solid var(--color-gray);
    }

    &:hover svg {
        fill: var(--color-white);
    }
  }
`;

const ArrowSvg = styled.svg`
  width: 22px;
  height: 22px;
  fill: var(--color-gray);
  margin-top: 2px;
  margin-left: 5px;
  transition: transform 300ms ease-in-out;

  @media ${breakpoint.mobile} {
      fill: var(--color-white);
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
  width: 40%;
  padding-left: 100px;
  margin-bottom: 20px;

  @media ${breakpoint.desktop} {
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
  width: 55%;

  @media ${breakpoint.mobile} {
    width: 100%;
  }
`

const ProductContainer = styled.div`
  ${container}
  ${moduleSpace}

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

             {/* IMAGE HEADER */}

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

            {/* TITLE H2 */}

            <ProductDetailLeftTitle>
              <H1>{product.title}</H1>
              <Price>{price}</Price>
            </ProductDetailLeftTitle>

            {/* BUTTON MORE */}

            <DiscoverButton onClick={() => jumpTo('#discoverTarget')}><small>Discover more</small>
              <ArrowSvg x="0px" y="0px" viewBox="0 0 22 10">
                <polygon points="17,0.65 16.29,1.35 19.44,4.5 0.65,4.5 0.65,5.5 19.44,5.5 16.29,8.65 17,9.35 21.35,5 "></polygon>
              </ArrowSvg>
            </DiscoverButton> 

        </ProductDetailLeft>

        <ProductDetailRight>
            <ProductDetailRightContext>
              <ProductDetailInput product={product} />
              
              {/* FILTER */}

              <UlFilter className="filter-tag">
                {product.tags.map(tag => (
                  <LiFilter key={tag}>
                    <LinkFilter to={`/collection/${tag}`}><small>{tag}</small></LinkFilter>
                  </LiFilter>
                ))}
              </UlFilter>

              {/* TITLE H2 */}

              <ProductDetailRightTitle>
                <H1>{product.title}</H1>
                <span>{price}</span>
              </ProductDetailRightTitle>

              {/* TEXT DETAIL */}
              
              <Description
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />

            </ProductDetailRightContext>
        </ProductDetailRight>
      </ProductDetailWrapper>

      <div id="discoverTarget"></div>

      {/* SLIDER CONTENTFUL */}

      {detailInfo ? <DetailWrapper>
        <DetailText>{documentToReactComponents(JSON.parse(detailInfo.text.raw), options)}</DetailText>
        <DetailSlider>
          <ImageSlider images={detailInfo.images} />
        </DetailSlider>
      </DetailWrapper> : ''} 

        {/* SLIDER PRODUCTS*/}
        
        <ProductContainer>
          <h2>You might also like</h2>
          {filteredCollectionProducts.length ? <ProductSlider products={filteredCollectionProducts} /> : ''}
        </ProductContainer>
    </>
  )
}


export default ProductDetail
