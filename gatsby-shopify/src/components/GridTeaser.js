// react
import React from 'react'

// gatsby
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// emotion
import styled from '@emotion/styled/macro'

// contentful
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";

// styles
import breakpoint from '../styles/breakpoints'
import { container, moduleSpace, headerSpace } from '../styles/containers'



const GridTeaserComponent = styled.div`
  ${moduleSpace}
  ${container}

  display: flex;
  justify-content: space-between;

  @media ${breakpoint.mobile} {
    display: block;
  }
`

// GRID TEASER ITEM

const GridTeaserItem = styled.div`
  width: 45%;

  @media ${breakpoint.mobile} {
    width: 100%;
  }

  &:last-child {
    margin-top: 70px;
  }
`

// GRID TEASER TITLE

const GridTeaserTitle = styled.h3`
    ${headerSpace}
`

//  GRID TEASER TEXT 

const GridTeaserText = styled.div`
  margin-top: 20px;
`


const GridTeaser = () => {

const {allContentfulGridItem} = useStaticQuery(
    graphql`
      query {
        allContentfulGridItem {
          nodes {
            title
            link
            text {
              raw
            }
            image {
              gatsbyImageData
            }
          }
        }
      }
      `
    );

    const Small = ({ children }) => <p className="caption-regular">{children}</p>;
    const Bold = ({ children }) => <b className="caption-bold">{children}</b>;
    const options = {
      renderMark: {
        [MARKS.BOLD]: text => <Bold>{text}</Bold>,
      },
      renderNode: {
        [BLOCKS.HEADING_6]: (_, children) => <Small>{children}</Small>
      },
    };
      

  return (
    <GridTeaserComponent>
      {allContentfulGridItem.nodes.map((gridItem, index) => {
        const image = getImage(gridItem.image)
        return (
          <GridTeaserItem key={`grid-item-${index}`}>
            {/* GRID TEASER TITLE H2 */}
            <GridTeaserTitle>
              <Link to={gridItem.link} className="link-hover">
                <span>{gridItem.title}</span>
              </Link>
            </GridTeaserTitle>

            {/* GRID TEASER IMAGE */}
            <Link to={gridItem.link}>
              <GatsbyImage
                image={image}
                alt={gridItem.title}
                className="image-hover"
              />
            </Link>

            {/* GRID TEASER TEXT */}
            {/* <GridTeaserText>{documentToReactComponents(JSON.parse(gridItem.text.raw))}</GridTeaserText> */}
            <GridTeaserText>{renderRichText(gridItem.text, options)}</GridTeaserText> 
          </GridTeaserItem>
        )
      })}
    </GridTeaserComponent>
 )
}

export default GridTeaser