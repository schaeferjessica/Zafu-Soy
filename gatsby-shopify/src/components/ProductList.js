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
    transform: translateY(-25%);
    padding-left: 30px;
  }
`

// LIST ITEM TITLE

const ListItemTitle = styled.span`
  @media ${breakpoint.mobile} { 
    font-size: 13px;
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
    font-size: 13px;
  }
`

// LIST ITEM REMOVE

const ListItemRemove = styled.span`
   @media ${breakpoint.mobile} { 
    font-size: 13px;
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
          <ListItemTitle>{item.title}</ListItemTitle>
        </Link>
      </h3>

      {/* LIST ITEM CONTEXT */}
      <ListItemContext>
        {/* LIST ITEM PRICE */}
        <p>{item.variant.price} €</p>

        {/* LIST ITEM QUANTITY */}
        <p>Quantity {quantity}</p>

        {/* LIST ITEM REMOVE */}
        <button onClick={handleRemove} className="link-hover"><ListItemRemove>Remove</ListItemRemove></button>
      </ListItemContext>
    </ListItem>
  )
}

export default ProductList
