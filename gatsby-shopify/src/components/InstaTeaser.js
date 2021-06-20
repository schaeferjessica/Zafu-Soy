import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
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
  const {contentfulInstagram} = useStaticQuery(
    graphql`
    query {
      contentfulInstagram {
        heading
        instagramPost {
          id
          text {
            raw
          }
          link
          image {
            gatsbyImageData
            title
          }
        }
      }
    }
    `
  )

  return (
    <InstaTeaserOuter>
      <InstaTeaserInner>
        <h2>{contentfulInstagram.heading}</h2>
        <ul>
          {contentfulInstagram.instagramPost.map(post => {
            const pluginImage = getImage(post.image.gatsbyImageData);

            return (
              <li key={post.id}>
                <a href={post.link}>
                  <GatsbyImage image={pluginImage} alt={post.image.title} />
                  <h3>{post.image.title}</h3>
                  {documentToReactComponents(JSON.parse(post.text.raw))}
                </a>
              </li>
            )
          })}
        </ul>
      </InstaTeaserInner>
    </InstaTeaserOuter>
  )
}

export default InstaTeaser
