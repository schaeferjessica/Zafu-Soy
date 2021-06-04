import React, { useState, useEffect } from 'react'
import { Link as LinkTo } from 'gatsby'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import styled from '@emotion/styled'
import { breakpoint, container } from '../utils/styles'
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Legal = styled.div`
  ${container};
  margin-top: 150px;

  @media ${breakpoint.tablet} { 
    margin-top: 100px;
  }
`
const TextWrapper = styled.div`
  margin-top: 50px;
  width: 70%;

  @media ${breakpoint.tablet} { 
    width: 100%;
  }

  @media ${breakpoint.mobile} { 
    margin-top: 30px;
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

    @media ${breakpoint.mobile} { 
      margin-top: 20px;
    }
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
    margin-top: 50px;

    @media ${breakpoint.mobile} { 
      margin-top: 30px;
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

const ImageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
    column-gap: 20px;

    @media ${breakpoint.tablet} { 
      grid-template-columns: 1fr 1fr 1fr;
    }

    @media ${breakpoint.mobile} { 
      grid-template-columns: 1fr 1fr;
    }
`

const SecondPage = (data) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll');
    }
  }, [isOpen]);
  
  return <Legal>
    <Seo title={data.pageContext.title} />
    <Navigation onOrderButtonClick={() => setIsOpen(!isOpen)} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>
    <ImageWrapper>
      {data.pageContext.images.length ? data.pageContext.images.map(image => <GatsbyImage image={getImage(image.image)} alt={image.altText || ''}/>) : ""}
    </ImageWrapper>
    <TextWrapper>
     <MDXRenderer>{data.pageContext.content}</MDXRenderer>
    </TextWrapper>
    <Link to="/">
      <Span data-hover="Take me Back">Take me Back</Span>
    </Link>
  </Legal>
}

export default SecondPage