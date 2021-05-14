import styled from '@emotion/styled'

import { breakpoint } from '../../utils/styles'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.5rem;

  @media ${breakpoint.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media ${breakpoint.tablet} {
    grid-template-columns: 1fr 1fr;
  }

  @media ${breakpoint.mobile} {
    grid-template-columns: 1fr;
  } 
`

export const Product = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
`

export const Title = styled.span`
  font-size: 1rem;  
  margin-top: 20px;
`

export const PriceTag = styled.span`
  font-size: 1rem;
  margin-top: 15px;
`
