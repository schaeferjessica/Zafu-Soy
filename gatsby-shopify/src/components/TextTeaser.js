import React from 'react'
import styled from '@emotion/styled/macro'
import { useStaticQuery, graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { breakpoint, container, moduleSpace, headerSpace } from '../utils/styles'

const TextTeaserComponent = styled.div`
  ${moduleSpace}
  ${container}
`

// TEXT TEASER TITLE

const TextTeaserTitle = styled.h2 `
    ${headerSpace}
`

//  TEXT TEASER TEXT 

const TextTeaserText = styled.div`
    max-width : 80%;

    @media ${breakpoint.tablet} {
        max-width : 100%;
    }

    p {
        font-weight: 200;
        font-family: 'IBM Plex Serif';
        font-size: 40px;
        line-height: 60px;

        @media ${breakpoint.tablet} {
            font-size: 22px;
            line-height: 34px;
        }
    }
`


const TextTeaser = () => {

const {contentfulTextTeaser} = useStaticQuery(
    graphql`
    query {
        contentfulTextTeaser {
          text {raw}
          title
        }
      }
      `
    )
      

  return (
    <TextTeaserComponent>

        {/* TEXT TEASER TITLE H2 */}
        <TextTeaserTitle>{contentfulTextTeaser.title}</TextTeaserTitle>

        {/* TEXT TEASER TEXT */}
        <TextTeaserText>{documentToReactComponents(JSON.parse(contentfulTextTeaser.text.raw))}</TextTeaserText>
    </TextTeaserComponent>
  )
}

export default TextTeaser