import React, { useState, useEffect } from 'react'
import Seo from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'


const IndexPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll');
    }
  }, [isOpen]);

  return <>
    <Seo title="Shop" keywords={[`gatsby`, `application`, `react`]} />
    <Navigation onOrderButtonClick={() => setIsOpen(!isOpen)} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>
    <ProductGrid />
  </>
}

export default IndexPage
