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
  width: 45px;
  height: 45px;
  fill: none;

  @media ${breakpoint.tablet} { 
    width: 40px;
    height: 40px;
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
            d="M7.182 0.784H8.226L3.96 12.592C3.816 12.976 3.642 13.24 3.438 13.384C3.234 13.528 2.898 13.6 2.43 13.6H1.386V12.7H2.934L3.816 10.27L0.396 0.784H1.476L4.302 8.902H4.374L7.182 0.784ZM18.1772 10C17.7812 10 17.4932 9.898 17.3132 9.694C17.1332 9.49 17.0312 9.214 17.0072 8.866V8.542H16.9172C16.7132 9.058 16.3772 9.466 15.9092 9.766C15.4412 10.066 14.8472 10.216 14.1272 10.216C13.1552 10.216 12.4052 9.982 11.8772 9.514C11.3492 9.034 11.0852 8.362 11.0852 7.498C11.0852 6.682 11.3732 6.034 11.9492 5.554C12.5372 5.074 13.4972 4.834 14.8292 4.834H16.9532V3.754C16.9532 2.23 16.1672 1.468 14.5952 1.468C13.9832 1.468 13.4732 1.6 13.0652 1.864C12.6572 2.116 12.3272 2.482 12.0752 2.962L11.4272 2.422C11.6792 1.882 12.0632 1.438 12.5792 1.09C13.1072 0.741999 13.7912 0.567999 14.6312 0.567999C15.7112 0.567999 16.5392 0.837999 17.1152 1.378C17.6912 1.918 17.9792 2.674 17.9792 3.646V9.1H19.2212V10H18.1772ZM14.2712 9.334C14.6432 9.334 14.9912 9.286 15.3152 9.19C15.6392 9.094 15.9212 8.962 16.1612 8.794C16.4132 8.614 16.6052 8.404 16.7372 8.164C16.8812 7.912 16.9532 7.63 16.9532 7.318V5.608H14.7932C13.8692 5.608 13.1972 5.758 12.7772 6.058C12.3692 6.346 12.1652 6.748 12.1652 7.264V7.696C12.1652 8.236 12.3572 8.644 12.7412 8.92C13.1252 9.196 13.6352 9.334 14.2712 9.334ZM24.8074 6.436C24.0994 6.436 23.5954 6.274 23.2954 5.95C23.0074 5.626 22.8634 5.23 22.8634 4.762V4.294C22.8634 3.826 23.0074 3.43 23.2954 3.106C23.5954 2.782 24.0994 2.62 24.8074 2.62C25.5154 2.62 26.0134 2.782 26.3014 3.106C26.6014 3.43 26.7514 3.826 26.7514 4.294V4.762C26.7514 5.23 26.6014 5.626 26.3014 5.95C26.0134 6.274 25.5154 6.436 24.8074 6.436ZM7.182 20.784H8.226L3.96 32.592C3.816 32.976 3.642 33.24 3.438 33.384C3.234 33.528 2.898 33.6 2.43 33.6H1.386V32.7H2.934L3.816 30.27L0.396 20.784H1.476L4.302 28.902H4.374L7.182 20.784ZM15.2402 30.216C14.6282 30.216 14.0762 30.108 13.5842 29.892C13.0922 29.676 12.6722 29.364 12.3242 28.956C11.9762 28.536 11.7062 28.026 11.5142 27.426C11.3222 26.826 11.2262 26.148 11.2262 25.392C11.2262 24.636 11.3222 23.964 11.5142 23.376C11.7062 22.776 11.9762 22.272 12.3242 21.864C12.6722 21.444 13.0922 21.126 13.5842 20.91C14.0762 20.682 14.6282 20.568 15.2402 20.568C15.8522 20.568 16.4042 20.682 16.8962 20.91C17.3882 21.126 17.8082 21.444 18.1562 21.864C18.5042 22.272 18.7742 22.776 18.9662 23.376C19.1582 23.964 19.2542 24.636 19.2542 25.392C19.2542 26.148 19.1582 26.826 18.9662 27.426C18.7742 28.026 18.5042 28.536 18.1562 28.956C17.8082 29.364 17.3882 29.676 16.8962 29.892C16.4042 30.108 15.8522 30.216 15.2402 30.216ZM15.2402 29.298C16.1402 29.298 16.8482 29.016 17.3642 28.452C17.8922 27.888 18.1562 27.06 18.1562 25.968V24.816C18.1562 23.736 17.8922 22.914 17.3642 22.35C16.8482 21.774 16.1402 21.486 15.2402 21.486C14.3402 21.486 13.6262 21.768 13.0982 22.332C12.5822 22.896 12.3242 23.724 12.3242 24.816V25.968C12.3242 27.048 12.5822 27.876 13.0982 28.452C13.6262 29.016 14.3402 29.298 15.2402 29.298ZM25.3347 26.436C24.6267 26.436 24.1227 26.274 23.8227 25.95C23.5347 25.626 23.3907 25.23 23.3907 24.762V24.294C23.3907 23.826 23.5347 23.43 23.8227 23.106C24.1227 22.782 24.6267 22.62 25.3347 22.62C26.0427 22.62 26.5407 22.782 26.8287 23.106C27.1287 23.43 27.2787 23.826 27.2787 24.294V24.762C27.2787 25.23 27.1287 25.626 26.8287 25.95C26.5407 26.274 26.0427 26.436 25.3347 26.436ZM32.662 18.282C32.422 18.282 32.242 18.222 32.122 18.102C32.014 17.982 31.96 17.826 31.96 17.634V17.454C31.96 17.262 32.014 17.106 32.122 16.986C32.242 16.866 32.422 16.806 32.662 16.806C32.902 16.806 33.076 16.866 33.184 16.986C33.304 17.106 33.364 17.262 33.364 17.454V17.634C33.364 17.826 33.304 17.982 33.184 18.102C33.076 18.222 32.902 18.282 32.662 18.282ZM32.158 20.784H33.184V30H32.158V20.784Z"/>
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
