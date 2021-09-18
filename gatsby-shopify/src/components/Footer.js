// react
import React from 'react'

// gatsby
import { Link as LinkTo } from 'gatsby'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container, moduleSpaceSmall }  from '../styles/containers'


// FOOTER

const FooterComponent = styled.footer`
  ${moduleSpaceSmall}
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



const Footer = () => {
    return (
    <FooterComponent>
        <FooterInner>

            {/* FOOTER LINKS LEFT*/}

            <FooterLinksLeft>
                <FooterLinksWrapper>
                  <li>
                    <FooterLink to="/collection/frontpage/" className="border-hover">
                      <FooterSpan>shop</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/about/" className="border-hover">
                      <FooterSpan>about</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/faq/" className="border-hover">
                      <FooterSpan>FAQ</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLinkExtern href="https://www.instagram.com/yayoi.shop/" className="border-hover" target="_blank" rel="noopener noreferrer">
                      <FooterSpan>Instagram</FooterSpan>
                    </FooterLinkExtern>
                  </li>
                </FooterLinksWrapper>

                <FooterLinksWrapper>
                  <li>
                    <FooterLink to="/shipping/" className="border-hover">
                      <FooterSpan>Shipping & Returns</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/impressum/" className="border-hover">
                      <FooterSpan>Impressum</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/terms/" className="border-hover">
                      <FooterSpan>Terms</FooterSpan>
                    </FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/privacy/" className="border-hover">
                      <FooterSpan>Privacy</FooterSpan>
                    </FooterLink>
                  </li>
                </FooterLinksWrapper>
            </FooterLinksLeft>

            {/* FOOTER LINKS RIGHT*/}

            <FooterLinksRight>
                <FooterLinksWrapper>
                  <li>
                    <FooterLink to="/about/" className="border-hover">
                      <FooterSpan>how can we help?</FooterSpan>
                    </FooterLink>
                  </li>
                </FooterLinksWrapper>

                <FooterCredit>&#169; {new Date().getFullYear()}, built by{` `} 
                  <FooterLinkExtern href="https://jessica.gatsbyjs.io/" className="border-hover" target="_blank" rel="noreferrer">Jessica Schäfer</FooterLinkExtern>
                </FooterCredit>
            </FooterLinksRight>

        </FooterInner>
    </FooterComponent>
    )
}

export default Footer
