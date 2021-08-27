import React, { useContext } from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import StoreContext from '~/context/StoreContext'
import styled from '@emotion/styled/macro'
// import { breakpoint, container, moduleSpace, headerSpace } from '../utils/styles'


// const CollectionSliderHeader =styled.div`
//   ${moduleSpace}
//   ${headerSpace}
//   ${container}
// `



const CollectionSlider = () => {

  // const { allShopifyCollection, filters, shopifyCollection} = useStaticQuery(
  //   graphql`
  //   query {}
  //   `
  // )

  return 'CollectionSlider'

  // return (
  //   <CollectionSlider id="collections">
  //     {allShopifyCollection.nodes.map(collection => {
  //       return (
  //       <CollectionSliderItem key={collection.id}>
  //         <CollectionSliderHeader>
  //             <h2>{collection.title}</h2>
  //         </CollectionSliderHeader>
  //     </CollectionSliderItem>
  //     )
  //     })}
  //   </CollectionSlider>
  // )
}

export default CollectionSlider
