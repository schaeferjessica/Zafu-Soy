import React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkTo } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import '../../resources/fonts.css';
import ContextProvider from '~/provider/ContextProvider'
import { GlobalStyle, breakpoint, container } from '~/utils/styles'
import Navigation from '~/components/Navigation'

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
  align-items: flex-end;
  justify-content: space-between;
  padding-top: 30px;
  padding-bottom: 30px;

  @media ${breakpoint.mobile} { 
    flex-direction: column;
    align-items: flex-start;
  }
`

const FooterLinks = styled.footer`
  display: flex;

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
  }
`

const Small  = styled.small`
  margin-top: 30px;
`

const LinkExtern  = styled.a`
  font-size: 15px;
  margin-top: 5px;
  color: #faf9f8;

  @media ${breakpoint.mobile} { 
    font-size: 14px;
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
            <Navigation siteTitle={data.site.siteMetadata.title} />
              {children}
            <Footer>
              <FooterInner>
                <FooterLinks>
                  <Div>
                    <p><strong>Social</strong></p>
                    <Link to="/about/">about</Link>
                    <LinkExtern href="https://www.instagram.com/" target="_blank">Instagram</LinkExtern>
                    <LinkExtern href="https://www.facebook.com/" target="_blank">Facebook</LinkExtern>
                  </Div>
                  <Div>
                    <p><strong>Orders & Support</strong></p>
                    <Link to="/faq/">FAQ</Link>
                    <Link to="/shipping/">Shipping & Returns</Link>
                    <Link to="/impressum/">Impressum & Terms</Link>
                  </Div>
                </FooterLinks>
                <Small>&#169; {new Date().getFullYear()}, built by{` `}  
                  <LinkExtern href="https://jessica.gatsbyjs.io/" target="_blank" rel="noreferrer">Jessica Schäfer</LinkExtern>
                </Small>
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
