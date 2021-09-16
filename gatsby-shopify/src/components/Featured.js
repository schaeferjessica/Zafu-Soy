// react
import React from 'react'

// gatsby
import { useStaticQuery, graphql, Link  } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container, moduleSpace, headerSpace }  from '../styles/containers'


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
    justify-content: space-between;

    @media ${breakpoint.tablet} {
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
    width: 60%;
    margin-left: 5%;

  @media ${breakpoint.tablet} {
    width: 100%;
    margin-left: 0;
    margin-top: 20px;
  }
`

//  FEATURED TEXT 

const FeaturedText = styled.div`
  font-size: 26px;

  @media ${breakpoint.tablet} {
    font-size: 18px;
  }
`

//  FEATURED SPAN

const FeaturedSpan = styled.span`
  margin-top: 15px;
`


const Featured = () => {

const {contentfulFeatured} = useStaticQuery(
    graphql`
    query {
      contentfulFeatured {
        heading
        link
        text {
          text
        }
        image {
          gatsbyImageData (width: 1000)
        }
      }
    }
      `
    )

    const image = getImage(contentfulFeatured.image)
      

  return (
    <FeaturedComponent>
        {/* FEATURED HEADING H2 */}
        
        <FeaturedHeading>
          <Link to={contentfulFeatured.link} className="link-hover">
            <span>{contentfulFeatured.heading}</span>
          </Link>
        </FeaturedHeading>

        {/* FEATURED INNER */}
        <FeaturedInner>
          {/* FEATURED LINK */}
          <FeaturedLink to={contentfulFeatured.link}>
            {/* FEATURED IMAGE */}
              <GatsbyImage
                image={image}
                alt={contentfulFeatured.heading}
                className="image-hover"
              />
          </FeaturedLink>

          {/* FEATURED CONTEXT */}
          <FeaturedContext>

            {/* FEATURED TEXT */}
            <FeaturedText>{contentfulFeatured.text.text}</FeaturedText>

            {/* FEATURED LINK */}
            <FeaturedLink to={contentfulFeatured.link} className="link-hover">
              <FeaturedSpan>Shop now</FeaturedSpan>
            </FeaturedLink>
          </FeaturedContext>

        </FeaturedInner>
    </FeaturedComponent>
  )
}

export default Featured 