import React from 'react'
import Seo from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'
import Navigation from '~/components/Navigation'


const IndexPage = () => (
  <>
    <Seo title="Shop" keywords={[`gatsby`, `application`, `react`]} />
    <Navigation />
    <ProductGrid />
  </>
)

export default IndexPage
