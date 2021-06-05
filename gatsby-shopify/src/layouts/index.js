import React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkTo } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import '../../resources/fonts.css';
import ContextProvider from '~/provider/ContextProvider'
import { GlobalStyle, breakpoint, container } from '~/utils/styles'

const Footer = styled.footer`
  background-color: #313942;
  color: #faf9f8;
  margin-top: 100px;

  @media ${breakpoint.desktop} { 
    margin-top: 80px;
  }

  @media ${breakpoint.tablet} { 
    margin-top: 50px;
  }

  @media ${breakpoint.mobile} { 
    margin-top: 40px;
  }
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

  p {
    font-size: 15px;

    @media ${breakpoint.mobile} { 
      font-size: 14px;
    }
  }

  p strong {
    padding-bottom: 5px;
    display: block;
    font-family: IBM Plex Serif;
    color: #faf9f8;
  }
`

const FooterLinksLeft = styled.div`
  display: flex;
`

const FooterLinksRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  @media ${breakpoint.mobile} { 
    margin-top: 30px;
  }
`

const Small  = styled.small`
  margin-top: 30px;
  color: #bab8b5;
`

const LinkExternSmall  = styled.a`
  font-size: 16px;
  margin-top: 5px;
  color: #bab8b5;

  &:hover {
    color: #faf9f8;
  }

  @media ${breakpoint.mobile} { 
    font-size: 15px;
  }
`

const LinkExtern  = styled.a`
  font-size: 16px;
  margin-top: 5px;
  color: #faf9f8;

  @media ${breakpoint.mobile} { 
    font-size: 15px;
  }
`

const Link = styled(LinkTo)`
  font-size: 15px;
  margin-top: 5px;
  color: #faf9f8;

  @media ${breakpoint.mobile} { 
    font-size: 14px;
  }
`

const Div = styled.div`
display: flex;
flex-direction: column;

&:not(:first-child) {
  margin-left: 100px;

  @media ${breakpoint.desktop} { 
    margin-left: 80px;
  }

  @media ${breakpoint.tablet} { 
    margin-left: 40px;
  }
}
`

const Layout = ({ children }) => {
  return (
    <ContextProvider>
      <GlobalStyle />
      <StaticQuery
        query={graphql`
          query SiteTitleQuery {
            site {
              siteMetadata {
                title
              }
            }
          }
        `}
        render={data => (
          <div>
              {children}
            <Footer>
              <FooterInner>
                <FooterLinksLeft>
                  <Div>
                    <p><strong>Social</strong></p>
                    <Link to="/about/">about</Link>
                    <Link to="/faq/">FAQ</Link>
                    <LinkExtern href="https://www.instagram.com/maneki.space/" target="_blank" rel="noopener">Instagram</LinkExtern>
                    <LinkExtern href="https://www.facebook.com/maneki.space" target="_blank" rel="noopener">Facebook</LinkExtern>
                  </Div>
                  <Div>
                    <p><strong>Orders & Support</strong></p>
                    <Link to="/shipping/">Shipping & Returns</Link>
                    <Link to="/impressum/">Impressum</Link>
                    <Link to="/terms/">Terms</Link>
                    <Link to="/privacy/">Privacy</Link>
                  </Div>
                </FooterLinksLeft>
                <FooterLinksRight>
                  <Div>
                    <p><strong>Contact us:</strong></p>
                    <Link to="/about/">how can we help? </Link>
                  </Div>
                  <Small>&#169; {new Date().getFullYear()}, built by{` `} 
                    <LinkExternSmall href="https://jessica.gatsbyjs.io/" target="_blank" rel="noreferrer">Jessica Schäfer</LinkExternSmall>
                  </Small>
                </FooterLinksRight>
              </FooterInner>
            </Footer>
          </div>
        )}
      />
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
