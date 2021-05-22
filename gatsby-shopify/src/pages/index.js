import React from 'react'
import Seo from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'


const IndexPage = () => (
  <>
    <Seo title="Shop" keywords={[`gatsby`, `application`, `react`]} />
    <ProductGrid />
  </>
)

export default IndexPage
