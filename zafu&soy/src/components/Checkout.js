// react
import React, { useContext } from 'react'

// gatsby
import { Link, navigate } from 'gatsby'

// components
import StoreContext from '~/context/StoreContext'
import ProductList from './ProductList'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import {container} from '../styles/containers'


// CHECKOUT COMPONENT

const CheckoutComponent = styled.div`
  transform: translateX(100%);
  transition: transform 300ms ease-in-out;
  position: fixed;
  top: 0;
  right: 0;
  width: 60%;
  height: 100vh;
  background-color: var(--color-white);
  z-index: 11;
  overflow: auto;

  &.is-active {
    transform: translateX(0%);
  } 

  @media ${breakpoint.tablet} { 
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

// CHECKOUT SHIPPING

const CheckoutShipping = styled.div`
  ${container};

  padding-right: 150px; 
  padding-left: 50px; 

  @media ${breakpoint.desktop} {
    padding-left: 50px; 
  }

  @media ${breakpoint.tablet} { 
    padding-left: 50px;
  }

  @media ${breakpoint.mobile} { 
    padding-left: 30px;
  }
`


// CHECKOUT TEXT

const CheckoutText = styled.div`
  ${container};

  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 150px; 
  padding-left: 50px; 

  @media ${breakpoint.desktop} {
    padding-left: 50px; 
  }

  @media ${breakpoint.tablet} { 
    padding-left: 50px;
  }

  @media ${breakpoint.mobile} { 
    transform: translateY(-70%);
    padding-left: 30px;
  }
`

// CHECKOUT BUTTON

const CheckoutButton = styled.button`
  display: flex;
`

// CHECKOUT PRICE

const CheckoutPrice = styled.h1`
  margin-top: 30px;
`


// CHECKOUT LINK

const CheckoutLink = styled.button`
  display: block;
  margin-top: 20px;
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
`


// CHECKOUT LIST 

const CheckoutList = styled.ul`
  padding: 0;
  height: calc(100vh - 285px);
  position: relative;
  overflow: auto;
  margin-top: 25px;
  margin-bottom: 25px;
`


// CHECKOUT CLOSE

export const CheckoutClose = styled.button` 
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid var(--color-black);
  font-size: 14px;
  color: var(--color-black);
  align-self: flex-end;
  padding: 0px;
  width: 30px;
  height: 30px;
  min-height: 30px;

  span {
    width: 30px;
    height: 30px;
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
    navigate(`/collection/shop-all`);
  }

  const lineItems = checkout.lineItems.map(item => (
    <ProductList key={item.id.toString()} item={item} />
  ))

  return (
    <CheckoutComponent className={`checkout ${isOpen ? 'is-active' : ''}`}>
        {/* CHECKOUT CLOSE */}
        <CheckboxHeader>
          <p>Your Order</p>
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

        {lineItems.length ? <>
          {/* CHECKOUT LIST */}
          <CheckoutList>
            {lineItems}
          </CheckoutList>

          
          <CheckoutShipping>
            {/* CHECKOUT SHIPPING */}
            <Link to="/shipping/" className="link-hover">
              <span>Free Shipping within 30 - 60 days</span>
            </Link>

            {/* CHECKOUT BUTTON */}
            <CheckoutButton 
              onClick={handleCheckout}
              disabled={checkout.lineItems.length === 0}
              className="underline-hover"
              >
              <CheckoutPrice>Check out ??? ??? {checkout.totalPrice}</CheckoutPrice>
            </CheckoutButton>
          </CheckoutShipping>

          </> : <>

          {/* CHECKOUT TEXT */}
          <CheckoutText>
            <p>Looks like you haven???t added anthing to your order yet.</p>
            
            {/* CHECKOUT LINK */}
            <CheckoutLink className="link-hover" onClick={() => handleBackClick()}>
              <span>Shop all</span>
            </CheckoutLink> 
          </CheckoutText>
        </>}

    </CheckoutComponent>
  )
}

export default Checkout
