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
    padding-right: 14px;
  }
`

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
  margin-bottom: 15px;
`

const LinkExtern  = styled.a`
  font-size: 14px;
`

const Link = styled(LinkTo)`
  font-size: 14px;
  margin-left: 20px;
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
                <small>&#169; {new Date().getFullYear()}, built by{` `}  
                  <LinkExtern href="https://jessica.gatsbyjs.io/" target="_blank" rel="noreferrer">Jessica Schäfer</LinkExtern>
                </small>
                <Link to="/impressum/">Impressum</Link>
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
