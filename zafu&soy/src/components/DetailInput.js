// react
import React, { useState, useContext, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

// components
import StoreContext from '~/context/StoreContext'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'


// PRODUCT DETAIL TITLE H1

const DetailInputTitle = styled.h1`
  color: var(--color-white);
  text-align: left;
`;


// DETAIL INPUT BUTTON

const DetailInputButton = styled.button`
  margin-bottom: 30px;
  text-align: inherit;

  @media ${breakpoint.mobile} {
    margin-bottom: 20px;
  }
`

const DetailInputSpan = styled.span`
  color: var(--color-white);
`



const DetailInput = ({ product }) => {
  const {
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product

  const [variant] = useState({ ...initialVariant })
  const [quantity] = useState(1)
  const {
    addVariantToCart,
    store: { client, adding },
  } = useContext(StoreContext)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant
  const [available, setAvailable] = useState(productVariant.availableForSale)

  const checkAvailability = useCallback(
    productId => {
      client.product.fetch(productId).then(fetchedProduct => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          variant => variant.id === productVariant.shopifyId
        )
        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [client.product, productVariant.shopifyId]
  )

  useEffect(() => {
    checkAvailability(product.shopifyId)
  }, [productVariant, checkAvailability, product.shopifyId])


  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)


  return (
    <DetailInputButton type="submit" disabled={!available || adding} onClick={handleAddToCart}>
      
      <DetailInputTitle className="underline-hover">
          {/* PRODUCT DETAIL TITLE H1 */}
          {product.title}
          <br />
          {/* DETAIL INPUT BUTTON */}
          {available && <DetailInputSpan>add to your order ??? {price}</DetailInputSpan>}
          {!available && <DetailInputSpan>currently out of stock</DetailInputSpan>}
      </DetailInputTitle>

    </DetailInputButton>
  )
}

DetailInput.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
}

export default DetailInput
