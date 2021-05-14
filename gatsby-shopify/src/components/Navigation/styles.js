import styled from '@emotion/styled'
import { Link } from 'gatsby'

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-top: 20px;
  padding-bottom: 20px;
`

export const MenuLink = styled(Link)`
  text-decoration: none;
  color: black;
`

export const CartCounter = styled.span`
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
