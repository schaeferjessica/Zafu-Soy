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
  padding: 20px;
  z-index: 11;
  overflow: auto;
  display: flex;
  flex-direction: column;

  &.is-active {
    transform: translateX(0%);
  } 

  @media ${breakpoint.desktop} { 
    width: 40%;
  }

  @media ${breakpoint.tablet} { 
    width: 50%;
  }

  @media ${breakpoint.tablet} { 
    width: 60%;
  }
`;

const ButtonCheckout = styled.button`
    font-family: 'IBM Plex Sans';
    border: 1px solid #313942;
    background-color: #313942;
    color: #faf9f8;
    padding: 20px 30px;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    padding-top: 15px;
    position: absolute;
    bottom: 50px;
    left: 20px;
    width: 91%;


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
`

const ButtonClose = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #3139425c;
  border-radius: 50%;
  font-size: 14px;
  color: #313942;
  font-weight: 400;
  align-self: flex-end;
  padding: 0px;

  &:hover {
    border: 1px solid #313942;
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
      <ButtonClose onClick={() => handleCheckoutClose()}><span>x</span></ButtonClose>
      {lineItems.length ? <>
      <h2>Your Order</h2>
      <Ul>
        {lineItems}
      </Ul>
      <ButtonCheckout 
        onClick={handleCheckout}
        disabled={checkout.lineItems.length === 0}
        >
        <Span data-hover={`Check out — € ${checkout.totalPrice}`}>Check out — € {checkout.totalPrice}</Span>
      </ButtonCheckout>
      </> : <>
      <Title>Your Order</Title>
      <p>Looks like you haven’t added anthing to your order yet.</p>
      <ButtonBack onClick={() => handleBackClick()}>Take me back to the Shop</ButtonBack> </>}
      
    </StyledCheckout>
  )
}

export default Checkout
