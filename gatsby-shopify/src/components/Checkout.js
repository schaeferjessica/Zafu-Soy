import React, { useContext } from 'react'
import StoreContext from '~/context/StoreContext'
import ProductList from './ProductList'
import styled from '@emotion/styled/macro'
import { breakpoint, container, moduleSpace } from '../utils/styles'
import { Link, navigate } from 'gatsby'

// CHECKOUT COMPONENT

const CheckoutComponent = styled.div`
  transform: translateX(100%);
  transition: transform 300ms ease-in-out;
  position: fixed;
  top: 0;
  right: 0;
  width: 45%;
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

const CheckboxHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  padding-left: 50px;
  padding-right: 150px;
  padding-bottom: 15px;
  border: 1px solid black;

  @media ${breakpoint.desktop} {
    padding-right: 100px; 
  }

  @media ${breakpoint.tablet} { 
    padding-right: 80px;
  }

  @media ${breakpoint.mobile} { 
    padding-right: 30px;
    padding-left: 30px;
  }
`;

// CHECKOUT INNER

const CheckoutInner = styled.div`
  margin-top: 25%;
  margin-bottom: 5%;
  padding-right: 150px; 
  padding-left: 50px; 

  @media ${breakpoint.desktop} {
    padding-right: 100px; 
  }

  @media ${breakpoint.tablet} { 
    padding-right: 80px;
  }

  @media ${breakpoint.mobile} { 
    padding-left: 30px;
    padding-right: 30px;
  }
`

const CheckoutButton = styled.button`
  font-family: 'IBM Plex Mono';
  border: 3px solid var(--color-blue);
  padding: 30px 50px;
  position: relative;
  display: inline-block;
  overflow: hidden;
  cursor: pointer;
  position: absolute;
  bottom: 30px;
  left: 50px;
  width: 80%;

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

  &::before {
    content: attr(data-hover);
    position: absolute;
    top: 400%;
    transform: translate3d(0, 0, 0);
  }
`


// CHECKOUT SHIPPING

const CheckoutLink = styled.button`
  display: block;
  margin-top: 15px;
  align-self: flex-start;
`


// CHECKOUT LIST 

const CheckoutList = styled.ul`
  padding: 0;
  height: calc(100vh - 285px);
  position: relative;
  overflow: auto;
`


// CHECKOUT CLOSE

export const CheckoutClose = styled.button` 
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--color-gray);
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
        {/* CHECKOUT CLOSE */}
        <CheckboxHeader>
          <h2>Your Order</h2>
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
        </CheckboxHeader>

        {/* CHECKOUT INNER */}
        <CheckoutInner>
          {lineItems.length ? <>
          {/* CHECKOUT LIST */}
          <CheckoutList>
            {lineItems}
          </CheckoutList>

          <Link to="/shipping/" className="link-hover">
            <span>Free Shipping within 30 - 60 days</span>
          </Link>

          {/* CHECKOUT BUTTON */}
          <CheckoutButton 
            onClick={handleCheckout}
            disabled={checkout.lineItems.length === 0}
            >
            <CheckoutPrice data-hover={`Check out — € ${checkout.totalPrice}`}>Check out — € {checkout.totalPrice}</CheckoutPrice>
          </CheckoutButton>
          </> : <>

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
