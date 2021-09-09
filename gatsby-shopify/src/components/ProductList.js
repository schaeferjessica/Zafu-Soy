import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'gatsby'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled/macro'
import { breakpoint, container } from '../utils/styles'

const ListItem = styled.li`
  ${container};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  font-family: 'IBM Plex Mono';
  font-weight: 300;
  border-bottom: 1px solid var(--color-blue);
  padding-top: 25px;
  padding-bottom: 25px;  
  padding-right: 150px; 
  padding-left: 50px; 

  @media ${breakpoint.desktop} {
    padding-left: 50px; 
  }

  @media ${breakpoint.tablet} { 
    padding-left: 50px;
  }

  @media ${breakpoint.mobile} { 
    transform: translateY(-70%);
    padding-left: 30px;
  }
`


const ProductList = props => {
  const { item } = props
  const {
    removeProductItem,
    store: { client, checkout },
  } = useContext(StoreContext)
  const [quantity, setQuantity] = useState(item.quantity);

  
  const handleRemove = () => {
    removeProductItem(client, checkout.id, item.id)
  }

  useEffect(() => {
    setQuantity(item.quantity);
  }, [props, item.quantity]);

  return (
    <ListItem>
      {/* LIST ITEM TITLE */}
      <h3>
        <Link to={`/product/${item.variant.product.handle}/`} className="link-hover">
          <span>{item.title}</span>
        </Link>
      </h3>

      {/* LIST ITEM PRICE */}
      <p>{item.variant.price} €</p>

      {/* LIST ITEM QUANTITY */}
      <p>Quantity {quantity}</p>

      {/* LIST ITEM REMOVE */}
      <button onClick={handleRemove} className="link-hover"><span>Remove</span></button>
    </ListItem>
  )
}

export default ProductList
