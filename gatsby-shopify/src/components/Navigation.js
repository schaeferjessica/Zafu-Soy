import React, { useContext, useEffect, useRef } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { container, breakpoint, ciWhite, ciBlue, ciGray } from '~/utils/styles'
import { Link } from 'gatsby'
// import Menu from './Menu'

const Wrapper = styled.div`
  z-index: 9;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;

  &.header--is-white {
    path {
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

    path {
      fill: ${ciBlue};
    }

    .cart-button,
    .cart-text,
    .logo-text,
    .cart__counter {
      color: ${ciBlue};
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

      @media ${breakpoint.mobile} {
        display: none;
      }
    }
  }
`

const Inner = styled.div`
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

const Path = styled.path`
  fill: var(--color-blue);
`

const Svg = styled.svg`
  width: 50px;
  height: 50px;
  fill: none;

  @media ${breakpoint.tablet} { 
    width: 45px;
    height: 45px;
  }
`

const MenuLinkLeft = styled(Link)`
  text-decoration: none;
  color: var(--color-blue);
  grid-column: 1 / 4;
  grid-row: 1 / 1;
  line-height: 0.7;
`

const MenuLinkCenter = styled(Link)`
  text-decoration: none;
  color: var(--color-blue);
  grid-column: 2 / 4;
  grid-row: 1 / 1;
`

const CartButtonRight = styled.button`
  padding-left: 15px;
  grid-column: 4 / 4;
  grid-row: 1 / 1;
  justify-self: end;
`

// const MenuButton = styled.button`
//   padding-left: 15px;
//   z-index: 20;

//   &:hover {
//     text-decoration: underline;
//     text-decoration-thickness: 1px;
//     text-underline-offset: 5px;
//   }
// `

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

