import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 20px;
  padding-bottom: 50px;
  z-index: 9;
  position: relative;
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
`

const CartCounter = styled.span`
  border: 1px solid;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  margin-left: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  font-size: 14px;
`

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <Wrapper>
        <MenuLink to="/">{siteTitle}</MenuLink>
        <MenuLink to="/checkout">
          Your Order
          {hasItems && <CartCounter>{quantity}</CartCounter>}
        </MenuLink>
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
