import React, { useState, useEffect } from 'react'
import Seo from '~/components/seo'
import Navigation from '~/components/Navigation'
import Checkout from '~/components/Checkout'
import Header from '~/components/Header'
import ProductGrid from '~/components/ProductGrid'
import InstaTeaser from '~/components/InstaTeaser'


const IndexPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.querySelector('body').classList.add('prevent-scroll--overlay');
    } else {
      document.querySelector('body').classList.remove('prevent-scroll--overlay');
    }
    
    fetch('https://graph.instagram.com/17895695668004550?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJVMFBYLVhtZAEktWUtZAX2R6VXlnOHE4VTdxU280WFNSellsVjBEV0c2VkVOZAlU5MmxYdENuNFUyaTk3Y1J2ckIydFRhbEJ6LW45c3cwZAFBNRkwzanZAlYTJ2ajlvMkpRalY1eWFUdHlGU2xtdDhhRFl0WjBjaDdXZA0JB')
    .then(response => console.log('response :>> ', response));
  }, [isOpen]);

  return <>
    <Seo title="Shop" keywords={[`gatsby`, `application`, `react`]} />
    <Navigation isWhite={true} onOrderButtonClick={() => setIsOpen(!isOpen)} />
    <Checkout isOpen={isOpen} handleCheckoutClose={() => setIsOpen(false)}/>
    <Header />
    <ProductGrid />
    <InstaTeaser />
  </>
}

export default IndexPage
