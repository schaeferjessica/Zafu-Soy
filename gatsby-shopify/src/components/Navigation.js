import React, { useContext, useEffect, useRef } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { breakpoint, ciWhite, ciBlue, ciGray } from '~/utils/styles'
import { Link } from 'gatsby'
// import Menu from './Menu'

const Wrapper = styled.div`
  z-index: 9;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;

  &.is-blue {
    svg g {
      fill: ${ciBlue};
    }

    button.is-white,
    button.is-white span {
      color: ${ciBlue};
    }
    
    .cart__counter.is-white {
      border-color: ${ciGray};

      &:hover {
        border-color: ${ciBlue};
      }
    }
  }
`

const Inner = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;

  &.navigation--transparent {
    background-color: transparent;
  }

  @media ${breakpoint.tablet} { 
    padding-left: 15px;
    padding-right: 15px;
  }
`

const SvgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const Svg = styled.svg`
  fill: var(--color-blue);
  width: 80px;
  height: 80px;
  fill: var(--color-white);

  @media ${breakpoint.desktop} { 
    width: 70px;
    height: 70px;
  }

  @media ${breakpoint.tablet} { 
    width: 60px;
    height: 60px;
  }
`

const Span = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  border: 0;
  clip: rect(0, 0, 0, 0);
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: var(--color-blue);
`

const CartButton = styled.button`
  padding-left: 15px;

  &.is-white span {
    color: var(--color-white);
  }
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
  
  &.is-white {
    color: var(--color-white);
  }
`

