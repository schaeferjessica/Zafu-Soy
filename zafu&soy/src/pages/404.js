// react
import React from 'react'
import Seo from '~/components/seo'

// components
import Navigation from '~/components/Navigation'

// emotion
import styled from '@emotion/styled/macro';


// NOT FOUND TITLE

const NotFoundTitle = styled.h1`
  height: calc(100vh - 168px);
  display: flex;
  justify-content: center;
  align-items: center;

  ~ footer {
    margin-top: 0;
  }
`

const NotFoundPage = () => (
  <>
    <Seo title="404: Not found" />
    <Navigation />
    <NotFoundTitle>PAGE NOT FOUND</NotFoundTitle>
  </>
)

export default NotFoundPage
