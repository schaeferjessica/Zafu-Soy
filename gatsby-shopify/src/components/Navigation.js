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
import { ciWhite, ciBlue, ciGray } from '../styles/colors'


// NAVIGATION

const NavigationContainer = styled.div`
  z-index: 9;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;

  &.header--is-white {
    .link-hover::after {
      background-color: ${ciWhite};
    }

    .stroke {
      stroke: ${ciWhite};
    }

    .fill {
      fill: ${ciWhite};
    }

    .navigation__link {
      display: none;
    }

    .navigation__span,
    .navigation__cart-button,
    .navigation__cart-span,
    .navigation__cart-counter {
      color: ${ciWhite};
      font-weight: 400;
    }
    
    .navigation__cart-counter {
      border-color: ${ciWhite};

      &:hover {
        border-color: ${ciWhite};
      }
    }
  }

  &.header--is-blue,
  &.content--is-blue {
    background-color: ${ciWhite};

    .link-hover::after {
      background-color: ${ciBlue};
    }

    .stroke {
      stroke: ${ciBlue};
    }

    .fill {
      fill: ${ciBlue};
    }

    .navigation__span,
    .navigation__cart-button,
    .navigation__cart-span,
    .navigation__cart-counter {
      color: ${ciBlue};
      font-weight: 300;
    }

    .navigation-span {
      display: block;
    }
    
    .navigation__cart-counter {
      border-color: ${ciGray};

      &:hover {
        border-color: ${ciBlue};
      }
    }

    .navigation__link {
      display: block;

      @media ${breakpoint.mobile} { 
          display: none;
      }
    }
  }

  &.content--is-blue {
    background-color: ${ciWhite};
  }
`


// NAVIGATION INNER

const NavigationInner = styled.div`
  ${container}
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;
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
    padding-bottom: 10px;
  }
`

const NavigationSpan = styled.span`
  font-size: 17px;
  color: var(--color-blue);

  @media ${breakpoint.mobile} { 
    font-size: 16px;
  }
`


// NAVIGATION LINK LEFT

const NavigationLinkLeft = styled(Link)`
  color: var(--color-blue);
  grid-column: 1 / 4;
  grid-row: 1 / 1;
`


// NAVIGATION LINK CENTER

const NavigationLinkCenter = styled(Link)`
  color: var(--color-blue);
  grid-column: 2 / 4;
  grid-row: 1 / 1;
  `



// NAVIGATION BUTTON RIGHT

const NavigationButtonRight = styled.div`
  grid-column: 4 / 4;
  grid-row: 1 / 1;
  justify-self: end;
  margin-left: 20px;
`;

const NavigationButtonOrder = styled.button`
  margin-right: 5px;  
`

const NavigationButtonCounter = styled.button`
  padding: 0px;
  margin-left: 5px;  
`


// NAVIGATION CARD

const NavigationCartCounter = styled.small`
  border: 1px solid var(--color-gray);
  color: var(--color-blue);
  width: 30px;
  height: 30px;
  margin-left: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;

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
        <NavigationLinkLeft to="/" className="link-hover navigation__link">
          <NavigationSpan className="navigation__span">home</NavigationSpan>
        </NavigationLinkLeft>

        {/* NAVIGATION LINK CENTER*/}
        <NavigationLinkCenter to="/collection/frontpage" className="link-hover navigation__link">
          <NavigationSpan className="navigation__span">shop</NavigationSpan>
        </NavigationLinkCenter>

        {/* NAVIGATION BUTTON RIGHT*/}
        <NavigationButtonRight>
          <NavigationButtonOrder onClick={() => onOrderButtonClick()} className="navigation__cart-button link-hover">
            <span className="navigation__cart-span">your order</span>
          </NavigationButtonOrder>
          <NavigationButtonCounter onClick={() => onOrderButtonClick()} className="navigation__cart-button">
            {hasItems ? <NavigationCartCounter className="navigation__cart-counter">{quantity}</NavigationCartCounter> : <NavigationCartCounter className="navigation__cart-counter">0</NavigationCartCounter>}
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
