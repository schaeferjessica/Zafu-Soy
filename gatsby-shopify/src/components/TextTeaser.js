import React from 'react'
import styled from '@emotion/styled/macro'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { breakpoint, container, moduleSpace } from '../utils/styles'

const TextTeaserComponent = styled.div`
  ${moduleSpace}
  ${container}
`
const TextTeaserText = styled.div`
    max-width : 80%;

    @media ${breakpoint.tablet} {
        max-width : 100%;
    }
`


const TextTeaser = () => {

const {contentfulTextTeaser} = useStaticQuery(
    graphql`
    query {
        contentfulTextTeaser {
          text {raw}
        }
      }
      `
    )
      

  return (
    <TextTeaserComponent>
      <TextTeaserText>{documentToReactComponents(JSON.parse(contentfulTextTeaser.text.raw))}</TextTeaserText>
    </TextTeaserComponent>
  )
}

export default TextTeaser