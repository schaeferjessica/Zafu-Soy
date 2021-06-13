import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import '../../static/fonts.css';
import ContextProvider from '~/provider/ContextProvider'
import { GlobalStyle } from '~/utils/styles'
import Footer from '~/components/Footer'

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
        render={ () => (
          <div>
              {children}
              <Footer />
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
