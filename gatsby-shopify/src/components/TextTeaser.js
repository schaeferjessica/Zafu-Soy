// react
import React from 'react'

// gatsby
import { useStaticQuery, graphql, Link } from 'gatsby'

// emotion
import styled from '@emotion/styled/macro'

// contentful
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// styles
import breakpoint from '../styles/breakpoints'
import { container, moduleSpace, headerSpace } from '../styles/containers'



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
      <TextTeaserTitle>
        <Link to="/about" className="link-hover">
          <span>{contentfulTextTeaser.title}</span>
        </Link>
      </TextTeaserTitle>

        {/* TEXT TEASER TEXT */}
        <TextTeaserText>{documentToReactComponents(JSON.parse(contentfulTextTeaser.text.raw))}</TextTeaserText>
    </TextTeaserComponent>
  )
}

export default TextTeaser