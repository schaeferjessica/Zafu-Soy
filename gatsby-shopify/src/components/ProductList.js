// react
import React, { useContext, useState, useEffect } from 'react'

// gatsby
import { Link } from 'gatsby'

// contentful
import StoreContext from '~/context/StoreContext'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'
import { container } from '../styles/containers'


const ListItem = styled.li`
  ${container};
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid var(--color-black);
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
    transform: translateY(-25%);
    padding-left: 30px;
  }
`


// LIST ITEM CONTEXT

const ListItemContext = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: 1fr;
  gap: 0px 30px;

  @media ${breakpoint.mobile} { 
    gap: 0px 10px;
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
      <p>
        <Link to={`/product/${item.variant.product.handle}/`} className="link-hover">
          <span>{item.title}</span>
        </Link>
      </p>

      {/* LIST ITEM CONTEXT */}
      <ListItemContext>
        {/* LIST ITEM PRICE */}
        <p>{item.variant.price} €</p>

        {/* LIST ITEM QUANTITY */}
        <p>Quantity {quantity}</p>

        {/* LIST ITEM REMOVE */}
        <button onClick={handleRemove} className="link-hover"><span>Remove</span></button>
      </ListItemContext>
    </ListItem>
  )
}

export default ProductList
