// react
import React from 'react'
import PropTypes from 'prop-types'

// gatsby
import { StaticQuery, graphql } from 'gatsby'

// contentful
import ContextProvider from '~/provider/ContextProvider'

// components
import Footer from '~/components/Footer'

// styles
import { GlobalStyle } from '../styles/main'
import { GlobalStyle as ColorsStyle } from '../styles/colors'
import { GlobalStyle as HoversStyle } from '../styles/hovers'
import { GlobalStyle as ScrollsStyle } from '../styles/scrolls'
import { GlobalStyle as BulletsStyle } from '../styles/bullets'

// font
import '../../static/fonts.css';


const Layout = ({ children }) => {
  return (
    <ContextProvider>
      <GlobalStyle />
      <ColorsStyle />
      <HoversStyle />
      <ScrollsStyle />
      <BulletsStyle />
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
