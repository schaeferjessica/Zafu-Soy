// react
import React, {useRef, useEffect} from 'react'

// gatsby
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

// components
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container, moduleSpace, headerSpace }  from '../styles/containers'


const CollectionSliderComponent = styled.div`
  ${moduleSpace}
`

// COLLECTION SLIDER TOP

const CollectionSliderTop = styled.div`
  ${container}
  ${headerSpace}

  display: flex;
  justify-content: space-between;
  align-content: center;
`


const CollectionSliderInner = styled.div`
  .glide__slides {
    margin: 0;
  }

  .Glide-leftArrow,
  .Glide-rightArrow  {
    display: none;
  }
`

const CollectionSliderContext = styled.div`
  margin-left: 18px;

  @media ${breakpoint.mobile} { 
    margin-left: 3px;
  }
`

const CollectionSliderTitle = styled.p`
  margin-top: 20px;
`



/* COLLECTION SLIDER */

const CollectionSlider = () => {
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  const {contentfulCollectionSlider} = useStaticQuery(
    graphql`
    query {
      contentfulCollectionSlider {
        header
          sliderItems {
            title
            link
            image {
              gatsbyImageData
              title
              description
            }
          }
        }
      }
    `
  );


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
    bullets[0].classList.add('is-active');

    sliderRef.current.on('run', function() {
      // reset bullets
      bullets.forEach(bullet => bullet.classList.remove('is-active'));

      // set active clicked bullet
      bullets[sliderRef.current.index].classList.add('is-active');
    })
  }, [])


  return (
    <CollectionSliderComponent id="collections" ref={containerRef}>

      {/* COLLECTION SLIDER TOP */}
      <CollectionSliderTop>

       {/* COLLECTION SLIDER HEADER */}
        <h2>
          <Link to="/collection/frontpage" className="link-hover">
            <span>{contentfulCollectionSlider.header}</span>
          </Link>
        </h2>

        {/* COLLECTION SLIDER BULLETS */}
        <ol className="bullets">
          {contentfulCollectionSlider.sliderItems.map((_, index) => (
            <li key={`bullet-${index}`} className="bullet">
              <button className="bullet-button" onClick={(event) => handleBulletClick(event, index)}>
                <span className="sr-only">jump to slide {index}</span>
              </button>
            </li>
          ))}
          </ol>
      </CollectionSliderTop>

      {/* COLLECTION SLIDER INNER */}
      <CollectionSliderInner>
          <Glide
            ref={sliderRef}
            type="slider"
            perView={3}
            startAt={0}
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
          {contentfulCollectionSlider.sliderItems.map((post, index) => {
            const pluginImage = getImage(post.image.gatsbyImageData);

            return (
              <div key={`collectionslider-${index}`}>
                
                <Link to={post.link} rel="noreferrer">
                  {/* COLLECTION SLIDER IMAGE */}
                  <GatsbyImage 
                    image={pluginImage} 
                    alt={post.image.title}
                    className="image-hover"
                   />
                </Link>

                <CollectionSliderContext>
                  {/* COLLECTION SLIDER TITLE */}
                  <CollectionSliderTitle>
                    <Link to={post.link} className="link-hover" rel="noreferrer">
                      <span>{post.title}</span>
                    </Link>
                  </CollectionSliderTitle>

                  {/* COLLECTION SLIDER TEXT */}
                  <p>{post.image.description}</p>
                </CollectionSliderContext>
                
              </div>
            )
          })}
        </Glide>
      </CollectionSliderInner>
    </CollectionSliderComponent>
  )
}

export default CollectionSlider
