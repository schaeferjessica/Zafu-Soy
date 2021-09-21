// react
import React, { useContext, useEffect, useRef } from 'react'

import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'

// gatsby
import { Link } from 'gatsby'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container } from '../styles/containers'
import { ciWhite, ciBlack } from '../styles/colors'


// NAVIGATION

const NavigationContainer = styled.div`
  z-index: 9;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;

  &.header--is-white {

    .navigation__span,
    .navigation__cart-button,
    .navigation__cart-span,
    .navigation__cart-counter {
      color: ${ciWhite};
      font-weight: 500;
    }
    
    .navigation__cart-button {
      border-color: ${ciWhite};
    }

    .link-hover::after {
      background-color: ${ciWhite};
    }
  }

  &.header--is-blue,
  &.content--is-blue {
    background-color: ${ciWhite};

    .navigation__span,
    .navigation__cart-button,
    .navigation__cart-span,
    .navigation__cart-counter {
      color: ${ciBlack};
      font-weight: 400;
    }

    .link-hover::after {
      background-color: ${ciBlack};
    }
    
    .navigation__cart-button {
      border-color: ${ciBlack};
    }

  }
`


// NAVIGATION INNER

const NavigationInner = styled.div`
  ${container}
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
  width: 100%;

  @media ${breakpoint.mobile} { 
    padding-top: 10px;
    padding-bottom: 10px;
  }
`


// NAVIGATION LINK LEFT

const NavigationLinkLeft = styled(Link)`
  color: var(--color-black);
`


// NAVIGATION LINK SHOP

const NavigationLinkShop = styled(Link)`
  color: var(--color-black);
  margin-right: 25px;
`

// NAVIGATION BUTTON RIGHT

const NavigationButtonRight = styled.div`
  margin-left: 20px;
  display: flex;
  align-items: center;
`

const NavigationButtonOrder = styled.button`
  margin-right: 10px;
  padding: 0;
`

const NavigationButtonCounter = styled.button`
  border: 1.5px solid var(--color-black);
  color: var(--color-black);
  width: 30px;
  height: 30px;
  margin-left: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 2px 0px 0px 0px;
`

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}


/* NAVIGATION */

const Navigation = ({isWhite, onOrderButtonClick, hasScroll = true}) => {
  const [hasItems, quantity] = useQuantity()
  const navElement = useRef(null);

  function handleScroll() {
    const scrollTopPosition = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTopPosition >= window.innerHeight) {
      navElement.current.classList.add('content--is-blue');
    } else {
      navElement.current.classList.remove('content--is-blue');
    }
  }

  useEffect(() => {
    if (hasScroll) {
      window.addEventListener('scroll', handleScroll);
    } else {
      navElement.current.classList.add('content--is-blue');
    }
    return () => {
      if (hasScroll) window.removeEventListener('scroll', handleScroll);
    }
  }, [hasScroll]);
  
  return (
    <NavigationContainer ref={navElement} className={isWhite ? 'header--is-white' : 'header--is-blue'}>

      {/* NAVIGATION INNER*/}

      <NavigationInner>

        {/* NAVIGATION LINK LEFT*/}
        <NavigationLinkLeft to="/" className="navigation__link navigation__link--left underline-hover">
          <span className="navigation__span">Zafu & Soy</span>
        </NavigationLinkLeft>

  
        {/* NAVIGATION BUTTON RIGHT*/}
        <NavigationButtonRight>

          {/* NAVIGATION LINK SHOP */}
          <NavigationLinkShop to="/collection/frontpage" className="navigation__link navigation__link--right underline-hover">
            <span className="navigation__span">shop</span>
          </NavigationLinkShop>


          <NavigationButtonOrder onClick={() => onOrderButtonClick()} className="navigation__cart-button underline-hover">
            <span className="navigation__cart-span">your order</span>
          </NavigationButtonOrder>

          <NavigationButtonCounter onClick={() => onOrderButtonClick()} className="navigation__cart-button">
            {hasItems ? <span className="navigation__cart-counter">{quantity}</span> : <span className="navigation__cart-counter">0</span>}
          </NavigationButtonCounter>

        </NavigationButtonRight>

      </NavigationInner>
    </NavigationContainer>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
