import React from 'react'
import { Link as LinkTo } from 'gatsby'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import styled from '@emotion/styled'
import { breakpoint, container } from '../utils/styles'
import { MDXRenderer } from 'gatsby-plugin-mdx';

const Legal = styled.div`
  ${container};
  margin-top: 150px;

  @media ${breakpoint.tablet} { 
    margin-top: 100px;
  }

  p {
    margin-top: 10px;
    font-size: 15px;

    @media ${breakpoint.mobile} { 
      font-size: 14px;
    }
  }

  p strong {
    margin-top: 30px;
    display: block;
    font-family: IBM Plex Serif;
  }
`
const Link = styled(LinkTo)`
    font-family: 'IBM Plex Sans';
    border: 1px solid black;
    padding: 15px 30px;
    background-color: transparent;
    position: relative;
    display: inline-block;
    overflow: hidden;
    cursor: pointer;
    margin-top: 30px;

    @media ${breakpoint.desktop} { 
      margin-top: 20px;
    }

    &:hover span {
        transform: translateY(-160%);
    }
`

const Span = styled.span`
    position: relative;
    display: inline-block;
    transition: transform .3s;

&::before {
    content: attr(data-hover);
    position: absolute;
    top: 160%;
    transform: translate3d(0, 0, 0);
    }
`

const SecondPage = (data) => {
return <Legal>
    <Seo title={data.pageContext.title} />
    <Navigation />
    <MDXRenderer>{data.pageContext.content}</MDXRenderer>
    <Link to="/">
      <Span data-hover="Take me Back">Take me Back</Span>
    </Link>
  </Legal>
}

export default SecondPage