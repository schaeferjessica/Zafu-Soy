import React, { useContext } from 'react'

import StoreContext from '~/context/StoreContext'
import ProductList from './ProductList'

const Checkout = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  const lineItems = checkout.lineItems.map(item => (
    <ProductList key={item.id.toString()} item={item} />
  ))

  return (
    <div>
      {lineItems}
      <p>$ {checkout.subtotalPrice}</p>
      <p>$ {checkout.totalTax} tax</p>
      <button
        onClick={handleCheckout}
        disabled={checkout.lineItems.length === 0}
      >
        Check out — $ {checkout.totalPrice}
      </button>
    </div>
  )
}

export default Checkout
