import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { breakpoints } from '../../utils/styles'

export const Wrapper = styled.div`
  margin-bottom: 1.45rem;
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1.45rem;
  margin: 0 auto;
  max-width: 960px;
`

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;

  @media (max-width: ${breakpoints.s}px) {
    font-size: 1rem;
  }
`

export const CartCounter = styled.span`
  padding: 0 10px;
`
