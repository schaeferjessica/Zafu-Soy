import React from 'react'
import styled from '@emotion/styled/macro'
import { useStaticQuery, graphql, Link  } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { breakpoint, container, moduleSpace, headerSpace } from '../utils/styles'

const FeaturedComponent = styled.div`
  ${moduleSpace}
  ${container}
`

// FEATURED HEADING

const FeaturedHeading = styled.h2 `
    ${headerSpace}
`

// FEATURED INNER

const FeaturedInner = styled.div `
    display: flex;
    align-items: center;

    @media ${breakpoint.mobile} {
      display: block;
    }
`

// FEATURED LINK

const FeaturedLink = styled(Link)`
    &:hover {
        text-decoration: none;
    }    
`

// FEATURED CONTEXT

const FeaturedContext = styled.div`
    width: 50%;
    margin-left: 5%;

    @media ${breakpoint.mobile} {
      width: 100%;
      margin-left: 0;
    }
`

// FEATURED TITLE

const FeaturedTitle = styled.h3 `
    margin-top: 20px;
`

//  FEATURED TEXT 

const FeaturedText = styled.div`
    margin-top: 5px;
    font-size: 26px;

    @media ${breakpoint.mobile} {
        width : 100%;
        font-size: 18px;
    }
`

//  FEATURED SMALL

const FeaturedSmall = styled.small`
  border-radius: 18px;
  height: 30px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid var(--color-gray);
  line-height: 28px;
  margin-right: 12px;
  margin-top: 10px;
  display: inline-block;
  margin-top: 15px;

  &:hover {
    border: 1px solid var(--color-blue);
  }
`


const Featured = () => {

const {contentfulFeatured} = useStaticQuery(
    graphql`
    query {
      contentfulFeatured {
        title
        heading
        link
        text {
          text
        }
        image {
          gatsbyImageData (width: 500)
        }
      }
    }
      `
    )

    const image = getImage(contentfulFeatured.image)
      

  return (
    <FeaturedComponent>
        {/* FEATURED HEADING H2 */}
        <FeaturedHeading>{contentfulFeatured.heading}</FeaturedHeading>

        {/* FEATURED INNER */}
        <FeaturedInner>
          {/* FEATURED LINK */}
          <FeaturedLink to={contentfulFeatured.link}>
            {/* FEATURED IMAGE */}
              <GatsbyImage
                image={image}
              />
          </FeaturedLink>

          {/* FEATURED CONTEXT */}
          <FeaturedContext>
            {/* FEATURED TITLE H3 */}
            <FeaturedLink to={contentfulFeatured.link}>
              <FeaturedTitle>{contentfulFeatured.title}</FeaturedTitle>
            </FeaturedLink>

            {/* FEATURED TEXT */}
            <FeaturedText>{contentfulFeatured.text.text}</FeaturedText>

            {/* FEATURED LINK */}
            <FeaturedLink to={contentfulFeatured.link}>
              <FeaturedSmall>Shop now</FeaturedSmall>
            </FeaturedLink>
          </FeaturedContext>

        </FeaturedInner>
    </FeaturedComponent>
  )
}

export default Featured 