import React from 'react'
import { Link } from 'gatsby'

import Seo from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'

const IndexPage = () => (
  <>
    <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Shop</h1>
    <p>See All Products</p>
    <ProductGrid />
    <Link to="/impressum/">Impressum</Link>
  </>
)

export default IndexPage
