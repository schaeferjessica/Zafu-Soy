// react
import React from 'react'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container, moduleSpaceSmall } from '../styles/containers'


// DETAIL INFO CONTEXT

const DetailInfoContext = styled.div` 
  ${container}
  ${moduleSpaceSmall}
  
  display: flex;
  justify-content: space-between;

  @media ${breakpoint.mobile} {
    display: block;
  } 
`

// DETAIL INFO TEXT LEFT

const DetailInfoTextLeft = styled.div` 
    width: 55%;

    @media ${breakpoint.mobile} {
      border-top: none;
      width: 100%;
    } 

  b {
    margin-top: 25px;
    margin-bottom: 5px;
    display: block;
  }
`

// DETAIL INFO TEXT RIGHT

const DetailInfoTextRight = styled.div` 
    width: 30%;

    @media ${breakpoint.mobile} {
      border-top: none;
      width: 100%;
    } 

  b {
    margin-top: 25px;
    margin-bottom: 5px;
    display: block;
  }
`
const DetailInfo = ({ textLeft, textRight }) => {
  return (
    <DetailInfoContext>
        {/* PRODUCT DETAIL SLIDER TEXT LEFT */}
        <DetailInfoTextLeft>{textLeft}</DetailInfoTextLeft>

        {/* PRODUCT DETAIL SLIDER TEXT RIGHT */}
        <DetailInfoTextRight>{textRight}</DetailInfoTextRight>
    </DetailInfoContext>
  )
}


export default DetailInfo
