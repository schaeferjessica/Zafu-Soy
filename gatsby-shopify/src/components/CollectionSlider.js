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

const CollectionSliderHeader = styled.h2`
  ${headerSpace}
`

const CollectionSliderInner = styled.div`
  .Glide-leftArrow,
  .Glide-rightArrow  {
    padding: 3px;
    color: var(--color-gray);
    background-color: #EEEEEE5C;

    svg {
      width: 40px;
      height: 16px;
    }
  }

  .Glide-leftArrow  {
    left: 1%;
  }

  .Glide-rightArrow  {
    right: 3%;
  }

  .glide__slides {
    margin-top: 0px;
  }

  button {
    top: 45%;
    text-align: left;
  }
`

const CollectionSliderTitle = styled.h3`
  margin-top: 20px;
`

const CollectionSliderLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
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
  )

  return (
    <CollectionSliderComponent id="collections">

      {/* COLLECTION SLIDER HEADER */}

      <CollectionSliderHeader>
        <Link to="/collection/frontpage" className="link-hover">
          <span>{contentfulCollectionSlider.header}</span>
        </Link>
      </CollectionSliderHeader>

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
              <div key={`ccollectionslider-${index}`}>
                {/* COLLECTION SLIDER LINK */}
                <CollectionSliderLink to={post.link} rel="noreferrer">
                  {/* COLLECTION SLIDER IMAGE */}
                  <GatsbyImage image={pluginImage} alt={post.image.title} />
                  {/* COLLECTION SLIDER TITLE */}
                  <CollectionSliderTitle>{post.title}</CollectionSliderTitle>
                  {/* COLLECTION SLIDER TEXT */}
                  <CollectionSliderText>{post.image.description}</CollectionSliderText>
                </CollectionSliderLink>
              </div>
            )
          })}
        </Glide>
      </CollectionSliderInner>
    </CollectionSliderComponent>
  )
}

export default CollectionSlider
