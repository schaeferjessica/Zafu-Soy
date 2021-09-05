import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import styled from '@emotion/styled/macro'
import { breakpoint, container } from '../utils/styles'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Shower from '../utils/shower';
import { $$ } from '../utils/dom';

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
    font-family: IBM Plex Serif;

    @media ${breakpoint.mobile} { 
      margin-top: 20px;
    }
  }

  .accordion {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .accordion__button {
    display: block;
    position: relative;
    text-align: left;
    padding: 0;
    margin: 0 0 0 20px;
  }

  .accordion__button::before {
    content: "↓";
    position: absolute;
    left: -20px;
    transition: transform 500ms ease-in-out;
  }

  .accordion__button[aria-expanded="true"]::before {
    transform: rotate(180deg);
  }

  .accordion__panel {
    height: 0;
    overflow: hidden;
  }

  .accordion__panel p {
    margin-left: 20px;
  }
`

// LEGAL LINK

const LegalLink = styled(Link)`
  margin-top: 50px;
  display: inline-block;
`



const LegaPage = (data) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll--overlay');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll--overlay');
    }
  }, [isOpen]);

  useEffect(() => {
    const accordionButtons = $$('.accordion__button')

   
    if(accordionButtons.length) {
      accordionButtons.forEach(accordionButton => {
        const target = accordionButton.nextElementSibling;
  
          new Shower({
            target: target,
            handler: accordionButton,
            easing: 'ease',
            duration: 350,
            initOpened: false,
            openClassName: 'is-open',
          }).init();
      });
    };
  }, []);

return <Legal>
    <Seo title={data.pageContext.slug} />
    <Navigation onOrderButtonClick={() => setIsOpen(!isOpen)} hasScroll={false} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>

    {/* LEGAL IMAGE */}
    <LegalImage>
      {data.pageContext.images ? data.pageContext.images.map((image, index) => <GatsbyImage key={`image-${index}`} image={getImage(image.gatsbyImageData)} alt={image.title || ''}/>) : ''}
    </LegalImage>

    {/* LEGAL TEXT*/}
    <LegalText>
     {documentToReactComponents(JSON.parse(data.pageContext.text))}
    </LegalText>

    {/* LEGAL LINK*/}
    <LegalLink to="/" className="link-hover">
      <span>Take me Back</span>
    </LegalLink>
  </Legal>
}

export default LegaPage