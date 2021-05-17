import React, { useState, useContext, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { breakpoint } from '../utils/styles'

const Button = styled.button`
    font-family: 'IBM Plex Sans';
    border: 1px solid black;
    padding: 15px 30px;
    background-color: transparent;
    font-size: 18px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;

    &:hover span {
        transform: translateY(-160%);
    }

    @media ${breakpoint.desktop} { 
      font-size: 17px;
    }

    @media ${breakpoint.tablet} { 
      font-size: 16px;
    }

    @media ${breakpoint.mobile} { 
      font-size: 15px;
    }
`

const Span = styled.span`
    position: relative;
    display: inline-block;
    transition: transform .3s;

&::before {
    content: attr(data-hover);
    position: absolute;
    top: 160%;
    transform: translate3d(0, 0, 0);
    }
`

const ProductDetailInput = ({ product }) => {
  const {
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product
  const [variant] = useState({ ...initialVariant })
  const [quantity, setQuantity] = useState(1)
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

  const handleQuantityChange = ({ target }) => {
    setQuantity(target.value)
  }

  const handleAddToCart = () => {
    addVariantToCart(productVariant.shopifyId, quantity)
  }

  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: 'currency',
  }).format(variant.price)

  return (
    <>
      <span>{price}</span>
      <label htmlFor="quantity">Quantity </label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        min="1"
        step="1"
        onChange={handleQuantityChange}
        value={quantity}
      />
      <Button type="submit" disabled={!available || adding} onClick={handleAddToCart}>
        <Span data-hover={`Add to your order — ${price}`}>Add to your order — {price}</Span>
      </Button>
      {!available && <p>This Product is out of Stock</p>}
    </>
  )
}

ProductDetailInput.propTypes = {
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

export default ProductDetailInput
