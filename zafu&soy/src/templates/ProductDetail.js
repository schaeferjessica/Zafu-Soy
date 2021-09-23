// react
import React, { useState, useEffect } from 'react'
import Seo from '~/components/seo'

// gatsby
import { graphql } from 'gatsby'

// contentful
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

// components
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import DetailHeader from '~/components/DetailHeader'
import ImageSlider from '~/components/ImageSlider'
import ProductSlider from '~/components/ProductSlider'
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

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll--overlay');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll--overlay');
    }
  }, [isOpen]);

  // contentful renderRichText options
  const Small = ({ children }) => <p className="caption-regular">{children}</p>;
    const Bold = ({ children }) => <b className="caption-bold">{children}</b>;
    const options = {
      renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      },
      renderNode: {
        [BLOCKS.HEADING_6]: (_, children) => <Small>{children}</Small>
      },
    };

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
      
      {/* DETAIL INFO */}
      <DetailInfo
        textLeft={renderRichText(detailInfo.textLeft, options)}
        textRight={renderRichText(detailInfo.textRight, options)}
      />

      {/* PRODUCT SLIDER */}
      {filteredCollectionProducts.length ? <ProductSlider products={filteredCollectionProducts} /> : ''}
    </>
  )
}


export default ProductDetail
