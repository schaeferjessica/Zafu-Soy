// react
import React, {useRef, useEffect} from 'react'

// gatsby
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// contentful
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// components
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';

// emotion
import styled from '@emotion/styled/macro';

// styles
import { container, moduleSpace, headerSpace }  from '../styles/containers'


// INSTA TEASER

const InstaTeaserContainer = styled.section`
  ${moduleSpace}
`


// INSTA TEASER TOP

const InstaTeaserTop = styled.div`
  ${container}
  ${headerSpace}

  display: flex;
  justify-content: space-between;
  align-content: center;
`


// INSTA TEASER INNER

const InstaTeaserInner = styled.div`
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
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const containerRef = useRef(null);
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

  const handleBulletClick = (event, index) => {
    const bullets = $$('.bullet-button', containerRef.current);

    // reset bullets
    bullets.forEach(bullet => bullet.classList.remove('is-active'));

    // set clicked bullet to active
    event.target.classList.add('is-active');

    // let slider jump to bullet target
    sliderRef.current.go(`=${index}`);
  };
  
  useEffect(() => {
    const bullets = $$('.bullet-button', containerRef.current);
    
    // reset bullets
    bullets.forEach(bullet => bullet.classList.remove('is-active'));

    // set active default bullet
    bullets[1].classList.add('is-active');

    sliderRef.current.on('run', function() {
      // reset bullets
      bullets.forEach(bullet => bullet.classList.remove('is-active'));

      // set active clicked bullet
      bullets[sliderRef.current.index].classList.add('is-active');
    })
  }, [])

  return (
    <InstaTeaserContainer ref={containerRef}>

    {/* INSTA TEASER TOP */}
    <InstaTeaserTop>
      {/* INSTA TEASER HEADER */}
      <h2>
        <Link to="https://www.instagram.com/yayoi.shop/" target="_blank" rel="noopener noreferrer" className="link-hover">
          <span>{contentfulInstagram.heading}</span>
        </Link>
      </h2>

      {/* INSTA TEASER BULLETS */}
      <ol className="bullets">
      {contentfulInstagram.instagramPost.map((_, index) => (
        <li key={`bullet-${index}`} className="bullet">
          <button className="bullet-button" onClick={(event) => handleBulletClick(event, index)}>
            <span className="sr-only">jump to slide {index}</span>
          </button>
        </li>
      ))}
      </ol>
    </InstaTeaserTop>

      {/* INSTA TEASER INNER */}

      <InstaTeaserInner>
        <Glide
          ref={sliderRef}
          type="slider"
          perView={3}
          startAt={1}
          breakpoints={{
            1200: {
              perView: 2,
              gap: 40,
              peek: {
                before: 75,
                after: 75,
              }
            },
            800: {
              perView: 2,
              gap: 30,
              peek: {
                before: 70,
                after: 70,
              }
            },
            500: {
              perView: 1,
              gap: 20,
              peek: {
                before: 30,
                after: 30,
              }
            }
          }}
          gap={50}
          bound={true}
          peek={{
            before: 150,
            after: 150,
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
