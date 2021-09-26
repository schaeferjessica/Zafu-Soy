const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const allShopifyCollections = await graphql(`
    query {
      allShopifyCollection(sort: { fields: [updatedAt], order:  ASC}) {
        nodes {
          title
          handle
          descriptionHtml
          products {
            id
            title
            handle
            createdAt
            images {
              id
              originalSrc
              localFile {
                childImageSharp {
                  gatsbyImageData(width: 900)
                }
              }
            }
            variants {
              price
              availableForSale
            }
          }
        }
      }
    }
  `);

  if (allShopifyCollections.error) {
    reporter.panic('failed to create product pages', allShopifyCollections.errors);
  }

  allShopifyCollections.data.allShopifyCollection.nodes.forEach((node) => {
    actions.createPage({
      path: `/collection/${node.handle}/`,
      component: path.resolve(`./src/templates/CollectionPage.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        handle: node.handle,
        title: node.title,
        descriptionHtml: node.descriptionHtml,
        products: node.products,
      },
    });
  });

  const allShopifyProducts = await graphql(`
    query {
      allShopifyProduct {
        edges {
          node {
            handle
            title
            variants {sku}
            tags
          }
        }
      }
    }
  `);

  if (allShopifyProducts.error) {
    reporter.panic('failed to create product pages', allShopifyProducts.errors);
  }

  allShopifyProducts.data.allShopifyProduct.edges.forEach(({ node }) => {
    actions.createPage({
      path: `/product/${node.handle}/`,
      component: path.resolve(`./src/templates/ProductDetail.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        handle: node.handle,
        sku: node.variants[0].sku,
        collection: node.tags[0],
      },
    });
  });

  const allLegalPages = await graphql(`
    query {
      allContentfulLegal {
        nodes {
          slug
          text {
            raw
          }
          images {
            title
            gatsbyImageData (width: 500)
          }
        }
      }
    }
  `);

  if (allLegalPages.error) {
    reporter.panic('failed to create legal pages', allLegalPages.errors);
  }

  allLegalPages.data.allContentfulLegal.nodes.forEach(node => {
    actions.createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/Legal.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        text: node.text.raw,
        images: node.images,
        slug: node.slug
      },
    })
  });
}

