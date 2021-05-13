import React from 'react'
import { Link } from 'gatsby'

import SEO from '~/components/seo'

const SecondPage = () => (
  <>
    <SEO title="impressum" />
    <Link to="/">back</Link>
    <h1>Impressum</h1>
    <p>Informationspflicht laut § 5 TMG.</p>
  </>
)

export default SecondPage
