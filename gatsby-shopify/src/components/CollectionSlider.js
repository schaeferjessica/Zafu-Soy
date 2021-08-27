import React, {useRef} from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled/macro'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { breakpoint, container, moduleSpace, headerSpace } from '../utils/styles'
import Glide from 'react-glidejs';
import 'react-glidejs/dist/index.css';


const CollectionSliderComponent = styled.div`
  ${moduleSpace}
  ${container}
`

const CollectionSliderHeader = styled.h2`
  ${headerSpace}
`

const CollectionSliderInner = styled.div`
  margin-top: 5px;
`

const CollectionSliderTitle = styled.h3`
  margin-top: 5px;
`



{/* COLLECTION SLIDER */}

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
            }
          }
        }
      }
    `
  )

  return (
    <CollectionSliderComponent>

      {/* COLLECTION SLIDER HEADER */}

      <CollectionSliderHeader>
        <h2>{contentfulCollectionSlider.header}</h2>
      </CollectionSliderHeader>

      {/* COLLECTION SLIDER INNER */}

      <CollectionSliderInner>
        <Glide
          ref={sliderRef}
          type="slider"
          perView={4}
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
          {contentfulCollectionSlider.sliderItems.map(post => {
            const pluginImage = getImage(post.image.gatsbyImageData);

            return (
              <div key={post.id}>
                <a href={post.link} rel="noreferrer">
                  <GatsbyImage image={pluginImage} alt={post.image.title} />
                  {/* COLLECTION SLIDER TITLE */}
                  <CollectionSliderTitle>{post.title}</CollectionSliderTitle>
                </a>
              </div>
            )
          })}
        </Glide>
      </CollectionSliderInner>
    </CollectionSliderComponent>
  )
}

export default CollectionSlider
