import React, { useContext } from 'react'
import StoreContext from '~/context/StoreContext'
import ProductList from './ProductList'
import styled from '@emotion/styled'
import { breakpoint } from '../utils/styles'

const Button = styled.button`
    font-family: 'IBM Plex Sans';
    border: 1px solid black;
    padding: 15px 30px;
    background-color: transparent;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    margin-top: 15px;

    @media ${breakpoint.desktop} { 
      margin-top: 10px;
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

const Checkout = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const lineItems = checkout.lineItems.map(item => (
    <ProductList key={item.id.toString()} item={item} />
  ))

  return (
    <div>
      {lineItems}
      <p>$ {checkout.subtotalPrice}</p>
      <p>$ {checkout.totalTax} tax</p>

      <Button 
        onClick={handleCheckout}
        disabled={checkout.lineItems.length === 0}
        >
        <Span data-hover={`Check out — € ${checkout.totalPrice}`}>Check out — € {checkout.totalPrice}</Span>
      </Button>
    </div>
  )
}

export default Checkout