const Navigation = ({isWhite, onOrderButtonClick, hasScroll = true}) => {
  const [hasItems, quantity] = useQuantity()
  const navElement = useRef(null);
  // const [menuStatus, setMenuStatus] = useState(false);


  // useEffect(() => {
  //   if (menuStatus) {
  //     document.querySelector('body').classList.add('prevent-scroll');
  //   } else {
  //     document.querySelector('body').classList.remove('prevent-scroll');
  //   }
  // }, [menuStatus])

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
    <Wrapper ref={navElement} className={isWhite ? 'header--is-white' : 'header--is-blue'}>
      <Inner>
        <MenuLinkLeft to="/">
        <Svg viewBox="0 0 35 34">
          <Path
            d="M7.254 0.711999H8.676L4.518 12.16C4.41 12.436 4.302 12.664 4.194 12.844C4.086 13.036 3.954 13.186 3.798 13.294C3.642 13.402 3.444 13.48 3.204 13.528C2.976 13.576 2.694 13.6 2.358 13.6H1.62V12.34H3.078L3.78 10.36L0.306 0.711999H1.746L3.978 7.03L4.41 8.542H4.5L5.004 7.03L7.254 0.711999ZM18.8163 10C18.2763 10 17.8863 9.856 17.6463 9.568C17.4183 9.28 17.2743 8.92 17.2143 8.488H17.1243C16.9203 9.064 16.5843 9.496 16.1163 9.784C15.6483 10.072 15.0903 10.216 14.4423 10.216C13.4583 10.216 12.6903 9.964 12.1383 9.46C11.5983 8.956 11.3283 8.272 11.3283 7.408C11.3283 6.532 11.6463 5.86 12.2823 5.392C12.9303 4.924 13.9323 4.69 15.2883 4.69H17.1243V3.772C17.1243 3.112 16.9443 2.608 16.5843 2.26C16.2243 1.912 15.6723 1.738 14.9283 1.738C14.3643 1.738 13.8903 1.864 13.5063 2.116C13.1343 2.368 12.8223 2.704 12.5703 3.124L11.7063 2.314C11.9583 1.81 12.3603 1.384 12.9123 1.036C13.4643 0.676 14.1603 0.496 15.0003 0.496C16.1283 0.496 17.0043 0.772 17.6283 1.324C18.2523 1.876 18.5643 2.644 18.5643 3.628V8.74H19.6263V10H18.8163ZM14.6763 8.992C15.0363 8.992 15.3663 8.95 15.6663 8.866C15.9663 8.782 16.2243 8.662 16.4403 8.506C16.6563 8.35 16.8243 8.17 16.9443 7.966C17.0643 7.762 17.1243 7.54 17.1243 7.3V5.77H15.2163C14.3883 5.77 13.7823 5.89 13.3983 6.13C13.0263 6.37 12.8403 6.718 12.8403 7.174V7.552C12.8403 8.008 13.0023 8.362 13.3263 8.614C13.6623 8.866 14.1123 8.992 14.6763 8.992ZM25.5156 6.652C24.7116 6.652 24.1416 6.472 23.8056 6.112C23.4816 5.752 23.3196 5.308 23.3196 4.78V4.276C23.3196 3.748 23.4816 3.304 23.8056 2.944C24.1416 2.584 24.7116 2.404 25.5156 2.404C26.3196 2.404 26.8836 2.584 27.2076 2.944C27.5436 3.304 27.7116 3.748 27.7116 4.276V4.78C27.7116 5.308 27.5436 5.752 27.2076 6.112C26.8836 6.472 26.3196 6.652 25.5156 6.652ZM7.254 20.712H8.676L4.518 32.16C4.41 32.436 4.302 32.664 4.194 32.844C4.086 33.036 3.954 33.186 3.798 33.294C3.642 33.402 3.444 33.48 3.204 33.528C2.976 33.576 2.694 33.6 2.358 33.6H1.62V32.34H3.078L3.78 30.36L0.306 20.712H1.746L3.978 27.03L4.41 28.542H4.5L5.004 27.03L7.254 20.712ZM15.7345 30.216C15.1105 30.216 14.5405 30.102 14.0245 29.874C13.5085 29.646 13.0645 29.322 12.6925 28.902C12.3325 28.47 12.0505 27.96 11.8465 27.372C11.6425 26.772 11.5405 26.1 11.5405 25.356C11.5405 24.624 11.6425 23.958 11.8465 23.358C12.0505 22.758 12.3325 22.248 12.6925 21.828C13.0645 21.396 13.5085 21.066 14.0245 20.838C14.5405 20.61 15.1105 20.496 15.7345 20.496C16.3585 20.496 16.9225 20.61 17.4265 20.838C17.9425 21.066 18.3865 21.396 18.7585 21.828C19.1305 22.248 19.4185 22.758 19.6225 23.358C19.8265 23.958 19.9285 24.624 19.9285 25.356C19.9285 26.1 19.8265 26.772 19.6225 27.372C19.4185 27.96 19.1305 28.47 18.7585 28.902C18.3865 29.322 17.9425 29.646 17.4265 29.874C16.9225 30.102 16.3585 30.216 15.7345 30.216ZM15.7345 28.938C16.5145 28.938 17.1505 28.698 17.6425 28.218C18.1345 27.738 18.3805 27.006 18.3805 26.022V24.69C18.3805 23.706 18.1345 22.974 17.6425 22.494C17.1505 22.014 16.5145 21.774 15.7345 21.774C14.9545 21.774 14.3185 22.014 13.8265 22.494C13.3345 22.974 13.0885 23.706 13.0885 24.69V26.022C13.0885 27.006 13.3345 27.738 13.8265 28.218C14.3185 28.698 14.9545 28.938 15.7345 28.938ZM26.1308 26.652C25.3268 26.652 24.7568 26.472 24.4208 26.112C24.0968 25.752 23.9348 25.308 23.9348 24.78V24.276C23.9348 23.748 24.0968 23.304 24.4208 22.944C24.7568 22.584 25.3268 22.404 26.1308 22.404C26.9348 22.404 27.4988 22.584 27.8228 22.944C28.1588 23.304 28.3268 23.748 28.3268 24.276V24.78C28.3268 25.308 28.1588 25.752 27.8228 26.112C27.4988 26.472 26.9348 26.652 26.1308 26.652ZM33.7535 18.534C33.4415 18.534 33.2135 18.462 33.0695 18.318C32.9375 18.162 32.8715 17.964 32.8715 17.724V17.49C32.8715 17.25 32.9375 17.058 33.0695 16.914C33.2135 16.758 33.4415 16.68 33.7535 16.68C34.0655 16.68 34.2875 16.758 34.4195 16.914C34.5635 17.058 34.6355 17.25 34.6355 17.49V17.724C34.6355 17.964 34.5635 18.162 34.4195 18.318C34.2875 18.462 34.0655 18.534 33.7535 18.534ZM33.0335 20.712H34.4735V30H33.0335V20.712Z"/>
          </Svg>
        </MenuLinkLeft>
        <MenuLinkCenter to="/">
          <SpanText className="logo-text sr-only">yayoi.shop</SpanText>
        </MenuLinkCenter>
        {/* <MenuButton onClick={() => setMenuStatus(!menuStatus)}>Shop</MenuButton> */}
        <CartButtonRight onClick={() => onOrderButtonClick()} className="cart-button">
          <CartText className="cart-text">Your Order</CartText>
          {hasItems ? <CartCounter className="cart__counter">{quantity}</CartCounter> : <CartCounter className="cart__counter">0</CartCounter>}
        </CartButtonRight>
      </Inner>
      {/* <Menu menuStatus={menuStatus} triggerMenuStatus={() => setMenuStatus(false)}/> */}
    </Wrapper>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
