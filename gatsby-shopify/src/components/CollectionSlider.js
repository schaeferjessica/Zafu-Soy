import React, {useRef} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled/macro'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { breakpoint, container, moduleSpace, headerSpace } from '../utils/styles'
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';
import { Link } from 'gatsby'


const CollectionSliderComponent = styled.div`
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

// COLLECTION SLIDER TOP

const CollectionSliderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`

// COLLECTION SLIDER HEADER

const CollectionSliderHeader = styled.h2`
  ${headerSpace}
`

// COLLECTION SLIDER NAVI

const CollectionSliderNavi = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  margin-right: 30px;
`

const CollectionSliderButton = styled.div`
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


const CollectionSliderInner = styled.div`
  text-align: center;

  .Glide-leftArrow,
  .Glide-rightArrow  {
    display: none;
  }
`

const CollectionSliderTitle = styled.h3`
  margin-top: 20px;
`

const CollectionSliderText = styled.p`
  margin-top: 5px;
`



/* COLLECTION SLIDER */

const CollectionSlider = () => {
  const sliderRef = useRef(null);
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



  return (
    <CollectionSliderComponent id="collections">

      {/* COLLECTION SLIDER TOP */}
      <CollectionSliderTop>

       {/* COLLECTION SLIDER HEADER */}
        <CollectionSliderHeader>
          <Link to="/collection/frontpage" className="link-hover">
            <span>{contentfulCollectionSlider.header}</span>
          </Link>
        </CollectionSliderHeader>

        {/* COLLECTION SLIDER NAVI */}
        <CollectionSliderNavi>
          <CollectionSliderButton onClick={() => sliderRef.current.go('<')}>
            <svg width="1024" height="1024" viewBox="0 0 1024 1024">
              <path d="M10.24 486.4c0 2.56 0 2.56 0 0-15.36 15.36-15.36 38.4 0 51.2l325.12 325.12c0 0 0 0 0 0 15.36 15.36 35.84 15.36 51.2 0 12.8-15.36 12.8-35.84 0-51.2l-261.12-261.12h865.28c17.92 0 33.28-15.36 33.28-33.28 0-20.48-15.36-38.4-33.28-38.4h-865.28l261.12-263.68c2.56-2.56 2.56-2.56 5.12-5.12 12.8-15.36 10.24-38.4-5.12-51.2s-38.4-10.24-51.2 5.12l-325.12 322.56z"></path>
            </svg>
          </CollectionSliderButton>
          <CollectionSliderButton onClick={() => sliderRef.current.go('>')}>
            <svg width="1024" height="1024" viewBox="0 0 1024 1024">
              <path d="M688.64 163.84c-12.8-15.36-35.84-17.92-51.2-5.12s-17.92 35.84-5.12 51.2c2.56 2.56 2.56 2.56 5.12 5.12l261.12 261.12h-862.72c-20.48 0-35.84 17.92-33.28 38.4 0 17.92 15.36 33.28 33.28 33.28h865.28l-263.68 263.68c-12.8 15.36-12.8 35.84 0 51.2 15.36 15.36 35.84 15.36 51.2 0 0 0 0 0 0 0l325.12-325.12c15.36-12.8 15.36-35.84 0-51.2 0 0 0 0 0 0l-325.12-322.56z"></path>
            </svg>
          </CollectionSliderButton>
        </CollectionSliderNavi>
      </CollectionSliderTop>

      {/* COLLECTION SLIDER INNER */}
      <CollectionSliderInner>
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
          {contentfulCollectionSlider.sliderItems.map((post, index) => {
            const pluginImage = getImage(post.image.gatsbyImageData);

            return (
              <div key={`collectionslider-${index}`}>
                
                <Link to={post.link} rel="noreferrer">
                  {/* COLLECTION SLIDER IMAGE */}
                  <GatsbyImage image={pluginImage} alt={post.image.title} />
                </Link>

                
                {/* COLLECTION SLIDER TITLE */}
                <CollectionSliderTitle>
                  <Link to={post.link} className="link-hover" rel="noreferrer">
                    <span>{post.title}</span>
                  </Link>
                </CollectionSliderTitle>

                {/* COLLECTION SLIDER TEXT */}
                <CollectionSliderText>{post.image.description}</CollectionSliderText>
                
              </div>
            )
          })}
        </Glide>
      </CollectionSliderInner>
    </CollectionSliderComponent>
  )
}

export default CollectionSlider
