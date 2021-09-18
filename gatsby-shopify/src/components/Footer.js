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
`



const Footer = () => {
    return (
    <FooterComponent>
        <FooterInner>

            {/* FOOTER LINKS LEFT*/}

            <FooterLinksLeft>
                <FooterLinksWrapper>
                  <li>
                    <FooterLink to="/collection/frontpage/" className="border-hover"><span>shop</span></FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/about/" className="border-hover"><span>about</span></FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/faq/" className="border-hover"><span>FAQ</span></FooterLink>
                  </li>
                  <li>
                    <FooterLinkExtern href="https://www.instagram.com/yayoi.shop/" target="_blank" rel="noopener noreferrer" className="border-hover"><span>Instagram</span></FooterLinkExtern>
                  </li>
                </FooterLinksWrapper>

                <FooterLinksWrapper>
                  <li>
                    <FooterLink to="/shipping/" className="border-hover"><span>Shipping & Returns</span></FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/impressum/" className="border-hover"><span>Impressum</span></FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/terms/" className="border-hover"><span>Terms</span></FooterLink>
                  </li>
                  <li>
                    <FooterLink to="/privacy/" className="border-hover"><span>Privacy</span></FooterLink>
                  </li>
                </FooterLinksWrapper>
            </FooterLinksLeft>

            {/* FOOTER LINKS RIGHT*/}

            <FooterLinksRight>
                <FooterLinksWrapper>
                  <li>
                  <FooterLink to="/about/" className="border-hover"><span>how can we help?</span></FooterLink>
                  </li>
                </FooterLinksWrapper>

                <FooterCredit>&#169; {new Date().getFullYear()}, built by{` `} 
                  <FooterLinkExtern href="https://jessica.gatsbyjs.io/" target="_blank" rel="noreferrer">Jessica Schäfer</FooterLinkExtern>
                </FooterCredit>
            </FooterLinksRight>

        </FooterInner>
    </FooterComponent>
    )
}

export default Footer
