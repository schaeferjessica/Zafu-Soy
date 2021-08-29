import React, { useState, useEffect } from 'react'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import Header from '~/components/Header'
import CollectionSlider from '~/components/CollectionSlider'
import InstaTeaser from '~/components/InstaTeaser'


const IndexPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const body = document.querySelector('body');
    if (isOpen) {
      body.classList.add('prevent-scroll--overlay');
    } else {
      body.classList.remove('prevent-scroll--overlay');
    }
  }, [isOpen]);

  return <>
    <Seo title="Shop" keywords={[`gatsby`, `application`, `react`]} />
    <Navigation isWhite={true} onOrderButtonClick={() => setIsOpen(!isOpen)} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>
    <Header />
    <CollectionSlider />
    <InstaTeaser />
  </>
}

export default IndexPage
