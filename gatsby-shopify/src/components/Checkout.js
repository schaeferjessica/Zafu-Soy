import React, { useContext } from 'react'
import StoreContext from '~/context/StoreContext'
import ProductList from './ProductList'
import styled from '@emotion/styled'
import { breakpoint } from '../utils/styles'

const StyledCheckoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.7);
  z-index: 9;
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  pointer-events: none;

  &.is-active {
    opacity: 1;
    pointer-events: initial;

    > div {
      transform: translateX(0%);
    }
  } 
`;

const StyledCheckout = styled.div`
  transform: translateX(100%);
  transition: transform 300ms ease-in-out;
  width: 42%;
  height: 100vh;
  background-color: white;
  padding: 20px;
  z-index: 9;
  overflow: auto;
`;

const Button = styled.button`
    font-family: 'IBM Plex Sans';
    border: 1px solid #313942;
    background-color: #313942;
    color: #faf9f8;
    padding: 20px 30px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    margin-top: 15px;
    position: absolute;
    bottom: 50px;
    left: 20px;
    width: 95%;

    @media ${breakpoint.desktop} { 
      margin-top: 10px;
    }

    &:hover span {
        transform: translateY(-170%);
    }
`

const Span = styled.span`
    position: relative;
    display: inline-block;
    transition: transform .3s;

&::before {
    content: attr(data-hover);
    position: absolute;
    top: 170%;
    transform: translate3d(0, 0, 0);
    }
`

const Checkout = ({isOpen, handleCheckoutClose}) => {
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
    <StyledCheckoutWrapper className={isOpen ? 'is-active' : ''}>
      <StyledCheckout>
        <button onClick={() => handleCheckoutClose()}>X</button>
        <ul>
          {lineItems}
        </ul>
        <Button 
          onClick={handleCheckout}
          disabled={checkout.lineItems.length === 0}
          >
          <Span data-hover={`Check out — € ${checkout.totalPrice}`}>Check out — € {checkout.totalPrice}</Span>
        </Button>
      </StyledCheckout>
    </StyledCheckoutWrapper>
  )
}

export default Checkout
