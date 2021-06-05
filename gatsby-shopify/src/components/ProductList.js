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
  margin-left: 20px;
  width: 45%;
`

const ListItemImage = styled.div`
  width: 35%;
`

const ListItemButton = styled.button`
  color: #3139425c;
  text-decoration: none;
  padding: 0;
  
&:hover {
  color: #313942;
}
`

const ProductList = props => {
  const { item } = props
  const {
    removeProductItem,
    store: { client, checkout },
  } = useContext(StoreContext)

  const variantImage = item.variant.image ? (
    <img src={item.variant.image.src} alt={`${item.title} product shot`}/>
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
      <ListItemImage>
        <Link to={`/product/${item.variant.product.handle}/`}>
          {variantImage}
        </Link>
      </ListItemImage>
      <ListItemContext>
        <p>{item.title}</p>
        <p>{item.variant.price} €</p>
        <ListItemButton onClick={handleRemove}><small>{item.quantity} - Remove</small></ListItemButton>
      </ListItemContext>
    </ListItem>
  )
}

export default ProductList
