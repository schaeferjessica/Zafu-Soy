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

const InstaTeaserUl = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2rem;
  align-items: start;
  padding: 0px;

  @media ${breakpoint.tablet} {
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
`

const InstaTeaserH3 = styled.h3`
  margin-top: 20px;
`

const InstaTeaserDiv = styled.div`
  margin-top: 20px;
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
        <InstaTeaserUl>
          {contentfulInstagram.instagramPost.map(post => {
            const pluginImage = getImage(post.image.gatsbyImageData);

            return (
              <li key={post.id}>
                <a href={post.link}>
                  <GatsbyImage image={pluginImage} alt={post.image.title} />
                  <InstaTeaserH3>{post.image.title}</InstaTeaserH3>
                  <InstaTeaserDiv>{documentToReactComponents(JSON.parse(post.text.raw))}</InstaTeaserDiv>
                </a>
              </li>
            )
          })}
        </InstaTeaserUl>
      </InstaTeaserInner>
    </InstaTeaserOuter>
  )
}

export default InstaTeaser
