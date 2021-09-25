// react
import React, {useEffect, useState} from 'react'

// gatsby
import { Link as LinkTo } from 'gatsby'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container, moduleSpace }  from '../styles/containers'

// utils
import aniScroll from '../utils/ani-scroll';

// FOOTER

const FooterComponent = styled.footer`
  ${moduleSpace}
  background-color: var(--color-beige);
`

const FooterInner = styled.footer`
  ${container}
  display: flex;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;

  @media ${breakpoint.mobile} { 
    flex-direction: column;
    align-items: flex-start;
    padding-top: 20px;
    padding-bottom: 20px;
  }
`


// FOOTER LINKS LEFT

const FooterLinksLeft = styled.div`
  display: flex;
`

const FooterLinksWrapper = styled.ul`
display: flex;
flex-direction: column;
list-style: none;
margin: 0;
padding: 0;

&:not(:first-of-type) {
  margin-left: 100px;

  @media ${breakpoint.desktop} { 
    margin-left: 80px;
  }

  @media ${breakpoint.tablet} { 
    margin-left: 40px;
  }
}
`

const FooterLinkExtern  = styled.a`
  margin-top: 5px;
`

const FooterLink = styled(LinkTo)`
  margin-top: 5px;
`

const FooterSpan = styled.span`
  font-size: 15px;

  @media ${breakpoint.mobile} { 
    font-size: 14px;
  }
`


// FOOTER LINKS RIGHT

const FooterLinksRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  @media ${breakpoint.mobile} { 
    margin-top: 40px;
  }
`

const FooterCredit  = styled.p`
  margin-top: 30px;
  font-size: 15px;

  @media ${breakpoint.mobile} { 
    font-size: 14px;
  }
`

const BackToTop = styled.button`
  position: fixed;
  bottom: 200px;
  right: 100px;
  color: var(--color-black);
  margin-left: 10px;
  display: none;
  justify-content: center;
  align-items: center;

  @media ${breakpoint.desktop} { 
    right: 50px;
  }

  @media ${breakpoint.tablet} { 
    right: 30px;
  }

  @media ${breakpoint.mobile} { 
    position: absolute;
    right: 0;
    bottom: inherit;
  }

  svg {
    width: 40px;
    height: 40px;
  }
  
  &.is-visible {
    display: flex;
  }
