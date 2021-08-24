import React, {useRef} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import styled from '@emotion/styled/macro';
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
  margin-left: 100px;

  @media ${breakpoint.desktop} {
    margin-top: 20px;
    margin-left: 50px;
  }

  @media ${breakpoint.tablet} {
    margin-left: 30px;
  }

  @media ${breakpoint.mobile} {
    margin-left: 20px;
  }

  .Glide-leftArrow,
  .Glide-rightArrow  {
    padding: 3px;
    color: var(--color-blue);

    svg {
      width: 40px;
      height: 16px;
    }
  }

  .Glide-leftArrow  {
    left: 1rem;
  }

  .Glide-rightArrow  {
    right: 1rem;
  }

  a:hover h3 {
    text-decoration: underline;
  }

  a:hover {
    text-decoration: none;
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
