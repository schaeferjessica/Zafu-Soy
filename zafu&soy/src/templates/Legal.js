// react
import React, { useState, useEffect } from 'react'
import Seo from '~/components/seo'

// gatsby
import { Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// components
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'

// emotion
import styled from '@emotion/styled/macro'

// contentful
import { BLOCKS } from "@contentful/rich-text-types";
import { renderRichText } from "gatsby-source-contentful/rich-text";
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// styles
import breakpoint from '../styles/breakpoints'
import {container} from '../styles/containers'


// LEGAL

const Legal = styled.div`
  ${container};
  margin-top: 120px;

  @media ${breakpoint.tablet} { 
    margin-top: 100px;
  }
`

// LEGAL IMAGE

const LegalImage = styled.div`
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

// LEGAL TEXT

const LegalText = styled.div`
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
  }

  p strong {
    margin-top: 30px;
    display: block;

    @media ${breakpoint.mobile} { 
      margin-top: 20px;
    }
  }

  ul {
    padding: 0px;
    margin-bottom: 0px;
  }

  .paragraph-margin {
    margin-top: 30px;

    @media ${breakpoint.mobile} { 
      margin-top: 25px;
    } 
  }
`

// LEGAL LINK

const LegalLink = styled(Link)`
  margin-top: 50px;
  display: inline-block;
`



const LegalPage = (data) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll--overlay');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll--overlay');
    }
  }, [isOpen]);

    // contentful renderRichText options
    const Margin= ({ children }) => <p className="paragraph-margin">{children}</p>;
    const options = {
      renderNode: {
        [BLOCKS.HEADING_5]: (_, children) => <Margin>{children}</Margin>,
      },
    };


  return <Legal>
    <Seo title={data.pageContext.slug} />
    <Navigation onOrderButtonClick={() => setIsOpen(!isOpen)} hasScroll={false} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>

    {/* LEGAL IMAGE */}
    <LegalImage>
      {data.pageContext.images ? data.pageContext.images.map((image, index) => 
        <GatsbyImage 
          key={`image-${index}`} 
          image={getImage(image.gatsbyImageData)} 
          alt={image.title || ''}
          className="image-hover"
        />
      ) : ''}
    </LegalImage>

    {/* LEGAL TEXT*/}
    <LegalText>
     {renderRichText(data.pageContext.text, options)}
    </LegalText>

    {/* LEGAL LINK*/}
    <LegalLink to="/" className="link-hover">
      <span>Take me Back</span>
    </LegalLink>
  </Legal>
}

export default LegalPage