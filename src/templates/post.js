import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => {
  const post = data.markdownRemark

  return (
    <>
      <Img fixed={post.frontmatter.image.childImageSharp.fixed} />
      <h1>{post.frontmatter.title}</h1>
      <h6>Posted at: {post.frontmatter.date}</h6>
      {/* NOTE: when set html directly we usually need to sanitize it, here it's not necessary because we create the content of the html ourselves */}
      <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        # TOPIC: format date
        date(formatString: "DD/MM/YYYY")
        image {
          childImageSharp {
            fixed(width: 500) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
