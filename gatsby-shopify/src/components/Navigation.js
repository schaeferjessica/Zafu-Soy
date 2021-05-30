import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { breakpoint, container } from '~/utils/styles'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  z-index: 9;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
`

const Inner = styled.div`
  ${container}
  background-color: #FAF9F8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  padding-bottom: 15px;

  @media ${breakpoint.tablet} { 
    padding-top: 10px;
    padding-bottom: 10px;
  }

  &.navigation--transparent {
    background-color: transparent;
  }
`

const SvgWrapper = styled.div`
  border: 1px solid #313942;
  border-radius: 50%;
  width: 90px;
  height: 90px;
  background-color: #313942;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${breakpoint.desktop} { 
    width: 80px;
    height: 80px;
  }

  @media ${breakpoint.tablet} { 
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

const Svg = styled.svg`
  width: 100px;
  height: 100px;
`
const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const MenuButton = styled.button`
  text-decoration: none;
  color: black;
`

const CartCounter = styled.span`
  border: 1px solid #313942;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-left: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 14px;
  background-color: #313942;
  color: #faf9f8;
  font-weight: 400;
`

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({isTransparent, onOrderButtonClick}) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <Wrapper>
      <Inner className={ isTransparent && "navigation--transparent"}>
      <MenuLink to="/">
        <Span>Maneki Space</Span>
        <SvgWrapper>
        <Svg 
          version="1.0" 
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512.000000 512.000000"
          preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
        fill="#FAF9F8" stroke="none">
        <path d="M1782 4367 c-88 -28 -192 -163 -285 -369 -119 -265 -168 -424 -186
        -607 -18 -171 -20 -164 47 -206 83 -53 284 -149 382 -183 222 -77 367 -102
        597 -103 311 -1 631 93 931 273 45 27 82 54 82 59 0 13 -120 132 -215 215 -79
        69 -120 135 -136 218 -19 107 21 233 102 321 l40 44 -25 54 c-67 140 -179 266
        -257 287 -55 15 -96 1 -177 -58 -128 -95 -216 -126 -352 -126 -142 0 -238 33
        -352 121 -91 70 -130 82 -196 60z m140 -164 c37 -35 60 -77 52 -97 -3 -9 -25
        -21 -48 -27 -22 -5 -89 -26 -148 -45 -60 -19 -112 -32 -118 -29 -25 15 -1 79
        58 161 57 78 144 94 204 37z m941 23 c71 -29 167 -196 128 -221 -6 -3 -47 7
        -93 23 -46 16 -108 35 -138 42 -63 14 -91 34 -83 58 20 55 86 112 131 112 12
        0 37 -6 55 -14z m-870 -499 c50 -21 97 -66 97 -92 0 -35 -26 -38 -63 -6 -63
        55 -114 65 -184 36 -43 -18 -63 -14 -63 15 0 47 140 77 213 47z m835 -7 c30
        -13 42 -25 42 -40 0 -29 -20 -33 -63 -15 -70 29 -121 19 -185 -37 -27 -23 -37
        -27 -48 -17 -19 16 -18 32 6 62 50 63 164 85 248 47z m-419 -206 c13 -12 12
        -16 -3 -33 -10 -11 -27 -23 -37 -26 -18 -6 -18 -7 0 -44 22 -42 84 -102 133
        -127 38 -20 24 -29 -28 -19 -39 7 -114 68 -114 93 0 8 -18 -5 -41 -31 -27 -32
        -53 -50 -80 -57 -60 -16 -82 -8 -39 14 61 33 97 65 120 110 l23 43 -33 30
        c-35 31 -34 48 4 63 26 11 76 3 95 -16z m-576 -40 c30 -9 1 -24 -48 -24 -40 0
        -106 28 -112 47 -4 10 106 -6 160 -23z m1142 16 c-20 -32 -130 -52 -164 -31
        -17 11 -1 16 104 36 66 12 70 12 60 -5z m-1170 -89 c34 -7 37 -9 20 -17 -27
        -11 -222 -11 -260 0 l-30 10 35 6 c49 10 187 10 235 1z m1270 0 c68 -14 13
        -26 -115 -26 -124 0 -184 13 -120 25 49 10 187 10 235 1z m-1280 -103 c-45
        -24 -186 -39 -150 -17 38 24 90 38 140 38 l50 0 -40 -21z m1190 -4 l40 -18
        -43 -4 c-45 -3 -137 21 -148 40 -11 17 105 3 151 -18z"/>
        <path d="M3254 3991 c-105 -49 -184 -165 -184 -271 0 -105 42 -164 251 -353
        67 -60 115 -114 155 -174 69 -105 166 -305 224 -463 23 -63 46 -119 51 -124 4
        -5 19 29 33 75 76 250 97 672 46 889 -45 185 -148 328 -287 397 -66 32 -85 37
        -161 40 -70 3 -95 0 -128 -16z"/>
        <path d="M3285 3115 c-178 -183 -374 -281 -718 -359 -22 -5 -26 -10 -18 -24
        18 -34 24 -112 11 -157 -16 -56 -81 -132 -135 -156 -44 -21 -121 -24 -176 -9
        -50 14 -123 81 -144 132 -20 49 -23 145 -6 177 15 28 6 41 -28 41 -56 0 -224
        50 -319 95 -153 72 -259 145 -383 263 -52 49 -68 59 -73 46 -18 -48 -56 -397
        -56 -520 0 -178 13 -255 68 -399 39 -104 45 -130 46 -200 1 -71 -3 -88 -32
        -147 -38 -77 -92 -130 -171 -166 -102 -47 -223 -40 -314 18 l-46 29 -7 -67
        c-9 -84 10 -304 35 -397 45 -170 108 -283 220 -396 78 -79 92 -89 155 -108 83
        -26 235 -28 341 -6 100 21 196 55 202 71 8 22 -34 146 -67 196 -50 76 -133
        132 -250 169 l-55 17 41 1 c54 1 162 -32 244 -75 110 -58 187 -146 221 -254
        l17 -55 78 -9 c115 -13 743 -11 776 2 20 8 30 22 39 54 51 192 255 341 463
        337 l41 0 -65 -22 c-171 -58 -282 -178 -297 -323 l-5 -51 83 -26 c117 -37 177
        -47 288 -47 156 0 222 24 318 117 116 112 201 272 240 453 25 118 25 420 -1
        575 -42 256 -141 577 -266 864 -70 163 -155 336 -187 383 l-18 26 -90 -93z
        m-824 -871 c180 -54 318 -194 365 -369 19 -68 17 -200 -2 -266 -66 -225 -269
        -379 -499 -379 -140 0 -255 50 -360 155 -76 76 -125 161 -144 253 -67 318 176
        621 500 622 50 0 108 -7 140 -16z"/>
        <path d="M2194 2162 c-109 -38 -208 -122 -255 -214 -126 -247 9 -554 276 -623
        207 -53 415 46 508 243 30 63 32 74 32 177 0 106 -1 113 -36 185 -47 97 -112
        162 -209 209 -67 32 -84 36 -170 38 -71 2 -108 -2 -146 -15z m51 -141 c23 -13
        30 -24 30 -47 0 -24 -5 -30 -26 -32 -40 -5 -79 32 -79 74 0 32 2 35 23 29 12
        -4 36 -15 52 -24z m309 13 c34 -34 14 -58 -84 -99 -89 -37 -130 -43 -147 -19
        -26 36 -17 51 38 57 34 4 63 16 87 34 60 46 82 52 106 27z m-436 -121 c27 -15
        36 -16 74 -5 88 26 84 27 109 -17 25 -46 27 -47 55 -26 10 8 30 15 42 15 22 0
        23 -3 17 -39 -6 -36 -4 -39 20 -45 58 -15 85 16 59 66 -21 41 -7 54 40 34 47
        -20 61 -54 41 -101 -14 -35 -49 -57 -107 -70 -27 -5 -58 -48 -58 -80 0 -28 18
        -16 30 20 14 44 37 45 48 3 6 -24 15 -34 33 -36 39 -6 43 -19 11 -36 -36 -18
        -70 -76 -46 -76 29 0 74 31 90 62 21 41 8 71 -46 98 -49 25 -43 44 12 37 75
        -10 116 -58 103 -124 -9 -49 -49 -89 -111 -112 -162 -61 -276 21 -229 166 6
        19 1 24 -30 37 -50 21 -56 20 -41 -9 8 -16 12 -55 10 -112 -3 -75 -7 -91 -25
        -105 -15 -13 -26 -15 -39 -8 -27 15 -33 45 -19 99 13 52 5 141 -13 141 -6 0
        -33 -13 -60 -30 -91 -56 -109 -27 -24 40 57 43 132 127 123 136 -3 3 -15 0
        -27 -6 -58 -31 -136 21 -112 75 14 29 29 31 70 8z"/>
        <path d="M2266 1801 c-19 -21 -12 -28 13 -12 7 5 12 14 9 21 -2 7 -10 4 -22
        -9z"/>
        <path d="M2192 1739 c2 -7 10 -15 17 -17 8 -3 12 1 9 9 -2 7 -10 15 -17 17 -8
        3 -12 -1 -9 -9z"/>
        <path d="M2334 1716 c-10 -8 -16 -18 -11 -22 4 -4 13 -2 19 4 7 7 23 12 36 12
        13 0 20 4 17 10 -9 14 -38 12 -61 -4z"/>
        <path d="M2372 1553 c3 -18 53 -42 64 -31 3 4 1 16 -6 27 -14 27 -63 30 -58 4z"/>
        <path d="M1107 3059 c-161 -170 -348 -471 -402 -645 -31 -99 -41 -218 -26
        -299 34 -181 187 -335 333 -335 166 1 299 166 258 320 -6 25 -28 88 -47 140
        -19 52 -41 129 -49 170 -26 148 -13 456 31 708 3 17 2 32 -4 32 -5 0 -48 -41
        -94 -91z"/>
        <path d="M2251 2784 c-76 -40 -109 -150 -65 -224 30 -52 66 -73 131 -78 48 -3
        64 0 92 20 73 50 96 116 66 193 -23 62 -71 97 -138 102 -35 3 -63 -2 -86 -13z"/>
        </g>
        </Svg>
        </SvgWrapper>
      </MenuLink>
        <MenuButton onClick={() => onOrderButtonClick()}>
          Your Order
          {hasItems && <CartCounter>{quantity}</CartCounter>}
        </MenuButton>
      </Inner>
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
