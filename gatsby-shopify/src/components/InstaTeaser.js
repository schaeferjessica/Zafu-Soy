import React, {useRef} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from '@emotion/styled/macro';
import { breakpoint, container, headerSpace, moduleSpace } from '../utils/styles';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';

// INSTA TEASER

const InstaTeaserContainer = styled.section`
  ${moduleSpace}
  ${container}

  padding-right: 0px;

  @media ${breakpoint.desktop} {
    padding-right: 0px;
  }

  @media ${breakpoint.tablet} {
    padding-right: 0px;
  }

  @media ${breakpoint.mobile} {
    padding-right: 0px;
  }
`

// INSTA TEASER HEADER

const InstaTeaserHeader = styled.div`
  ${headerSpace}
`

// INSTA TEASER INNER

const InstaTeaserInner = styled.div`
  .Glide-leftArrow,
  .Glide-rightArrow  {
    padding: 3px;
    color: var(--color-gray);
    background-color: #EEEEEE5C;

    svg {
      width: 40px;
      height: 16px;
    }
  }

  .glide__slides {
    margin-top: 0px;
  }

  .Glide-leftArrow  {
    left: 1%;
  }

  .Glide-rightArrow  {
    right: 3%;
  }

  a:hover {
    text-decoration: none;
  }
`

// INSTA TEASER TITLE

const InstaTeaserTitle = styled.h3`
  margin-top: 20px;
`

// INSTA TEASER TEXT

const InstaTeaserText = styled.div`
  margin-top: 5px;
`


/* INSTA TEASER */

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
    <InstaTeaserContainer>

      {/* INSTA TEASER HEADER */}

      <InstaTeaserHeader>
        <h2>{contentfulInstagram.heading}</h2>
      </InstaTeaserHeader>

      {/* INSTA TEASER INNER */}

      <InstaTeaserInner>
        <Glide
          ref={gliderRef}
          type="slider"
          perView={3}
          breakpoints={{
            1200: {
              perView: 3,
              gap: 30,
              peek: {
                before: 0,
                after: 160,
              }
            },
            800: {
              perView: 2,
              gap: 30,
              peek: {
                before: 0,
                after: 140,
              }
            },
            500: {
              perView: 1,
              gap: 20,
              peek: {
                before: 0,
                after: 80,
              }
            }
          }}
          gap={40}
          bound={true}
          peek={{
            before: 0,
            after: 200,
          }}
          slideClassName="slider__frame"
        >
          {contentfulInstagram.instagramPost.map(post => {
            const pluginImage = getImage(post.image.gatsbyImageData);

            return (
              <div key={post.id}>
                <a href={post.link} target="_blank" rel="noreferrer">
                  <GatsbyImage image={pluginImage} alt={post.image.title} />
                  {/* INSTA TEASER TITLE */}
                  <InstaTeaserTitle>{post.image.title}</InstaTeaserTitle>
                  {/* INSTA TEASER TEXT */}
                  <InstaTeaserText>{documentToReactComponents(JSON.parse(post.text.raw))}</InstaTeaserText>
                </a>
              </div>
            )
          })}
        </Glide>
      </InstaTeaserInner>
    </InstaTeaserContainer>
  )
}

export default InstaTeaser
