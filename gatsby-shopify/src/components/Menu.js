// react
import React, {useState} from 'react'

// gatsby
import { useStaticQuery, graphql, Link, navigate } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

// components
import { CheckoutClose } from '~/components/Checkout'

// emotion
import styled from '@emotion/styled/macro'

// styles
import breakpoint from '../styles/breakpoints'


export const Collection = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: var(--color-white);
  display: flex;
  transition: transform 300ms ease-in-out;
  transform: translateY(-100%);

  &.is-active {
    transform: translateY(0%);
  }
`

export const CollectionImageList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  width: 47%;
  position: relative;
  overflow: hidden;
  `

export const CollectionImageItem = styled.li`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 300ms ease-in-out;
  width: 100%;
  max-width: 60%;

  &.is-active {
    opacity: 1;
  }
`

export const CollectionLinkContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px;
`;

export const CollectionLinkList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0px;
  font-size: 21px;
`

export const CollectionItem = styled.div`
  margin: 8px 0;
`

export const MenuImage = styled.div`
  position: relative;
`

const LinkExtern  = styled.a`
  font-size: 15px;
  margin-top: 5px;
  color: var(--color-blue);

  @media ${breakpoint.mobile} { 
    font-size: 14px;
  }
`

const CollectionCheckoutClose  = styled(CheckoutClose)`
  position: absolute;
  top: 20px;
  right: 20px;
`
export const CollectionCount  = styled.sup`
  color: var(--color-gray);
`


const Menu = ({menuStatus, triggerMenuStatus}) => {
  const [activeMenu, setActiveMenu] = useState(0);
  const handleMouseEnter = index => setActiveMenu(index);
  const { allShopifyCollection } = useStaticQuery(
    graphql`
    query {
      allShopifyCollection(sort: { fields: [updatedAt], order:  ASC}) {
        nodes {
          id
          title
          handle
          products {id}
        }
      }
    }
    `
  )

  const handleLinkClick = (handle) => {
    triggerMenuStatus();
    navigate(`/collection/${handle}`);
  };

  return (
    <Collection className={menuStatus ? 'is-active' : 'is-hidden'}>
      {/* col left */}
      <CollectionImageList>
        {allShopifyCollection.nodes.map((collection, index) => {
          const image = collection.image ? getImage(collection.image.localFile) : null;
          return <CollectionImageItem key={collection.id} className={`${index === activeMenu ? 'is-active' : 'is-hidden' }`}>
          {image && (
            <MenuImage>
              <GatsbyImage 
                image={image} 
                alt={collection.title} 
                key={image.id}
                className="image-hover"
              />  
            </MenuImage>
          )}
        </CollectionImageItem>
        })}
      </CollectionImageList>

      {/* col right */}
      <CollectionLinkContainer>
       <CollectionCheckoutClose onClick={() => triggerMenuStatus()}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="10" 
            height="10" 
            viewBox="0 0 24 24">
            <path d="M23.954 21.03l-9.184-9.095 9.092-9.174-2.832-2.807-9.09 9.179-9.176-9.088-2.81 2.81 9.186 9.105-9.095 9.184 2.81 2.81 9.112-9.192 9.18 9.1z"/>
          </svg>
        </CollectionCheckoutClose>
        <CollectionLinkList>
          {allShopifyCollection.nodes.map((collection, index) => {
            return <CollectionItem key={collection.id}>
              <button onMouseEnter={() => handleMouseEnter(index)} onClick={() => handleLinkClick(collection.handle)}>{collection.title}</button>
              <CollectionCount>{collection.products.length}</CollectionCount>
          </CollectionItem>
          })}
        </CollectionLinkList>

        <Link to="/about/">about</Link>
        <LinkExtern href="https://www.instagram.com/maneki.space/" target="_blank" rel="noopener noreferrer">Instagram</LinkExtern>
        <LinkExtern href="https://www.facebook.com/maneki.space" target="_blank" rel="noopener noreferrer">Facebook</LinkExtern>
      </CollectionLinkContainer>
    </Collection>
  )
}

export default Menu