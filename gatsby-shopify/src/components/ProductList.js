import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { breakpoint } from '../utils/styles'

const ListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 15px;
`

const ListItemContext = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 20px;
`

const ListItemImage = styled.div`
  width: 35%;
`

const ListItemRemove = styled.button`
  color: var(--color-gray);
  text-decoration: none;
  padding: 0;
  
  &:hover {
    color: var(--color-blue);
  }
`

const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  box-shadow: none;
  border-radius: 0;
  border: none;
  margin: 0px;
  padding: 10px;
  max-width: 10px;
  outline: none;
  font-family: IBM Plex Sans;
  background-color: var(--color-white);
  font-size: 14px;

  @media ${breakpoint.mobile} { 
    font-size: 13px;
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

const InputInner = styled.div`
  display: flex;
  width: 100%;
  margin-left: 20px;
`

const InputButtonUp = styled.button`
  font-size: 18px;
  padding: 0px;
  color: var(--color-gray);

  &:hover {
    color: var(--color-blue);
  }
`

const InputButtonDown = styled.button`
  font-size: 22px;
  padding: 0px;
  color: var(--color-gray);

  &:hover {
    color: var(--color-blue);
  }
`

const ProductList = props => {
  const { item } = props
  const {
    removeProductItem,
    updateLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)
  const [quantity, setQuantity] = useState(item.quantity);

  const variantImage = item.variant.image ? (
    <img src={item.variant.image.src} alt={`${item.title} product shot`}/>
  ) : null

  const handleQuantityAdd = () => {
    if (quantity < 9) {
      updateLineItem(client, checkout.id, item.id, quantity + 1)
    }
  }

  const handleQuantitySubstract = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
      updateLineItem(client, checkout.id, item.id, quantity - 1)
    }
  }
  
  const handleRemove = () => {
    removeProductItem(client, checkout.id, item.id)
  }

  /*
  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(
      option => `${option.name}: ${option.value} `
    )
    : null
  */

  useEffect(() => {
    setQuantity(item.quantity);
  }, [props, item.quantity]);

  return (
    <ListItem>
      <ListItemImage>
        <Link to={`/product/${item.variant.product.handle}/`}>
          {variantImage}
        </Link>
      </ListItemImage>
      <ListItemContext>
        <h3>{item.title}</h3>
        <div>
          <small>{item.variant.price} €</small>
        </div>
        <InputWrapper>
          <label htmlFor="checkout-quantity"><small>Quantity</small></label>
          <InputInner>
            <InputButtonDown onClick={handleQuantitySubstract}>-</InputButtonDown>
            <Input
              type="number"
              id="checkout-quantity"
              name="checkout-quantity"
              min="1"
              max="10"
              step="1"
              value={quantity}
              readOnly
            />
              <InputButtonUp onClick={handleQuantityAdd}>+</InputButtonUp>
          </InputInner>
        </InputWrapper>
        <ListItemRemove onClick={handleRemove}><small>Remove</small></ListItemRemove>
      </ListItemContext>
    </ListItem>
  )
}

export default ProductList
