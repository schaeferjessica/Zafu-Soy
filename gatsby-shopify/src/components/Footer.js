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

const FooterLinksWrapper = styled.div`
display: flex;
flex-direction: column;

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

const FooterSmall  = styled.small`
  margin-top: 30px;
  color: var(--color-gray);
`

const FooterLinkExternSmall  = styled.a`
  margin-top: 5px;
  color: var(--color-gray);
`



const Footer = () => {
    return (
    <FooterComponent>
        <FooterInner>

            {/* FOOTER LINKS LEFT*/}

            <FooterLinksLeft>
                <FooterLinksWrapper>
                  <FooterLink to="/collection/frontpage/"><span>shop</span></FooterLink>
                  <FooterLink to="/about/"><span>about</span></FooterLink>
                  <FooterLink to="/faq/"><span>FAQ</span></FooterLink>
                  <FooterLinkExtern href="https://www.instagram.com/yayoi.shop/" target="_blank" rel="noopener noreferrer"><span>Instagram</span></FooterLinkExtern>
                </FooterLinksWrapper>

                <FooterLinksWrapper>
                  <FooterLink to="/shipping/"><span>Shipping & Returns</span></FooterLink>
                  <FooterLink to="/impressum/"><span>Impressum</span></FooterLink>
                  <FooterLink to="/terms/"><span>Terms</span></FooterLink>
                  <FooterLink to="/privacy/"><span>Privacy</span></FooterLink>
                </FooterLinksWrapper>
            </FooterLinksLeft>

            {/* FOOTER LINKS RIGHT*/}

            <FooterLinksRight>
                <FooterLinksWrapper>
                  <FooterLink to="/about/"><span>how can we help?</span></FooterLink>
                </FooterLinksWrapper>

                <FooterSmall>&#169; {new Date().getFullYear()}, built by{` `} 
                  <FooterLinkExternSmall href="https://jessica.gatsbyjs.io/" target="_blank" rel="noreferrer">Jessica Schäfer</FooterLinkExternSmall>
                </FooterSmall>
            </FooterLinksRight>

        </FooterInner>
    </FooterComponent>
    )
}

export default Footer
