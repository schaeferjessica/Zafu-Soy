import React, { useContext } from 'react'
import StoreContext from '~/context/StoreContext'
import ProductList from './ProductList'
import styled from '@emotion/styled'
import { breakpoint } from '../utils/styles'
import { navigate } from 'gatsby'

const StyledCheckout = styled.div`
  transform: translateX(100%);
  transition: transform 300ms ease-in-out;
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100vh;
  background-color: white;
  z-index: 11;
  overflow: auto;

  &.is-active {
    transform: translateX(0%);
  } 

  @media ${breakpoint.desktop} { 
    width: 50%;
  }

  @media ${breakpoint.tablet} { 
    width: 60%;
  }

  @media ${breakpoint.mobile} { 
    width: 100%;
  }
`;

const CheckoutInner = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`

const CheckoutButton = styled.button`
    font-family: 'IBM Plex Sans';
    border: 1px solid var(--color-blue);
    background-color: var(--color-blue);
    color: var(--color-white);
    padding: 15px 30px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    position: absolute;
    bottom: 30px;
    left: 20px;
    width: 91%;

    &:hover span {
        transform: translateY(-350%);
    }
`

const Span = styled.span`
    position: relative;
    display: inline-block;
    transition: transform .3s;
    color: var(--color-white);

&::before {
    content: attr(data-hover);
    position: absolute;
    top: 350%;
    transform: translate3d(0, 0, 0);
    color: var(--color-white);
    }
`

const SpanShipping = styled(Span)`  
  display: block;
  font-size: 14px;
  margin-top: 5px;
`

const ButtonBack = styled.button`
  display: block;
  margin-top: 15px;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
  padding: 0px;
  font-size: 17px;
  align-self: flex-start;

  &:hover {
    text-decoration: none;
  }
`

const Title = styled.h2`
  margin-top: 25%;
  margin-bottom: 5%;
`
const Ul = styled.ul`
  padding: 0;
  height: calc(100vh - 220px);
  position: relative;
  overflow: auto;
`

const ButtonClose = styled.button` 
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-gray);
  border-radius: 50%;
  font-size: 14px;
  color: var(--color-blue);
  font-weight: 400;
  align-self: flex-end;
  padding: 0px;
  width: 30px;
  height: 30px;
  min-height: 30px;

  &:hover {
    border: 1px solid var(--color-blue);
  }

  span {
    width: 25px;
    height: 25px;
  }
`

const Checkout = ({isOpen, handleCheckoutClose}) => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }
  const handleBackClick = () => {
    handleCheckoutClose();
    navigate('/');
  }

  const lineItems = checkout.lineItems.map(item => (
    <ProductList key={item.id.toString()} item={item} />
  ))

  return (
    <StyledCheckout className={isOpen ? 'is-active' : ''}>
      <CheckoutInner>
        <ButtonClose onClick={() => handleCheckoutClose()}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="10" 
            height="10" 
            viewBox="0 0 24 24">
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
          </svg>
        </ButtonClose>
        {lineItems.length ? <>
        <h2>Your Order</h2>
        <Ul>
          {lineItems}
        </Ul>
        <CheckoutButton 
          onClick={handleCheckout}
          disabled={checkout.lineItems.length === 0}
          >
          <Span data-hover={`Check out — € ${checkout.totalPrice}`}>Check out — € {checkout.totalPrice}</Span>
          <SpanShipping data-hover={`Free Shipping`}>Free Shipping</SpanShipping>
        </CheckoutButton>
        </> : <>
        <Title>Your Order</Title>
        <p>Looks like you haven’t added anthing to your order yet.</p>
        <ButtonBack onClick={() => handleBackClick()}>Take me back to the Shop</ButtonBack> </>}
      </CheckoutInner>
    </StyledCheckout>
  )
}

export default Checkout
