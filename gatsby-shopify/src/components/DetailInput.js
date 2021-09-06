import React, { useState, useContext, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled/macro'
import { breakpoint } from '../utils/styles'


// DETAIL INPUT COMPONENT

const DetailInputComponent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`


// DETAIL INPUT OUTER

const DetailInputOuter = styled.div`
  display: none;
  flex-direction: column;
  width: 35%;
  z-index: 1;
  margin-top: 15px;

  @media ${breakpoint.desktop} { 
    margin-top: 10px;
    flex-shrink: 1;
    padding-right: 10px;
  }

  @media ${breakpoint.mobile} { 
    width: 100%;
    padding-right: 0px;
  }
`


// DETAIL INPUT INNER

const DetailInputInner = styled.div`
  border: 1px solid var(--color-blue);
  display: flex;
  width: 100%;
  margin-top: 15px;
`


// DETAIL INPUT INFO

const DetailInputInfo = styled.input`
  padding: 0;
  padding: 15px;
  background-color: transparent;
  outline: none;
  box-shadow: none;
  border-radius: 0;
  border: none;
  width: 100%;

  @media ${breakpoint.mobile} { 
    padding: 14px;
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


// DETAIL INPUT PRICE

const DetailInputPrice = styled.span`
  position: relative;
  display: inline-block;
  transition: transform 400ms;
  color: var(--color-blue);
  font-weight: 400;
  z-index: 1;

  &::before {
    content: attr(data-hover);
    position: absolute;
    top: 250%;
    transform: translate3d(0, 0, 0);
    color: var(--color-white);

    @media ${breakpoint.mobile} { 
      top: 210%;
    }
  }
`

// DETAIL INPUT BUTTON

const DetailInputButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`


// DETAIL INPUT BUTTON PLUS

const DetailInputButtonPlus = styled.button`
  padding-right: 10px;

  @media ${breakpoint.tablet} { 
    padding-right: 6px;
  }

  svg {
    fill: var(--color-gray);
    width: 12px;
    height: 12px;

    &:hover {
      fill: var(--color-blue);
    }
  }
`

// DETAIL INPUT BUTTON MINUS

const DetailInputButtonMinus = styled.button`
  padding-right: 10px;

  @media ${breakpoint.tablet} { 
    padding-right: 6px;
  }

  svg {
    fill: var(--color-gray);
    width: 12px;
    height: 12px;

    &:hover {
      fill: var(--color-blue);
    }
  }
`


// DETAIL INPUT BUTTON ORDER

const DetailInputButtonOrder = styled.div`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
`


// DETAIL INPUT BUTTON ORDER INNER

const DetailInputButtonOrderInner = styled.button`
    font-family: 'IBM Plex Sans';
    background-color: var(--color-white);
    color: var(--color-blue);
    border: 1px solid var(--color-blue);
    padding: 30px 50px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    margin-top: 50px;

    &:hover span {
        transform: translateY(-250%);

        @media ${breakpoint.mobile} { 
          transform: translateY(-210%);
        }
    }

    &:hover::after{
      transform: translateY(0%);
    }
  
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--color-blue);
      transition: transform 400ms;
      transform: translateY(100%);
    }

    span {
      color: var(--color-blue);
    }
`



const DetailInput = ({ product }) => {
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


  const handleQuantityAdd = () => {
    if (quantity < 9) setQuantity(quantity + 1)
  }


  const handleQuantitySubstract = () => {
    if (quantity > 1) setQuantity(quantity - 1)
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
    <DetailInputComponent>

      {/* DETAIL INPUT OUTER */}
      <DetailInputOuter>
        <label htmlFor="quantity">Quantity</label>

        {/* DETAIL INPUT INNER */}
        <DetailInputInner>
          <DetailInputInfo
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="10"
            step="1"
            value={quantity}
            readOnly
          />

          {/* DETAIL INPUT BUTTON */}
          <DetailInputButton>

            {/* DETAIL INPUT BUTTON PLUS */}
            <DetailInputButtonPlus onClick={handleQuantityAdd}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"/></svg>
            </DetailInputButtonPlus>

            {/* DETAIL INPUT BUTTON MINUS */}
            <DetailInputButtonMinus onClick={handleQuantitySubstract}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 10h24v4h-24z"/></svg>
            </DetailInputButtonMinus>

          </DetailInputButton>

        </DetailInputInner>
      </DetailInputOuter>

      {/* DETAIL INPUT BUTTON ORDER */}
      <DetailInputButtonOrder>
        {/* DETAIL INPUT BUTTON ORDER INNER */}
        <DetailInputButtonOrderInner type="submit" disabled={!available || adding} onClick={handleAddToCart}>
          {available && <DetailInputPrice data-hover={`Add to your order — ${price}`}>Add to your order — {price}</DetailInputPrice>}
          {!available && <DetailInputPrice data-hover="currently out of stock">currently out of stock</DetailInputPrice>}
        </DetailInputButtonOrderInner>
      </DetailInputButtonOrder>

    </DetailInputComponent>
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