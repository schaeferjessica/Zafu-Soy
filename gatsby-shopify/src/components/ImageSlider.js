import React, {useRef, useEffect} from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled/macro';
import Glide from 'react-glidejs';
import { breakpoint, headerSpace } from '../utils/styles'
import { Link, } from 'gatsby'
import 'react-glidejs/dist/index.css';
import Lightbox from '../utils/photoswipe/Lightbox';


// IMAGE SLIDER 

const ImageSliderContainer = styled.div`
    .glide__slides {
    margin: 0;
  }

  .Glide-leftArrow,
  .Glide-rightArrow  {
    display: none;
  }
`

// IMAGE SLIDER TOP

const ImageSliderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`

// IMAGE SLIDER HEADER

const ImageSliderHeader = styled.h2`
  ${headerSpace}
`

// IMAGE SLIDER NAVI

const ImageSliderNavi = styled.div`
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

const ImageSliderButton = styled.div`
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


// LIGHTBOX

const LightboxButton = styled.div`
  text-align: left;
  width: 100%;
`


/* IMAGE SLIDER */

const ImageSlider = ({images}) => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    new Lightbox(containerRef.current, {
      selector: '.lightbox-toggle',
    }).init();
  }, []);

  return (
      <ImageSliderContainer ref={containerRef}>

          {/* IMAGE SLIDER TOP */}
          <ImageSliderTop>
          {/* IMAGE SLIDER HEADER */}
          <ImageSliderHeader>
            <Link to="">
              <span>Detail Images</span>
            </Link>
          </ImageSliderHeader>

          {/* IMAGE SLIDER NAVI */}
          <ImageSliderNavi>
            <ImageSliderButton onClick={() => sliderRef.current.go('<')}>
              <svg width="1024" height="1024" viewBox="0 0 1024 1024">
                <path d="M10.24 486.4c0 2.56 0 2.56 0 0-15.36 15.36-15.36 38.4 0 51.2l325.12 325.12c0 0 0 0 0 0 15.36 15.36 35.84 15.36 51.2 0 12.8-15.36 12.8-35.84 0-51.2l-261.12-261.12h865.28c17.92 0 33.28-15.36 33.28-33.28 0-20.48-15.36-38.4-33.28-38.4h-865.28l261.12-263.68c2.56-2.56 2.56-2.56 5.12-5.12 12.8-15.36 10.24-38.4-5.12-51.2s-38.4-10.24-51.2 5.12l-325.12 322.56z"></path>
              </svg>
            </ImageSliderButton>
            <ImageSliderButton onClick={() => sliderRef.current.go('>')}>
              <svg width="1024" height="1024" viewBox="0 0 1024 1024">
                <path d="M688.64 163.84c-12.8-15.36-35.84-17.92-51.2-5.12s-17.92 35.84-5.12 51.2c2.56 2.56 2.56 2.56 5.12 5.12l261.12 261.12h-862.72c-20.48 0-35.84 17.92-33.28 38.4 0 17.92 15.36 33.28 33.28 33.28h865.28l-263.68 263.68c-12.8 15.36-12.8 35.84 0 51.2 15.36 15.36 35.84 15.36 51.2 0 0 0 0 0 0 0l325.12-325.12c15.36-12.8 15.36-35.84 0-51.2 0 0 0 0 0 0l-325.12-322.56z"></path>
              </svg>
            </ImageSliderButton>
          </ImageSliderNavi>
        </ImageSliderTop>
        
        <Glide
          ref={sliderRef}
          type="slider"
          perView={1}
          breakpoints={{
            1200: {
              perView: 1,
              gap: 20,
              peek: {
                before: 0,
                after: 200,
              }
            },
            500: {
              perView: 1,
              gap: 20,
              peek: {
                before: 0,
                after: 100,
              }
            }
          }}
          gap={30}
          bound={true}
          peek={{
            before: 0,
            after: 300,
          }}
          slideClassName="slider__frame"
        >

          {/* LIGHTBOX */}

          {images.map((image, index) => {
            const pluginImage = getImage(image.gatsbyImageData);
            return (
              <LightboxButton
                key={`image-${index}`}
                className='image-heading lightbox-toggle' 
                aria-label="Bild in einem Leuchtkasten öffnen"
                data-size={`${image.file.details.image.width}x${image.file.details.image.height}`}
                data-src={image.file.url}
                data-title={image.altText || ''}
                data-figcaption="" 
                data-copyright=""
              >
                <GatsbyImage image={pluginImage} alt="" />
                <small>{image.description}</small>
              </LightboxButton>
            )
          })}
        </Glide>
      </ImageSliderContainer>
  )
}

export default ImageSlider;
