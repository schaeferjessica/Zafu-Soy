import React, {useRef, useEffect} from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled/macro';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import Lightbox from '../utils/photoswipe/Lightbox';

const InstaTeaserInner = styled.div`
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

  .glide__slides {
    margin-top: 0px;
  }

  button {
    top: 45%;
    text-align: left;
  }
`

const ImageSlider = ({images}) => {
  const gliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    new Lightbox(containerRef.current, {
      selector: '.lightbox-toggle',
    }).init();
  }, []);

  return (
      <InstaTeaserInner ref={containerRef}>
        <Glide
          ref={gliderRef}
          type="slider"
          perView={2}
          breakpoints={{
            1200: {
              perView: 1,
              gap: 30,
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
          gap={40}
          bound={true}
          peek={{
            before: 0,
            after: 200,
          }}
          slideClassName="slider__frame"
        >
          {images.map((image, index) => {
            const pluginImage = getImage(image.gatsbyImageData);
            return (
              <button
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
                <p>{image.description}</p>
              </button>
            )
          })}
        </Glide>
      </InstaTeaserInner>
  )
}

export default ImageSlider;
