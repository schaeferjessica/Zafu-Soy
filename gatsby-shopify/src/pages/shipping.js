import React from 'react'
import { Link } from 'gatsby'

import Seo from '~/components/seo'

const SecondPage = () => (
  <>
    <Seo title="shipping and returns" />
    <Link to="/">back</Link>
    <h1>Shipping & Returns</h1>
    <p><strong>Shipping</strong></p>
    <p><strong>Returns</strong></p>
  </>
)

export default SecondPage
