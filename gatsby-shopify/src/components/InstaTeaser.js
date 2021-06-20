import React, {useRef} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from '@emotion/styled';
import { breakpoint, container, moduleSpace } from '../utils/styles';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';


const InstaTeaserOuter = styled.section`
  ${moduleSpace}
`

const InstaTeaserHeader = styled.div`
  ${container}
`

const InstaTeaserInner = styled.div`
  margin-top: 30px;

  @media ${breakpoint.desktop} {
    margin-top: 20px;
  }
`

const InstaTeaserH3 = styled.h3`
  margin-top: 20px;
`

const InstaTeaserDiv = styled.div`
  margin-top: 20px;
`


const InstaTeaser = () => {
  const gliderRef = useRef(null);
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
      <InstaTeaserHeader>
        <h2>{contentfulInstagram.heading}</h2>
      </InstaTeaserHeader>
      <InstaTeaserInner>
        <Glide
          ref={gliderRef}
          type="slider"
          perView={4}
          breakpoints={{
            1200: {
              perView: 3,
              gap: 20,
              peek: {
                before: 35,
                after: 55,
              }
            },
            800: {
              perView: 2,
              gap: 20,
              peek: {
                before: 25,
                after: 45,
              }
            },
            500: {
              perView: 1,
              gap: 10,
              peek: {
                before: 15,
                after: 35,
              }
            }
          }}
          gap={30}
          bound={true}
          peek={{
            before: 45,
            after: 65,
          }}
          slideClassName="slider__frame"
        >
          {contentfulInstagram.instagramPost.map(post => {
            const pluginImage = getImage(post.image.gatsbyImageData);

            return (
              <div key={post.id}>
                <a href={post.link} target="_blank" rel="noreferrer">
                  <GatsbyImage image={pluginImage} alt={post.image.title} />
                  <InstaTeaserH3>{post.image.title}</InstaTeaserH3>
                  <InstaTeaserDiv>{documentToReactComponents(JSON.parse(post.text.raw))}</InstaTeaserDiv>
                </a>
              </div>
            )
          })}
        </Glide>
      </InstaTeaserInner>
    </InstaTeaserOuter>
  )
}

export default InstaTeaser
