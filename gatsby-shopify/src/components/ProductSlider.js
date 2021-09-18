// react
import React, { useRef, useEffect } from 'react'

// components
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';

// gatsby
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

// emotion
import styled from '@emotion/styled/macro';

// styles
import breakpoint from '../styles/breakpoints'
import { container, headerSpace, moduleSpace } from '../styles/containers'


// PRODUCT SLIDER

const ProductSliderContainer = styled.div`
  ${moduleSpace}

  .glide__slides {
    margin: 0;
  }

  .Glide-leftArrow,
  .Glide-rightArrow  {
    display: none;
  }
`

// PRODUCT SLIDER TOP

const ProductSliderTop = styled.div`
  ${headerSpace}
  ${container}

  display: flex;
  justify-content: space-between;
  align-content: center;
`

// PRODUCT SLIDER ITEM

const ProductSliderItem = styled.div`
  a:hover {
    .image-product:not(:only-child) {
      opacity: 0;
    }

    .image-detail {
      opacity: 1;
    }
  }

  .image-detail {
    opacity: 0;
  }

  .image-product,
  .image-detail {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 200ms ease-in-out;
  }
`

// PRODUCT SLIDER LINK

const ProductSliderLink = styled(Link)`
  position: relative;
  padding-right: 25px;
  display: block;
`

const ProductSliderImage = styled.div`
  width: 100%;
`

// PRODUCT SLIDER SOLD

const ProductSliderSold = styled.small`
  transform: rotate(-90deg);
  position: absolute;
  bottom: 0;
  left: 100%;
  transform-origin: left bottom;
  white-space: nowrap;
`

// PRODUCT SLIDER TITLE

const ProductSliderTitle = styled.p`
  margin-top: 20px;
  margin-bottom: 0px; 
  margin-left: 18px;

  @media ${breakpoint.mobile} { 
    margin-left: 3px;
  }
`


const ProductSlider = ({products}) => {
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const sliderRef = useRef(null);
  const containerRef = useRef(null);


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
      <ProductSliderContainer ref={containerRef}>

        {/* PRODUCT SLIDER TOP */}
        <ProductSliderTop>
          {/* PRODUCT SLIDER HEADER */}
          <h2>
            <Link to="/collection/frontpage" className="link-hover">
              <span>discover more</span>
            </Link>
          </h2>

          {/* PRODUCT SLIDER BULLETS */}
          <ol className="bullets">
          {products.map((_, index) => (
            <li key={`production-slider-bullet-${index}`} className="bullet">
              <button className="bullet-button" onClick={(event) => handleBulletClick(event, index)}>
              <span className="sr-only">jump to slide {index}</span>
              </button>
            </li>
          ))}
          </ol>
        </ProductSliderTop>

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
          {products.map(
              ({
                  id,
                  handle,
                  title,
                  images,
                  variants: [firstVariant],
                },
              ) => {
                return (

                  <ProductSliderItem key={id}>

                  {/* PRODUCT SLIDER ITEM*/}

                    <ProductSliderLink to={`/product/${handle}/`}>

                      <ProductSliderImage>
                        {images.map((image) => {
                          const pluginImage = getImage(image.localFile)
                          return image.localFile && (
                            <GatsbyImage 
                              image={pluginImage} 
                              alt={handle} 
                              key={image.id} 
                              className="image-hover"
                            />
                          )
                        })}
                      </ProductSliderImage>

                      {/* PRODUCT SLIDER SOLD */}
                      {firstVariant.availableForSale ? '' : <ProductSliderSold>will be back soon</ProductSliderSold>}

                    </ProductSliderLink>

                    {/* PRODUCT SLIDER TITLE */}

                    <ProductSliderTitle>
                      <Link to={`/product/${handle}/`} className="link-hover">
                        <span>{title}</span>
                      </Link>
                    </ProductSliderTitle>

                  </ProductSliderItem>
                )
              }
            )}
        </Glide>
      </ProductSliderContainer>
  )
}

export default ProductSlider;
