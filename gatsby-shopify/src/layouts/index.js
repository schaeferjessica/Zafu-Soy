import React from 'react'
import PropTypes from 'prop-types'
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
          <>
            <Navigation siteTitle={data.site.siteMetadata.title} />
            <Wrapper>
              {children}
              <footer>
                © {new Date().getFullYear()}, built by
                {` `}
                <a href="https://jessica.gatsbyjs.io/">Jessica Schäfer</a>
              </footer>
            </Wrapper>
          </>
        )}
      />
    </ContextProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
