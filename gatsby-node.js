// helper function to create a url form a file's path
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    const { createNodeField } = actions
    const slug = createFilePath({
      node,
      getNode,
      basePath: "posts",
      trailingSlash: false,
    })

    // The new node field is placed under the fields key on the extended node object.
    createNodeField({
      node,
      name: "slug",
      value: slug,
      // NOTE: if your want the url be anything other than the pure slug:
      // value: `/posts${slug}`,
    })
  }
}

const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark {
        totalCount
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
            }
            excerpt
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/post.js"),
      context: {
        slug: node.fields.slug,
      }, // additional data can be passed via context
    })
  })
}
