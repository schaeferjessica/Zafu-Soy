const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const allShopifyProducts = await graphql(`
    query {
      allShopifyProduct {
        edges {
          node {
            handle
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
      },
    });
  });

  const allLegalPages = await graphql(`
    query {
      allMdx {
        nodes {
          body
          slug
          frontmatter {
            title
            imageOne {
              childImageSharp {
                gatsbyImageData (width: 600)
              }
            }
            altOne
            imageTwo {
              childImageSharp {
                gatsbyImageData (width: 600)
              }
            }
            altTwo
          }
        }
      }
    }
  `);

  if (allLegalPages.error) {
    reporter.panic('failed to create legal pages', allLegalPages.errors);
  }

  allLegalPages.data.allMdx.nodes.forEach(node => {
    const images = [];
    if (node.frontmatter.imageOne) images.push({
      image: node.frontmatter.imageOne,
      altText: node.frontmatter.altOne,
    })
    if (node.frontmatter.imageTwo) images.push({
      image: node.frontmatter.imageTwo,
      altText: node.frontmatter.altTwo,
    })
    
    actions.createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/Legal.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        title: node.frontmatter.title,
        alt: node.frontmatter.alt,
        content: node.body,
        images: images,
      },
    })
  });
}

