import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import StoreContext from '~/context/StoreContext'
import { Wrapper } from './styles'

const LineItem = props => {
  const { item } = props
  const {
    removeLineItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  console.log(item.variant.image.src)
  const variantImage = item.variant.image ? (
    <StaticImage
      src={item.variant.image.src}
      alt={`${item.title} product shot`}
      placeholder="blurred"
      width={200}
      height={200}
    />
  ) : null

  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(
        option => `${option.name}: ${option.value} `
      )
    : null

  const handleRemove = () => {
    removeLineItem(client, checkout.id, item.id)
  }
  console.log('variantImage :>> ', variantImage)
  return (
    <Wrapper>
      <Link to={`/product/${item.variant.product.handle}/`}>
        popo
        {variantImage}
      </Link>
      <p>
        {item.title}
        {`  `}
        {item.variant.title === !'Default Title' ? item.variant.title : ''}
      </p>
      {selectedOptions}
      {item.quantity}
      <button onClick={handleRemove}>Remove</button>
    </Wrapper>
  )
}

export default LineItem
