// react
import React, { useState, useEffect } from 'react'
import Seo from '~/components/seo'

// components
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'

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

const NotFoundPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll--overlay');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll--overlay');
    }
  }, [isOpen]);

  return (
    <>
      <Seo title="404: Not found" />
      <Navigation isWhite={false} onOrderButtonClick={() => setIsOpen(!isOpen)} />
      <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>
      <NotFoundTitle>PAGE NOT FOUND</NotFoundTitle>
    </>
  )
}

export default NotFoundPage
