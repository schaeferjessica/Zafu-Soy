// react
import React, { useState, useEffect } from 'react'
import Seo from '~/components/seo'

// gatsby
import { graphql } from 'gatsby'

// contentful
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// components
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import DetailHeader from '~/components/DetailHeader'
import ImageSlider from '~/components/ImageSlider'
import ProductSlider from '~/components/ProductSlider'
import DetailInput from '~/components/DetailInput'
import DetailInfo from '~/components/DetailInfo'

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
      textLeft {
        raw
      }
      textRight {
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

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll--overlay');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll--overlay');
    }
  }, [isOpen]);

  return (
    <>
      <Seo title={product.title} description={product.description} />
      <Navigation onOrderButtonClick={() => setIsOpen(!isOpen)} />
      <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>

      {/* DETAIL HEADER */}
      <DetailHeader product={product} />

      {/* SCROLL TARGET */}
      <div id="discoverTarget"></div>

      {/* IMAGE SLIDER */}
      <ImageSlider images={detailInfo.images} />

      {/* DETAIL INPUT */}
      <DetailInput product={product} />
      
      {/* DETAIL INFO */}
      <DetailInfo
        textLeft={documentToReactComponents(JSON.parse(detailInfo.textLeft.raw), options)}
        textRight={documentToReactComponents(JSON.parse(detailInfo.textRight.raw), options)}
      />

      {/* PRODUCT SLIDER */}
      {filteredCollectionProducts.length ? <ProductSlider products={filteredCollectionProducts} /> : ''}
    </>
  )
}


export default ProductDetail
