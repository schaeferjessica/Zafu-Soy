import React from 'react'
import styled from '@emotion/styled'
import Seo from '~/components/seo'
import ProductGrid from '~/components/ProductGrid'

const Text = styled.p`
  margin-top: 15px;
  margin-bottom: 35px;
  max-width: 47%;
`

const IndexPage = () => (
  <>
    <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Shop</h1>
    <Text>We work with ceramists predominately in Japan for our candle jars and hand pour the soy wax in our Surry Hills studio. Each one is designed to be recycled – once your wax burns out, pop out the wick, wash with hot soapy water and you're left with a Japanese tea cup.</Text>
    <ProductGrid />
  </>
)

export default IndexPage
