import React from 'react'
import { Link as LinkTo } from 'gatsby'
import styled from '@emotion/styled/macro'
import '../../static/fonts.css';
import { breakpoint, container, moduleSpaceSmall } from '~/utils/styles'

// FOOTER

const FooterComponent = styled.footer`
  ${moduleSpaceSmall}
  background-color: var(--color-blue);
  color: var(--color-white);
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

const FooterLinksTitle = styled.p`
    padding-bottom: 5px;
    display: block;
    color: var(--color-white);
    font-weight: 400;
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
  color: var(--color-white);
`

const FooterLink = styled(LinkTo)`
  margin-top: 5px;
  color: var(--color-white);
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

  &:hover {
    color: var(--color-white);
  }
`



const Footer = () => {
    return (
    <FooterComponent>
        <FooterInner>

            {/* FOOTER LINKS LEFT*/}

            <FooterLinksLeft>
                <FooterLinksWrapper>
                  <FooterLinksTitle>Social</FooterLinksTitle>
                  <FooterLink to="/about/">about</FooterLink>
                  <FooterLink to="/faq/">FAQ</FooterLink>
                  <FooterLinkExtern href="https://www.instagram.com/maneki.space/" target="_blank" rel="noopener">Instagram</FooterLinkExtern>
                  <FooterLinkExtern href="https://www.facebook.com/maneki.space" target="_blank" rel="noopener">Facebook</FooterLinkExtern>
                </FooterLinksWrapper>

                <FooterLinksWrapper>
                  <FooterLinksTitle>Orders & Support</FooterLinksTitle>
                  <FooterLink to="/shipping/">Shipping & Returns</FooterLink>
                  <FooterLink to="/impressum/">Impressum</FooterLink>
                  <FooterLink to="/terms/">Terms</FooterLink>
                  <FooterLink to="/privacy/">Privacy</FooterLink>
                </FooterLinksWrapper>
            </FooterLinksLeft>

            {/* FOOTER LINKS RIGHT*/}

            <FooterLinksRight>
                <FooterLinksWrapper>
                  <FooterLinksTitle>Contact us:</FooterLinksTitle>
                  <FooterLink to="/about/">how can we help? </FooterLink>
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
