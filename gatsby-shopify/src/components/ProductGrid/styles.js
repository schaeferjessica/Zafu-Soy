import styled from '@emotion/styled'

import { breakpoint } from '../../utils/styles'

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 4rem;

  @media ${breakpoint.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 3rem;
  }

  @media ${breakpoint.tablet} {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
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

export const Title = styled.h2`
  margin-top: 10px;
`