const CartCounter = styled.span`
  border: 1px solid var(--color-gray);
  color: var(--color-blue);
  border-radius: 50%;
  width: 25px;
  height: 25px;
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

  &.is-white {
    color: var(--color-white);
    border-color: var(--color-white);

    &:hover {
      border-color: var(--color-white);
    }
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

const Navigation = ({isWhite, onOrderButtonClick}) => {
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
      navElement.current.classList.add('is-blue');
    } else {
      navElement.current.classList.remove('is-blue');
    }
  }

  useEffect(() => {
    if (isWhite) window.addEventListener('scroll', handleScroll);
    return () => {
      if (isWhite) window.removeEventListener('scroll', handleScroll);
    }
  }, [])
  return (
    <Wrapper ref={navElement}>
      <Inner>
        <MenuLink to="/">
          <Span>Maneki Space</Span>
          <SvgWrapper>
            <Svg
              version="1.0" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 512 512">
                <g fill={isWhite ? ciWhite : ciBlue}>
                <path d="M178.2 75.3c-8.8 2.8-19.2 16.3-28.5 36.9-11.9 26.5-16.8 42.4-18.6 60.7-1.8 17.1-2 16.4 4.7 20.6 8.3 5.3 28.4 14.9 38.2 18.3 22.2 7.7 36.7 10.2 59.7 10.3 31.1.1 63.1-9.3 93.1-27.3 4.5-2.7 8.2-5.4 8.2-5.9 0-1.3-12-13.2-21.5-21.5-7.9-6.9-12-13.5-13.6-21.8-1.9-10.7 2.1-23.3 10.2-32.1l4-4.4-2.5-5.4c-6.7-14-17.9-26.6-25.7-28.7-5.5-1.5-9.6-.1-17.7 5.8-12.8 9.5-21.6 12.6-35.2 12.6-14.2 0-23.8-3.3-35.2-12.1-9.1-7-13-8.2-19.6-6zm14 16.4c3.7 3.5 6 7.7 5.2 9.7-.3.9-2.5 2.1-4.8 2.7-2.2.5-8.9 2.6-14.8 4.5-6 1.9-11.2 3.2-11.8 2.9-2.5-1.5-.1-7.9 5.8-16.1 5.7-7.8 14.4-9.4 20.4-3.7zm94.1-2.3c7.1 2.9 16.7 19.6 12.8 22.1-.6.3-4.7-.7-9.3-2.3-4.6-1.6-10.8-3.5-13.8-4.2-6.3-1.4-9.1-3.4-8.3-5.8 2-5.5 8.6-11.2 13.1-11.2 1.2 0 3.7.6 5.5 1.4zm-87 49.9c5 2.1 9.7 6.6 9.7 9.2 0 3.5-2.6 3.8-6.3.6-6.3-5.5-11.4-6.5-18.4-3.6-4.3 1.8-6.3 1.4-6.3-1.5 0-4.7 14-7.7 21.3-4.7zm83.5.7c3 1.3 4.2 2.5 4.2 4 0 2.9-2 3.3-6.3 1.5-7-2.9-12.1-1.9-18.5 3.7-2.7 2.3-3.7 2.7-4.8 1.7-1.9-1.6-1.8-3.2.6-6.2 5-6.3 16.4-8.5 24.8-4.7zm-41.9 20.6c1.3 1.2 1.2 1.6-.3 3.3-1 1.1-2.7 2.3-3.7 2.6-1.8.6-1.8.7 0 4.4 2.2 4.2 8.4 10.2 13.3 12.7 3.8 2 2.4 2.9-2.8 1.9-3.9-.7-11.4-6.8-11.4-9.3 0-.8-1.8.5-4.1 3.1-2.7 3.2-5.3 5-8 5.7-6 1.6-8.2.8-3.9-1.4 6.1-3.3 9.7-6.5 12-11l2.3-4.3-3.3-3c-3.5-3.1-3.4-4.8.4-6.3 2.6-1.1 7.6-.3 9.5 1.6zm-57.6 4c3 .9.1 2.4-4.8 2.4-4 0-10.6-2.8-11.2-4.7-.4-1 10.6.6 16 2.3zm114.2-1.6c-2 3.2-13 5.2-16.4 3.1-1.7-1.1-.1-1.6 10.4-3.6 6.6-1.2 7-1.2 6 .5zm-117 8.9c3.4.7 3.7.9 2 1.7-2.7 1.1-22.2 1.1-26 0l-3-1 3.5-.6c4.9-1 18.7-1 23.5-.1zm127 0c6.8 1.4 1.3 2.6-11.5 2.6-12.4 0-18.4-1.3-12-2.5 4.9-1 18.7-1 23.5-.1zm-128 10.3c-4.5 2.4-18.6 3.9-15 1.7 3.8-2.4 9-3.8 14-3.8h5l-4 2.1zm119 .4l4 1.8-4.3.4c-4.5.3-13.7-2.1-14.8-4-1.1-1.7 10.5-.3 15.1 1.8z"/>
                <path d="M325.4 112.9c-10.5 4.9-18.4 16.5-18.4 27.1 0 10.5 4.2 16.4 25.1 35.3 6.7 6 11.5 11.4 15.5 17.4 6.9 10.5 16.6 30.5 22.4 46.3 2.3 6.3 4.6 11.9 5.1 12.4.4.5 1.9-2.9 3.3-7.5 7.6-25 9.7-67.2 4.6-88.9-4.5-18.5-14.8-32.8-28.7-39.7-6.6-3.2-8.5-3.7-16.1-4-7-.3-9.5 0-12.8 1.6z"/>
                <path d="M328.5 200.5c-17.8 18.3-37.4 28.1-71.8 35.9-2.2.5-2.6 1-1.8 2.4 1.8 3.4 2.4 11.2 1.1 15.7-1.6 5.6-8.1 13.2-13.5 15.6-4.4 2.1-12.1 2.4-17.6.9-5-1.4-12.3-8.1-14.4-13.2-2-4.9-2.3-14.5-.6-17.7 1.5-2.8.6-4.1-2.8-4.1-5.6 0-22.4-5-31.9-9.5-15.3-7.2-25.9-14.5-38.3-26.3-5.2-4.9-6.8-5.9-7.3-4.6-1.8 4.8-5.6 39.7-5.6 52 0 17.8 1.3 25.5 6.8 39.9 3.9 10.4 4.5 13 4.6 20 .1 7.1-.3 8.8-3.2 14.7-3.8 7.7-9.2 13-17.1 16.6-10.2 4.7-22.3 4-31.4-1.8l-4.6-2.9-.7 6.7c-.9 8.4 1 30.4 3.5 39.7 4.5 17 10.8 28.3 22 39.6 7.8 7.9 9.2 8.9 15.5 10.8 8.3 2.6 23.5 2.8 34.1.6 10-2.1 19.6-5.5 20.2-7.1.8-2.2-3.4-14.6-6.7-19.6-5-7.6-13.3-13.2-25-16.9l-5.5-1.7 4.1-.1c5.4-.1 16.2 3.2 24.4 7.5 11 5.8 18.7 14.6 22.1 25.4l1.7 5.5 7.8.9c11.5 1.3 74.3 1.1 77.6-.2 2-.8 3-2.2 3.9-5.4 5.1-19.2 25.5-34.1 46.3-33.7h4.1l-6.5 2.2c-17.1 5.8-28.2 17.8-29.7 32.3l-.5 5.1 8.3 2.6c11.7 3.7 17.7 4.7 28.8 4.7 15.6 0 22.2-2.4 31.8-11.7 11.6-11.2 20.1-27.2 24-45.3 2.5-11.8 2.5-42-.1-57.5-4.2-25.6-14.1-57.7-26.6-86.4-7-16.3-15.5-33.6-18.7-38.3l-1.8-2.6-9 9.3zm-82.4 87.1c18 5.4 31.8 19.4 36.5 36.9 1.9 6.8 1.7 20-.2 26.6-6.6 22.5-26.9 37.9-49.9 37.9-14 0-25.5-5-36-15.5-7.6-7.6-12.5-16.1-14.4-25.3-6.7-31.8 17.6-62.1 50-62.2 5 0 10.8.7 14 1.6z"/><path d="M219.4 295.8c-10.9 3.8-20.8 12.2-25.5 21.4-12.6 24.7.9 55.4 27.6 62.3 20.7 5.3 41.5-4.6 50.8-24.3 3-6.3 3.2-7.4 3.2-17.7 0-10.6-.1-11.3-3.6-18.5-4.7-9.7-11.2-16.2-20.9-20.9-6.7-3.2-8.4-3.6-17-3.8-7.1-.2-10.8.2-14.6 1.5zm5.1 14.1c2.3 1.3 3 2.4 3 4.7 0 2.4-.5 3-2.6 3.2-4 .5-7.9-3.2-7.9-7.4 0-3.2.2-3.5 2.3-2.9 1.2.4 3.6 1.5 5.2 2.4zm30.9-1.3c3.4 3.4 1.4 5.8-8.4 9.9-8.9 3.7-13 4.3-14.7 1.9-2.6-3.6-1.7-5.1 3.8-5.7 3.4-.4 6.3-1.6 8.7-3.4 6-4.6 8.2-5.2 10.6-2.7zm-43.6 12.1c2.7 1.5 3.6 1.6 7.4.5 8.8-2.6 8.4-2.7 10.9 1.7 2.5 4.6 2.7 4.7 5.5 2.6 1-.8 3-1.5 4.2-1.5 2.2 0 2.3.3 1.7 3.9-.6 3.6-.4 3.9 2 4.5 5.8 1.5 8.5-1.6 5.9-6.6-2.1-4.1-.7-5.4 4-3.4 4.7 2 6.1 5.4 4.1 10.1-1.4 3.5-4.9 5.7-10.7 7-2.7.5-5.8 4.8-5.8 8 0 2.8 1.8 1.6 3-2 1.4-4.4 3.7-4.5 4.8-.3.6 2.4 1.5 3.4 3.3 3.6 3.9.6 4.3 1.9 1.1 3.6-3.6 1.8-7 7.6-4.6 7.6 2.9 0 7.4-3.1 9-6.2 2.1-4.1.8-7.1-4.6-9.8-4.9-2.5-4.3-4.4 1.2-3.7 7.5 1 11.6 5.8 10.3 12.4-.9 4.9-4.9 8.9-11.1 11.2-16.2 6.1-27.6-2.1-22.9-16.6.6-1.9.1-2.4-3-3.7-5-2.1-5.6-2-4.1.9.8 1.6 1.2 5.5 1 11.2-.3 7.5-.7 9.1-2.5 10.5-1.5 1.3-2.6 1.5-3.9.8-2.7-1.5-3.3-4.5-1.9-9.9 1.3-5.2.5-14.1-1.3-14.1-.6 0-3.3 1.3-6 3-9.1 5.6-10.9 2.7-2.4-4 5.7-4.3 13.2-12.7 12.3-13.6-.3-.3-1.5 0-2.7.6-5.8 3.1-13.6-2.1-11.2-7.5 1.4-2.9 2.9-3.1 7-.8z"/><path d="M226.6 331.9c-1.9 2.1-1.2 2.8 1.3 1.2.7-.5 1.2-1.4.9-2.1-.2-.7-1-.4-2.2.9zM219.2 338.1c.2.7 1 1.5 1.7 1.7.8.3 1.2-.1.9-.9-.2-.7-1-1.5-1.7-1.7-.8-.3-1.2.1-.9.9zM233.4 340.4c-1 .8-1.6 1.8-1.1 2.2.4.4 1.3.2 1.9-.4.7-.7 2.3-1.2 3.6-1.2 1.3 0 2-.4 1.7-1-.9-1.4-3.8-1.2-6.1.4zM237.2 356.7c.3 1.8 5.3 4.2 6.4 3.1.3-.4.1-1.6-.6-2.7-1.4-2.7-6.3-3-5.8-.4zM110.7 206.1c-16.1 17-34.8 47.1-40.2 64.5-3.1 9.9-4.1 21.8-2.6 29.9 3.4 18.1 18.7 33.5 33.3 33.5 16.6-.1 29.9-16.6 25.8-32-.6-2.5-2.8-8.8-4.7-14-1.9-5.2-4.1-12.9-4.9-17-2.6-14.8-1.3-45.6 3.1-70.8.3-1.7.2-3.2-.4-3.2-.5 0-4.8 4.1-9.4 9.1zM225.1 233.6c-7.6 4-10.9 15-6.5 22.4 3 5.2 6.6 7.3 13.1 7.8 4.8.3 6.4 0 9.2-2 7.3-5 9.6-11.6 6.6-19.3-2.3-6.2-7.1-9.7-13.8-10.2-3.5-.3-6.3.2-8.6 1.3z"/></g>
            </Svg>
          </SvgWrapper>
        </MenuLink>
          {/* <MenuButton onClick={() => setMenuStatus(!menuStatus)}>Shop</MenuButton> */}
          <CartButton onClick={() => onOrderButtonClick()} className={isWhite && 'is-white'}>
            <CartText>Your Order</CartText>
            {hasItems ? <CartCounter className={`cart__counter ${isWhite && 'is-white'}`}>{quantity}</CartCounter> : <CartCounter className={`cart__counter ${isWhite && 'is-white'}`}>0</CartCounter>}
          </CartButton>
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
