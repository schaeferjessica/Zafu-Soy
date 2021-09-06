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
  margin-right: 30px;
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

  &:hover {
    transform: translate(0%) scale(1.3);
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

  .Glide-leftArrow,
  .Glide-rightArrow  {
    display: none;
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
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" class="right"><path data-v-63491422="" d="M7.85906 1.44416L16.6979 8.42432L7.85906 15.4045V1.44416Z"></path></svg>
        </InstaTeaserButton>
        <InstaTeaserButton onClick={() => sliderRef.current.go('>')}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" class="left"><path data-v-63491422="" d="M7.85906 1.44416L16.6979 8.42432L7.85906 15.4045V1.44416Z"></path></svg>
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
                  <GatsbyImage image={pluginImage} alt={post.image.title} />
                </a>

                
                {/* INSTA TEASER TITLE */}
                <InstaTeaserTitle>
                  <a href={post.link} className="link-hover" target="_blank" rel="noopener noreferrer">
                    <span>{post.image.title}</span>
                  </a>
                </InstaTeaserTitle>
                

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
