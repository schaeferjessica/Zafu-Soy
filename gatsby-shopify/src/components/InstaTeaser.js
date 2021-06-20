import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled'
import { breakpoint, container, moduleSpace } from '../utils/styles'

const InstaTeaserOuter = styled.section`
  ${container}
`

const InstaTeaserInner = styled.section`
  ${moduleSpace}

  @media ${breakpoint.desktop} {
    outline: 1px;
  }
`


const InstaTeaser = () => {

  return (
    <InstaTeaserOuter>
      <InstaTeaserInner>
        <h2>Instagram</h2>
        <p>insta teaser</p>
      </InstaTeaserInner>
    </InstaTeaserOuter>
  )
}

export default InstaTeaser
