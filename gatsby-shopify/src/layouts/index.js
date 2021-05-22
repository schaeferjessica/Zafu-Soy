import React from 'react'
import PropTypes from 'prop-types'
import { Link as LinkTo } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'
import '../../resources/fonts.css';
import ContextProvider from '~/provider/ContextProvider'
import { GlobalStyle, breakpoint } from '~/utils/styles'
import Navigation from '~/components/Navigation'

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  padding-left: 45px;
  padding-right: 45px;

  @media ${breakpoint.desktop} { 
    padding-left: 35px;
    padding-right: 35px;
  }

  @media ${breakpoint.tablet} { 
    padding-left: 25px;
    padding-right: 25px;
  }

  @media ${breakpoint.mobile} { 
    padding-left: 15px;
    padding-right: 15px;
  }
`

const Footer = styled.footer`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 60px;
  margin-bottom: 15px;

  @media ${breakpoint.tablet} { 
    flex-direction: column-reverse;
  }
`

const FooterLinks = styled.footer`
  display: flex;
`

const Small  = styled.small`
  margin-top: 15px;
`

const LinkExtern  = styled.a`
  font-size: 15px;

  @media ${breakpoint.mobile} { 
    font-size: 14px;
  }
`

const Link = styled(LinkTo)`
  font-size: 15px;

  @media ${breakpoint.mobile} { 
    font-size: 14px;
  }
`

const Div = styled.div`
display: flex;
flex-direction: column;

&:not(:first-child) {
  margin-left: 40px;
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
          <Wrapper>
            <Navigation siteTitle={data.site.siteMetadata.title} />
              {children}
              <Footer>
                <Small>&#169; {new Date().getFullYear()}, built by{` `}  
                  <LinkExtern href="https://jessica.gatsbyjs.io/" target="_blank" rel="noreferrer">Jessica Schäfer</LinkExtern>
                </Small>
                <FooterLinks>
                  <Div>
                    <Link to="/shipping/">Shipping & Returns</Link>
                    <Link to="/impressum/">Impressum & Terms</Link>
                  </Div>
                  <Div>
                    <LinkExtern href="https://www.instagram.com/" target="_blank">Instagram</LinkExtern>
                    <LinkExtern href="https://www.facebook.com/" target="_blank">Facebook</LinkExtern>
                  </Div>
                </FooterLinks>
              </Footer>
          </Wrapper>
        )}
      />
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
