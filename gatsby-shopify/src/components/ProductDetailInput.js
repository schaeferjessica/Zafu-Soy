import React, { useState, useContext, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { breakpoint } from '../utils/styles'

const Button = styled.button`
    font-family: 'IBM Plex Sans';
    border: 1px solid #313942;
    background-color: #313942;
    color: #faf9f8;
    padding: 15px 30px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    margin-top: 15px;
    width: 60%;
    margin-left: 20px;

    @media ${breakpoint.desktop} { 
      margin-top: 10px;
      width: 100%;
      margin-left: 0px;
    }

    &:hover span {
        transform: translateY(-160%);
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

const InputInner = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  width: 40%;

  @media ${breakpoint.desktop} { 
    margin-top: 10px;
    width: 100%;
  }
`

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  @media ${breakpoint.desktop} { 
    display: block;
  }
`

const Input = styled.input`
  border: 1px solid black;
  padding: 15px 30px;
  background-color: transparent;
  margin-top: 15px;

  @media ${breakpoint.desktop} { 
    margin-top: 10px;
  }

  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type=number] {
    -moz-appearance: textfield;
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
    <InputWrapper>
      <InputInner>
        <label htmlFor="quantity">Quantity </label>
        <Input
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          step="1"
          onChange={handleQuantityChange}
          value={quantity}
        />
      </InputInner>
      
      <Button type="submit" disabled={!available || adding} onClick={handleAddToCart}>
        <Span data-hover={`Add to your order — ${price}`}>Add to your order — {price}</Span>
      </Button>
      {!available && <p>This Product is out of Stock</p>}
    </InputWrapper>
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