`



const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const jumpTo = () => aniScroll(0, 1000, 'easeInOutQuart');
  function handleScroll() {
    if (window.scrollY > window.innerHeight) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  return (
    <>
    <BackToTop onClick={() => jumpTo()} className={isVisible ? 'is-visible': ''}>
    <svg viewBox="0 0 40 78" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.4984 22.5C15.7746 22.5 15.9984 22.2761 15.9984 22C15.9984 21.7239 15.7746 21.5 15.4984 21.5C15.2223 21.5 14.9984 21.7239 14.9984 22C14.9984 22.2761 15.2223 22.5 15.4984 22.5Z" fill="black"/>
      <path d="M24.4984 22.5C24.7746 22.5 24.9984 22.2761 24.9984 22C24.9984 21.7239 24.7746 21.5 24.4984 21.5C24.2223 21.5 23.9984 21.7239 23.9984 22C23.9984 22.2761 24.2223 22.5 24.4984 22.5Z" fill="black"/>
      <path d="M21.4984 28.3C21.4984 27.9 21.1984 27.5 20.6984 27.5C20.3984 27.5 20.0984 27.7 19.9984 28C19.8984 27.7 19.5984 27.5 19.2984 27.5C18.8984 27.5 18.4984 27.8 18.4984 28.3C18.4984 29.1 19.1984 29.8 19.9984 29.8C20.7984 29.8 21.4984 29.2 21.4984 28.3Z" fill="black"/>
      <path d="M19.9984 15C18.7984 15 17.6984 14.5 16.8984 13.6C15.2984 14.8 12.8984 14.7 11.3984 13.2L12.0984 12.5C13.2984 13.7 15.3984 13.7 16.5984 12.5L16.9984 12.1L17.2984 12.6C17.9984 13.5 18.8984 14 19.9984 14C21.0984 14 21.9984 13.5 22.5984 12.6L22.8984 12.1L23.2984 12.5C24.4984 13.7 26.5984 13.7 27.7984 12.5L28.4984 13.2C27.0984 14.6 24.5984 14.8 22.9984 13.6C22.2984 14.5 21.1984 15 19.9984 15Z" fill="black"/>
      <path d="M25.5984 55.4H23.5984V60.9H25.5984V55.4Z" fill="black"/>
      <path d="M20.9984 55.4H18.9984V60.9H20.9984V55.4Z" fill="black"/>
      <path d="M16.4984 55.4H14.4984V60.9H16.4984V55.4Z" fill="black"/>
      <path d="M23.7984 67.6L26.6984 69.8L26.0984 70.6L23.7984 68.9L21.2984 70.9L18.6984 68.9L16.1984 70.9L13.2984 68.6L13.8984 67.8L16.1984 69.6L18.6984 67.6L21.2984 69.6L23.7984 67.6Z" fill="black"/>
      <path d="M23.7984 64L26.6984 66.2L26.0984 67L23.7984 65.2L21.2984 67.2L18.6984 65.2L16.1984 67.2L13.2984 65L13.8984 64.2L16.1984 66L18.6984 64L21.2984 66L23.7984 64Z" fill="black"/>
      <path d="M39.5984 28H29.4984V14.5H30.4984V27H38.2984L33.5984 8.1C33.4984 7.9 33.3984 7.6 33.2984 7.4C30.8984 3.5 25.6984 1 19.9984 1C14.2984 1 9.19844 3.5 6.69844 7.3C6.49844 7.5 6.39844 7.8 6.39844 8.1L1.69844 27H9.49844V14.5H10.4984V28H0.398438L5.49844 7.7C5.59844 7.4 5.69844 7.2 5.79844 6.9C8.39844 2.7 13.8984 0 19.9984 0C26.1984 0 31.8984 2.8 34.3984 7.2L34.4984 7.7L39.5984 28Z" fill="black"/>
      <path d="M31.4984 30H29.8984C27.1984 31.9 23.6984 33 19.7984 33C15.9984 33 12.3984 31.9 9.69844 30H8.09844C10.2984 31.8 13.0984 33.1 16.1984 33.7L10.9984 36.1V78H28.9984V36.1L23.5984 33.6C26.6984 33 29.3984 31.8 31.4984 30ZM27.9984 39.5V77H11.9984V39.5H27.9984Z" fill="black"/>
      </svg>
    </BackToTop>
    <FooterComponent>
        <FooterInner>

            {/* FOOTER LINKS LEFT*/}

            <FooterLinksLeft>
                <FooterLinksWrapper>
                  <li>
                    <FooterLink to="/collection/frontpage/" className="underline-hover">
                      <FooterSpan>shop</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/about/" className="underline-hover">
                      <FooterSpan>about</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/faq/" className="underline-hover">
                      <FooterSpan>FAQ</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLinkExtern href="https://www.instagram.com/yayoi.shop/" className="underline-hover" target="_blank" rel="noopener noreferrer">
                      <FooterSpan>Instagram</FooterSpan>
                    </FooterLinkExtern>
                  </li>
                </FooterLinksWrapper>

                <FooterLinksWrapper>
                  <li>
                    <FooterLink to="/shipping/" className="underline-hover">
                      <FooterSpan>Shipping & Returns</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/impressum/" className="underline-hover">
                      <FooterSpan>Impressum</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/terms/" className="underline-hover">
                      <FooterSpan>Terms</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/privacy/" className="underline-hover">
                      <FooterSpan>Privacy</FooterSpan>
                    </FooterLink>
                  </li>
                </FooterLinksWrapper>
            </FooterLinksLeft>

            {/* FOOTER LINKS RIGHT*/}

            <FooterLinksRight>
                <FooterLinksWrapper>
                  <li>
                    <FooterLink to="/about/" className="underline-hover">
                      <FooterSpan>how can we help?</FooterSpan>
                    </FooterLink>
                  </li>
                </FooterLinksWrapper>

                <FooterCredit>&#169; {new Date().getFullYear()}, built by{` `} 
                  <FooterLinkExtern href="https://jessica.gatsbyjs.io/" className="underline-hover" target="_blank" rel="noreferrer">Jessica Schäfer</FooterLinkExtern>
                </FooterCredit>
            </FooterLinksRight>

        </FooterInner>
    </FooterComponent>
  </>
  )
}

export default Footer
