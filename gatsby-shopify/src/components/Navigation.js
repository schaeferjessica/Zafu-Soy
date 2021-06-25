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
    background-color: transparent;

    .path {
      stroke: ${ciWhite};
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
    .path {
      stroke: ${ciBlue};
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
  }
`

const Inner = styled.div`
  ${container}
  align-items: center;
  padding-top: 10px;
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
    padding-left: 15px;
    padding-right: 15px;
    grid-template-columns: 1fr;
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
  stroke: var(--color-blue);
`

const Svg = styled.svg`
  width: 80px;
  height: 80px;
  fill: none;

  @media ${breakpoint.tablet} { 
    width: 70px;
    height: 70px;
  }
`

const MenuLinkLeft = styled(Link)`
  text-decoration: none;
  color: var(--color-blue);
  grid-column: 1 / 4;
  grid-row: 1 / 1;
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
  }, []);
  
  return (
    <Wrapper ref={navElement} className={isWhite ? 'header--is-white' : 'header--is-blue'}>
      <Inner>
        <MenuLinkLeft to="/">
          <Svg  
            viewBox="0 0 426 454">
            <Path d="M291.717 243.621C291.808 244.526 291.868 245.437 291.868 246.352C291.868 252.52 296.4 260.165 297.768 266.323C303.133 290.465 303.992 316.605 297.93 340.853C296.242 347.605 294.25 354.692 288.513 359.039C285.087 361.634 282.588 365.059 278.987 367.374L278.861 367.455C277.446 368.363 275.306 369.735 275.306 371.541V383.719C275.306 390.895 274.87 398.047 276.281 405.099C277.532 411.357 278.229 418.466 278.229 424.854L278.229 425.228C278.232 433.613 278.236 447.045 267.025 447.045C265.149 447.045 259.823 447.487 259.718 444.88C255.496 440.981 252.628 435.042 251.708 429.979C250.874 425.392 251.708 425.981 251.708 415.653C253.496 409.481 253.496 408.641 253.496 403.981C253.496 392.372 255.004 379.45 251.708 367.915C250.312 363.03 250.977 361.312 245.592 361.312C240.972 361.312 236.443 362.286 231.953 362.286C220.149 362.286 207.781 368.337 197.475 373.49C193.005 375.725 187.981 376.505 183.728 378.632C179.867 380.562 177.446 384.156 174.472 387.129C167.728 393.873 171.995 406.656 171.995 415.653C171.995 427.877 175.161 434.643 174.472 447.045C174.018 455.222 149.89 451.326 147.681 448.993C141.746 442.729 144.812 436.653 142.995 428.479C144.13 418.979 141.995 411.947 141.995 402.979C141.995 402.979 140.861 389.527 140.861 386.642C140.861 383.098 138.272 372.296 135.503 370.08C133.849 368.757 133.664 365.481 132.526 363.693C130.772 360.937 128.761 358.443 127.005 355.683C122.295 348.281 115.531 341.582 115.531 332.139C115.531 323.952 112.545 315.387 111.688 307.242C110.597 296.879 109.685 292.285 109.685 286.349C109.685 277.779 110.425 269.412 110.66 260.965C110.952 250.426 115.02 241.657 118.454 231.738C120.53 225.739 123.325 221.213 123.325 214.743C123.325 211.241 123.316 204.3 121.863 201.103C118.777 194.314 105.816 198.941 99.8889 199.534C89.6135 200.561 77.6113 196.849 69.2544 203.485C66.0105 206.061 63.599 207.001 61.4954 210.479C59.6586 213.517 57.4387 219.173 55.4954 221.979C53.3332 225.103 46.6006 241.479 42.4954 241.479C34.1365 241.479 39.7509 224.291 39.5401 217.124C39.3989 212.322 38.6012 206.595 36.6174 202.132C35.5223 199.668 31.0336 200.439 28.8235 200.562C25.1646 200.765 21.4635 203.485 17.6738 203.485C13.918 203.485 10.5018 203.256 6.90304 202.457C1.80975 201.325 1.40167 199.536 2.49601 195.979C3.84192 191.605 13.4229 190.979 17.6738 190.979C24.4248 190.979 41.6418 185.263 46.996 180.979C54.2633 175.166 54.8641 173.611 61.4954 166.979C66.9361 161.539 68.4296 156.833 74.496 151.979C78.3413 148.903 86.3692 138.05 87.496 132.979C91.996 124.479 98.5135 119.633 104.496 114.979C110.942 109.966 111.626 112.032 114.07 103.479C115.987 101.083 119.12 91.0625 121.376 88.5245C130.642 78.1002 134.041 64.9474 134.041 51.0162V30.5572C134.041 23.1404 139.012 18.2034 141.835 11.5595C144.056 16.0012 151.708 19.9166 155.258 23.4669C156.967 25.1755 158.217 30.0701 160.833 30.0701C164.194 30.0701 166.797 31.2916 169.996 30.9361C173.055 30.5962 175.368 30.5572 178.496 30.5572H190.996C194.61 30.5572 202.4 30.5365 205.996 30.9361C214.943 31.9302 219.459 30.9361 228.434 30.9361C233.538 30.9361 243.688 20.3813 246.566 16.8637C248.405 14.6162 260.681 -5.43682 262.996 4.98165C264.315 10.9165 263.886 12.7529 262.996 18.9795C262.35 23.5036 265.311 30.1433 265.564 34.9413C265.745 38.3806 265.564 34.9413 267.458 47.4794C271.495 59.9794 276.487 58.1331 282.495 60.9794C289.029 64.0744 301.948 60.7585 308.996 62.4814C314.139 63.7386 336.412 72.1883 340.364 75.4814C344.788 78.3568 357.788 84.7443 360.996 88.9814C363.996 90.4814 371.487 97.4704 379.496 107.481C381.269 109.698 382.496 112.481 391.995 125.979C400.09 137.481 398.995 138.979 397.495 148.479C395.995 154.479 392.952 156.509 391.241 158.979C387.948 163.736 382.496 170.77 374.496 171.481C361.03 172.679 342.583 172.538 335.222 173.283C330.942 173.283 324.496 173.283 326.996 175.981C322.92 183.319 314.496 184.981 322.996 203.981C324.496 214.981 322.965 222.368 321.495 228.979C319.935 236.001 316.224 239.996 316.224 247.326C316.224 251.135 315.595 256.679 311.995 258.479C309.252 259.851 305.195 262.574 302.098 261.885C297.115 260.778 293.666 250.9 291.717 243.621ZM291.717 243.621C291.443 240.896 290.894 238.221 290.894 235.635C290.894 229.347 289.069 232.237 290.136 237.042L290.19 237.284C290.504 238.699 291.013 240.99 291.717 243.621ZM165.016 184.267H188.111C196.298 184.267 201.92 182.292 209.996 181.981C215.839 181.757 223.712 179.795 229.477 179.383C231.109 179.266 233.278 178.41 234.753 177.755C236.442 177.004 238.79 176.924 236.11 175.584M194.863 192.956C197.81 192.956 201.41 193.456 204.33 192.925C205.705 192.675 207.024 191.87 208.431 191.87M256.73 82.2439C266.188 82.2439 275.593 81.7012 284.951 81.7012M262.699 94.1838H278.558C280.055 94.1838 283.677 94.0172 284.407 92.5557M105.859 92.0127C114.046 92.0127 122.201 92.5554 130.281 92.5554M99.3477 102.867H124.191C125.669 102.867 132.35 103.308 130.282 101.239M152.531 74.6465C155.34 70.2176 158.268 70.3049 163.114 70.3049C164.188 70.3049 170.764 69.6797 168.39 72.0536C165.661 74.7832 159.5 76.4809 155.787 76.2746C153.016 76.1207 152.744 74.2074 155.516 73.5913C157.63 73.1215 159.624 72.4757 161.757 72.4757C162.873 72.4757 163.447 71.933 164.471 71.933C165.144 71.933 162.368 72.5584 162.029 72.7471C159.964 73.8938 158.178 74.6465 155.787 74.6465M222.543 72.4756C222.633 72.4756 222.742 72.4728 222.869 72.4676M222.869 72.4676C223.385 72.4466 224.187 72.3865 225.139 72.318M222.869 72.4676C221.881 70.7244 222.193 68.274 224.714 68.134C227.492 67.9796 234.178 66.906 235.568 70.0334C236.179 71.408 236.238 72.3702 235.929 73.036M222.869 72.4676C223.326 73.2737 224.062 73.9286 224.985 74.1338C227.302 74.6486 234.106 75.8665 235.99 73.9831C236.342 73.6305 236.276 73.3166 235.929 73.036M225.139 72.318C228.643 72.0659 234.187 71.6998 235.025 72.7469C235.423 73.2442 235.618 73.4358 235.675 73.4316M225.139 72.318C224.716 71.5931 224.509 70.8319 224.834 70.4254C226.175 68.7497 226.879 68.134 229.055 68.134C230.951 68.134 232.934 69.8418 234.211 71.1188C234.557 71.4646 235.037 72.1622 235.356 72.7012M225.139 72.318C225.677 73.2402 226.566 74.1037 227.156 74.1037C229.284 74.1037 234.187 75.18 235.675 73.4316M235.675 73.4316C235.686 73.4309 235.691 73.4236 235.693 73.4106M235.675 73.4316C235.681 73.4246 235.687 73.4176 235.693 73.4106M235.693 73.4106C235.702 73.333 235.563 73.0503 235.356 72.7012M235.693 73.4106C235.786 73.2976 235.865 73.1731 235.929 73.036M235.356 72.7012C235.589 72.8072 235.784 72.9187 235.929 73.036M235.356 72.7012C233.174 71.7087 227.579 71.1948 226.884 70.8475M144.935 28.5166C145.903 33.0363 148.734 37.5389 148.734 42.0841C148.734 44.5367 149.438 46.6373 147.377 47.7825C145.684 48.7231 143.897 48.4203 142.342 49.8026C141.391 50.6478 143.127 47.2205 144.121 46.4258C145.084 45.6553 145.478 42.1918 145.478 40.9987C145.478 38.9811 143.581 30.2788 144.935 29.602M254.018 29.0596C254.018 28.2758 254.077 22.0262 252.148 22.5773C251.053 22.8902 249.374 25.5163 248.591 26.3461C245.692 29.4148 243.706 34.6522 243.706 38.8282C243.706 40.6589 243.028 43.3959 244.792 44.3758C245.815 44.9445 246.775 45.1897 247.774 45.2908M247.774 45.2908C248.86 45.4007 249.993 45.3406 251.304 45.3406L251.388 45.3407C253.304 45.3409 254.501 45.341 252.058 44.2552C251.08 43.8204 250.206 43.8109 249.405 43.1698C248.724 42.6251 248.458 41.5438 247.777 40.999C244.657 38.5031 248.409 33.2062 249.676 30.9892C250.191 30.0873 253.455 29.062 252.39 28.3963C252.037 28.1757 251.55 25.8731 250.882 26.4667C250.527 26.782 250.618 28.5028 250.339 29.0596C249.682 30.3749 247.306 31.1783 246.993 32.5872C246.639 34.1778 245.685 35.7581 245.304 37.4715C244.882 39.37 244.249 41.7349 244.249 43.7125C244.249 43.8719 246.821 45.0347 247.774 45.2908ZM247.774 45.2908C247.894 45.3228 247.987 45.3406 248.048 45.3406M247.507 45.341C246.9 44.507 244.378 41.7524 246.301 43.2908C247.065 43.9022 248.118 43.8507 248.592 44.7983M252.932 26.3463C250.175 26.2774 250.219 25.9691 250.219 23.6328M144.391 47.5117C145.165 45.528 145.476 44.1303 145.476 42.0847C145.476 40.9961 146.085 39.2611 146.531 41.2707C146.904 42.9465 147.642 46.1572 146.019 46.969M407.602 101.781C408.492 103.527 410.206 105.787 410.315 107.751C410.373 108.801 410.848 110.579 411.28 111.55C412.235 113.699 411.4 120.957 411.4 118.605M420.629 98.5254C423.932 104.207 424.428 108.975 424.428 115.349M69.9343 141.512C69.9343 138.588 68.3035 124.373 72.6766 124.373M58.2768 144.254C58.2768 142.12 57.2283 136.552 59.648 135.342M292.059 177.165C297.764 183.043 300.717 190.422 301.821 198.183M301.821 198.183C302.179 200.697 302.342 203.251 302.342 205.806V206.981M301.821 198.183C302.02 201.232 302.18 204.054 302.342 206.981M301.821 198.183C301.724 196.684 301.617 195.13 301.496 193.481C302.342 185.481 302.74 185.892 304.704 181.964C306.685 178.001 308.643 178.159 312.283 176.136C315.201 174.515 327.496 173.481 332.496 173.481M302.342 206.981V211.443C302.342 211.674 302.4 208.014 302.342 206.981ZM254.352 376.663C258.207 376.663 261.595 377.349 265.321 377.349M140.547 377.349C148.127 378.686 155.486 379.405 163.171 379.405M134.378 234.064C133.065 241.356 129.528 248.253 127.37 255.317C125.707 260.759 121.764 265.539 120.133 271.085C119.168 274.367 117.593 278.222 116.02 281.369C114.951 283.507 112.521 288.883 110.383 289.596M187.168 70.8977C189.06 70.8977 195.738 70.1746 197.299 71.7356C198.886 73.322 193.052 75.5399 192.653 76.0395C190.007 79.3462 187.04 76.7906 184.959 74.4779C182.204 71.4168 187.523 71.3414 188.539 72.6116C189.068 73.2729 191.709 73.64 190.862 73.64C189.729 73.64 189.071 74.6074 187.748 74.3363M187.748 74.3363C187.683 74.3231 187.617 74.3069 187.549 74.2875C187.386 74.2408 187.198 74.1045 187.009 73.9273M187.748 74.3363C187.497 74.2052 187.246 74.0728 187.009 73.9273M187.748 74.3363C188.23 74.589 188.709 74.8366 189.072 75.1635C189.194 75.2733 197.091 73.9863 193.998 72.6116C190.968 71.2649 189.155 70.8977 185.833 70.8977M187.009 73.9273C186.326 73.2892 185.608 72.1199 185.835 72.6878C186.056 73.24 186.499 73.6141 187.009 73.9273ZM184.952 96.7576C190.481 96.4591 194.007 96.1454 199.185 95.5395C200.364 95.2796 200.996 96.0591 204.5 93.4997C206.354 91.4528 205.484 97.5017 205.757 97.8887C206.982 99.629 204.377 96.7254 203.899 96.2925C202.617 95.1311 200.996 96.4814 197.496 96.4814C192.496 96.4814 188.752 97.5325 184.35 97.2624" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="path"
            />
          </Svg>
        </MenuLinkLeft>
        <MenuLinkCenter to="/">
          <SpanText className="logo-text">maneki.space</SpanText>
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
