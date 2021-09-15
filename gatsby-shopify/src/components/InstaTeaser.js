import React, {useRef} from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
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


// INSTA TEASER TOP

const InstaTeaserTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`

// INSTA TEASER HEADER

const InstaTeaserHeader = styled.h2`
  ${headerSpace}
`

// INSTA TEASER NAVI

const InstaTeaserNavi = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-right: 150px;

  @media ${breakpoint.desktop} { 
    margin-right: 100px;
  }

  @media ${breakpoint.tablet} { 
    margin-right: 80px;
  }

  @media ${breakpoint.mobile} { 
    margin-right: 30px;
  }
`

const InstaTeaserButton = styled.div`
  height: 25px;
  width: 25px;
  margin-left: 15px;
  border: 1px solid var(--color-gray);
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(0%);
  transition: .5s ease-in-out;
  padding: 4px;

  &:hover {
    transform: translate(0%) scale(1.2); 
    border: 1px solid var(--color-blue);
  }

  svg.left {
    transform: translateX(-3px);
  }

  svg.right {
    transform: rotate(180deg) translateX(-3px);
  }

  path {
    fill: var(--color-blue);
  }
`

// INSTA TEASER INNER

const InstaTeaserInner = styled.div`
  text-align: center;

  .glide__slides {
    margin: 0;
  }

  .Glide-leftArrow,
  .Glide-rightArrow  {
    display: none;
  }
`

// INSTA TEASER TEXT

const InstaTeaserText = styled.div`
  margin-top: 20px;
`


/* INSTA TEASER */

const InstaTeaser = () => {
  const sliderRef = useRef(null);
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

    {/* INSTA TEASER TOP */}
    <InstaTeaserTop>
      {/* INSTA TEASER HEADER */}
      <InstaTeaserHeader>
        <Link to="https://www.instagram.com/yayoi.shop/" target="_blank" rel="noopener noreferrer" className="link-hover">
          <span>{contentfulInstagram.heading}</span>
        </Link>
      </InstaTeaserHeader>

      {/* INSTA TEASER NAVI */}
      <InstaTeaserNavi>
        <InstaTeaserButton onClick={() => sliderRef.current.go('<')}>
          <svg width="25" height="25" viewBox="0 0 1024 1024">
            <path d="M10.24 486.4c0 2.56 0 2.56 0 0-15.36 15.36-15.36 38.4 0 51.2l325.12 325.12c0 0 0 0 0 0 15.36 15.36 35.84 15.36 51.2 0 12.8-15.36 12.8-35.84 0-51.2l-261.12-261.12h865.28c17.92 0 33.28-15.36 33.28-33.28 0-20.48-15.36-38.4-33.28-38.4h-865.28l261.12-263.68c2.56-2.56 2.56-2.56 5.12-5.12 12.8-15.36 10.24-38.4-5.12-51.2s-38.4-10.24-51.2 5.12l-325.12 322.56z"></path>
          </svg>
        </InstaTeaserButton>
        <InstaTeaserButton onClick={() => sliderRef.current.go('>')}>
          <svg width="25" height="25" viewBox="0 0 1024 1024">
            <path d="M688.64 163.84c-12.8-15.36-35.84-17.92-51.2-5.12s-17.92 35.84-5.12 51.2c2.56 2.56 2.56 2.56 5.12 5.12l261.12 261.12h-862.72c-20.48 0-35.84 17.92-33.28 38.4 0 17.92 15.36 33.28 33.28 33.28h865.28l-263.68 263.68c-12.8 15.36-12.8 35.84 0 51.2 15.36 15.36 35.84 15.36 51.2 0 0 0 0 0 0 0l325.12-325.12c15.36-12.8 15.36-35.84 0-51.2 0 0 0 0 0 0l-325.12-322.56z"></path>
          </svg>
        </InstaTeaserButton>
      </InstaTeaserNavi>
    </InstaTeaserTop>

      {/* INSTA TEASER INNER */}

      <InstaTeaserInner>
        <Glide
          ref={sliderRef}
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
                <a href={post.link} target="_blank" rel="noopener noreferrer">
                  <GatsbyImage 
                    image={pluginImage} 
                    alt={post.image.title}
                    className="image-hover" 
                  />
                </a>

                {/* INSTA TEASER TEXT */}
                <InstaTeaserText>{documentToReactComponents(JSON.parse(post.text.raw))}</InstaTeaserText> 
              </div>
            )
          })}
        </Glide>
      </InstaTeaserInner>
    </InstaTeaserContainer>
  )
}

export default InstaTeaser
