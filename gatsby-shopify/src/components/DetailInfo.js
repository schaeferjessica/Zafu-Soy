// react
import React from 'react'

// emotion
import styled from '@emotion/styled/macro'

// styles
import { container, moduleSpace } from '../styles/containers'


// DETAIL INFO CONTEXT

const DetailInfoContext = styled.div` 
  ${container}
  ${moduleSpace}
  
  display: flex;
  justify-content: space-between;
`

// DETAIL INFO TEXT LEFT

const DetailInfoTextLeft = styled.div` 
    border-top: 2px solid var(--color-black);
    width: 55%;

  b {
    margin-top: 25px;
    margin-bottom: 5px;
    display: block;
  }
`

// DETAIL INFO TEXT RIGHT

const DetailInfoTextRight = styled.div` 
    border-top: 2px solid var(--color-black);
    width: 40%;

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
