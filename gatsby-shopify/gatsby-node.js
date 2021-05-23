const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
    }
  `).then(result => {
    result.data.allShopifyProduct.edges.forEach(({ node }) => {
      createPage({
        path: `/product/${node.handle}/`,
        component: path.resolve(`./src/templates/ProductDetail.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: node.handle,
        },
      })
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
  {
    allMdx {
      nodes {
        body
        slug
        frontmatter {
          title
        }
      }
    }
  }
  
  `).then(result => {
    result.data.allMdx.nodes.forEach(( node ) => {
      createPage({
        path: node.slug,
        component: path.resolve(`./src/templates/Legal.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          title: node.frontmatter.title,
          content: node.body,
        },
      })
    })
  })
}

