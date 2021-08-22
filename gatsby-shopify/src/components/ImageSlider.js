import React, {useRef} from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import styled from '@emotion/styled';
import { breakpoint, container, moduleSpace } from '../utils/styles';
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';


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
`

const ImageSlider = ({images}) => {
  const gliderRef = useRef(null);

  return (
      <InstaTeaserInner>
        <Glide
          ref={gliderRef}
          type="slider"
          perView={2}
          breakpoints={{
            800: {
              perView: 2,
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
              <div key={`image-${index}`}>
                <GatsbyImage image={pluginImage} alt="" />
                <p>{image.description}</p>
              </div>
            )
          })}
        </Glide>
      </InstaTeaserInner>
  )
}

export default ImageSlider;
