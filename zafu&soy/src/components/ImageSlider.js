// react
import React, {useRef, useEffect} from 'react'

// gatsby
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// emotion
import styled from '@emotion/styled/macro';

// components
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import Lightbox from '../utils/photoswipe/Lightbox';

// styles
import { container, moduleSpace, headerSpace } from '../styles/containers'


// IMAGE SLIDER 

const ImageSliderContainer = styled.div`
  ${moduleSpace}

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
  ${headerSpace}
  ${container}
  
  display: flex;
  justify-content: space-between;
  align-content: center;
`


// IMAGE SLIDER CAPTION

const ImageSliderCaption = styled.div`
  margin-top: 20px;
`


// LIGHTBOX

const LightboxButton = styled.div`
  text-align: left;
  width: 100%;
`


/* IMAGE SLIDER */

const ImageSlider = ({images}) => {
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    new Lightbox(containerRef.current, {
      selector: '.lightbox-toggle',
    }).init();
  }, []);


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
      <ImageSliderContainer ref={containerRef}>

          {/* IMAGE SLIDER TOP */}
          <ImageSliderTop>
          {/* IMAGE SLIDER HEADER */}
          <h2>gallery</h2>

          {/* IMAGE SLIDER BULLETS */}
          <ol className="bullets">
          {images.map((_, index) => (
            <li key={`image-slider-bullet-${index}`} className="bullet">
              <button className="bullet-button" onClick={(event) => handleBulletClick(event, index)}>
                <span className="sr-only">jump to slide {index}</span>
              </button>
            </li>
          ))}
          </ol>
        </ImageSliderTop>
        
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
                <GatsbyImage 
                  image={pluginImage} 
                  alt=""
                  className="image-hover" 
                />

                {/* IMAGE SLIDER CAPTION */}
                <ImageSliderCaption className="caption-regular">{image.description}</ImageSliderCaption>
              </LightboxButton>
            )
          })}
        </Glide>
      </ImageSliderContainer>
  )
}

export default ImageSlider;
