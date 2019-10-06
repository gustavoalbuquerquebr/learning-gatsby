import React from "react"
import { Link, graphql } from "gatsby"

export const query = graphql`
  {
    # TOPIC: sort
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      totalCount
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            date
          }
          excerpt
        }
      }
    }
  }
`

export default ({ data }) => (
  <>
    <h1>Posts ({data.allMarkdownRemark.totalCount})</h1>
    {data.allMarkdownRemark.edges.map(post => (
      <article>
        <h3>{post.node.frontmatter.title}</h3>
        <h6>{post.node.frontmatter.date}</h6>
        <p>{post.node.excerpt}</p>
        <p>
          <Link to={post.node.fields.slug}>Read More</Link>
        </p>
      </article>
    ))}
  </>
)
