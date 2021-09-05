import React, { useContext } from 'react'
import StoreContext from '~/context/StoreContext'
import ProductList from './ProductList'
import styled from '@emotion/styled/macro'
import { breakpoint, container, moduleSpace } from '../utils/styles'
import { navigate } from 'gatsby'

// CHECKOUT COMPONENT

const CheckoutComponent = styled.div`
  transform: translateX(100%);
  transition: transform 300ms ease-in-out;
  position: fixed;
  top: 0;
  right: 0;
  width: 35%;
  height: 100vh;
  background-color: var(--color-white);
  z-index: 11;
  overflow: auto;

  &.is-active {
    transform: translateX(0%);
  } 

  @media ${breakpoint.desktop} { 
    width: 50%;
  }

  @media ${breakpoint.tablet} { 
    width: 72%;
  }

  @media ${breakpoint.mobile} { 
    width: 100%;
  }
`;


// CHECKOUT INNER

const CheckoutInner = styled.div`
  ${container}
  ${moduleSpace}

  display: flex;
  flex-direction: column;
`

const CheckoutButton = styled.button`
    font-family: 'IBM Plex Sans';
    border: 1px solid var(--color-blue);
    background-color: var(--color-blue);
    color: var(--color-white);
    padding: 30px 50px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    position: absolute;
    bottom: 30px;
    left: 20px;
    width: 91%;

    @media ${breakpoint.mobile} { 
      padding: 20px;
    }

    &:hover span {
      transform: translateY(-400%);
    }
`

// CHECKOUT PRICE

const CheckoutPrice = styled.span`
  position: relative;
  display: inline-block;
  transition: transform .3s;
  color: var(--color-white);

  &::before {
    content: attr(data-hover);
    position: absolute;
    top: 400%;
    transform: translate3d(0, 0, 0);
    color: var(--color-white);
  }
`


// CHECKOUT SHIPPING

const CheckoutShipping = styled.span`  
  display: block;
  font-size: 14px;
  margin-top: 5px;
`

// CHECKOUT LINK

const CheckoutLink = styled.button`
  display: block;
  margin-top: 15px;
  align-self: flex-start;
`

// CHECKOUT TITLE

const CheckoutTitle = styled.h2`
  margin-top: 25%;
  margin-bottom: 5%;
`


// CHECKOUT LIST 

const CheckoutList = styled.ul`
  padding: 0;
  height: calc(100vh - 220px);
  position: relative;
  overflow: auto;
`


// CHECKOUT CLOSE

export const CheckoutClose = styled.button` 
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
    navigate(`/collection/frontpage`);
  }

  const lineItems = checkout.lineItems.map(item => (
    <ProductList key={item.id.toString()} item={item} />
  ))

  return (
    <CheckoutComponent className={`checkout ${isOpen ? 'is-active' : ''}`}>
      
      {/* CHECKOUT INNER */}
      <CheckoutInner>

        {/* CHECKOUT CLOSE */}
        <CheckoutClose onClick={() => handleCheckoutClose()}>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" 
            width="10" 
            height="10" 
            viewBox="0 0 24 24">
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
          </svg>
          <span className="sr-only">close</span>
        </CheckoutClose>
        {lineItems.length ? <>
        <h2>Your Order</h2>

        {/* CHECKOUT LIST */}
        <CheckoutList>
          {lineItems}
        </CheckoutList>

        {/* CHECKOUT BUTTON */}
        <CheckoutButton 
          onClick={handleCheckout}
          disabled={checkout.lineItems.length === 0}
          >
          <CheckoutPrice data-hover={`Check out — € ${checkout.totalPrice}`}>Check out — € {checkout.totalPrice}</CheckoutPrice>
          <CheckoutShipping data-hover={`Free Shipping within 30 - 60 days`}>Free Shipping within 30 - 60 days</CheckoutShipping>
        </CheckoutButton>
        </> : <>

        {/* CHECKOUT TITLE */}
        <CheckoutTitle>Your Order</CheckoutTitle>

        <p>Looks like you haven’t added anthing to your order yet.</p>
        
        {/* CHECKOUT LINK */}
        <CheckoutLink className="link-hover" onClick={() => handleBackClick()}>
          <span>Shop all</span>
        </CheckoutLink> </>}
      </CheckoutInner>
    </CheckoutComponent>
  )
}

export default Checkout
