import React, { useContext, useEffect, useRef } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled/macro'
import { container, breakpoint, ciWhite, ciBlue, ciGray } from '~/utils/styles'
import { Link } from 'gatsby'


// NAVIGATION

const NavigationContainer = styled.div`
  z-index: 9;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;

  &.header--is-white {
    .stroke {
      stroke: ${ciWhite};
    }

    .fill {
      fill: ${ciWhite};
    }

    .logo-text {
      display: none;
    }

    .cart-button,
    .cart-text,
    .logo-text,
    .cart__counter {
      color: ${ciWhite};
    }
    
    .cart__counter {
      border-color: ${ciWhite};

      &:hover {
        border-color: ${ciWhite};
      }
    }
  }

  &.header--is-blue,
  &.content--is-blue {
    background-color: ${ciWhite};

    .stroke {
      stroke: ${ciBlue};
    }

    .fill {
      fill: ${ciBlue};
    }

    .cart-button,
    .cart-text,
    .logo-text,
    .cart__counter {
      color: ${ciBlue};
    }

    .logo-text {
      display: block;
    }
    
    .cart__counter {
      border-color: ${ciGray};

      &:hover {
        border-color: ${ciBlue};
      }
    }
  }

  &.content--is-blue {
    background-color: ${ciWhite};

    .logo-text {
      display: block;
    }
  }
`


// NAVIGATION INNER

const NavigationInner = styled.div`
  ${container}
  align-items: center;
  padding-top: 15px;
  padding-bottom: 10px;
  display: grid;
  align-items: center;
  justify-items: start;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  &.navigation--transparent {
    background-color: transparent;
  }

  @media ${breakpoint.tablet} { 
    grid-template-columns: 1fr;
  }

  @media ${breakpoint.mobile} { 
    padding-top: 10px;
    padding-bottom: 5x;
  }
`

const SpanText = styled.span`
  font-family: 'IBM Plex Sans';
  color: var(--color-blue);
  font-weight: 400;

  @media ${breakpoint.tablet} { 
    display: none;
  }
`


// NAVIGATION LINK LEFT

const NavigationLinkLeft = styled(Link)`
  text-decoration: none;
  color: var(--color-blue);
  grid-column: 1 / 4;
  grid-row: 1 / 1;
  line-height: 0.7;
`


// NAVIGATION LINK CENTER

const NavigationLinkCenter = styled(Link)`
  text-decoration: none;
  color: var(--color-blue);
  grid-column: 2 / 4;
  grid-row: 1 / 1;
`


// NAVIGATION BUTTON RIGHT

const NavigationButtonRight = styled.button`
  padding-left: 15px;
  grid-column: 4 / 4;
  grid-row: 1 / 1;
  justify-self: end;
`

const CartText = styled.span`
  padding-left: 15px;
  font-weight: 400;
`

const CartCounter = styled.span`
  border: 1px solid var(--color-gray);
  color: var(--color-blue);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-left: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 14px;
  font-weight: 400;

  &:hover {
    border: 1px solid var(--color-blue);
  }
`

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}


{/* NAVIGATION */}

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
        <NavigationLinkLeft to="/">
          <SpanText className="logo-text">ya yo i</SpanText>
        </NavigationLinkLeft>

        {/* NAVIGATION LINK CENTER*/}
        <NavigationLinkCenter to="/collection/frontpage">
          <SpanText className="logo-text">shop</SpanText>
        </NavigationLinkCenter>

        {/* NAVIGATION BUTTON RIGHT*/}
        <NavigationButtonRight onClick={() => onOrderButtonClick()} className="cart-button">
          <CartText className="cart-text">your order</CartText>
          {hasItems ? <CartCounter className="cart__counter">{quantity}</CartCounter> : <CartCounter className="cart__counter">0</CartCounter>}
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
