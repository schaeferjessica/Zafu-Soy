import React, { useContext } from 'react'
import { Link } from 'gatsby'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled'

const ListItem = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const ListItemContext = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Button = styled.button`
  color: black;
  text-decoration: none;
  padding: 0;
  
&:hover {
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
}
`

const Image = styled.img`
  max-width: 300px;
`

const ProductList = props => {
  const { item } = props
  console.log('item :>> ', item);
  const {
    removeProductItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = item.variant.image ? (
    <Image src={item.variant.image.src} alt={`${item.title} product shot`}/>
  ) : null

  /*
  const selectedOptions = item.variant.selectedOptions
    ? item.variant.selectedOptions.map(
      option => `${option.name}: ${option.value} `
    )
    : null
  */

  const handleRemove = () => {
    removeProductItem(client, checkout.id, item.id)
  }
  return (
    <ListItem>
      <Link to={`/product/${item.variant.product.handle}/`}>
        {variantImage}
      </Link>
      <ListItemContext>
        <p>{item.title}</p>
        <p>{item.quantity}</p>
        <p>{item.variant.price}</p>
        <Button onClick={handleRemove}>Remove</Button>
      </ListItemContext>
    </ListItem>
  )
}

export default ProductList
