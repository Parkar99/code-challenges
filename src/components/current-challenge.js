import React from "react"
import {StaticQuery, graphql} from "gatsby"

export default () => (
    <StaticQuery
        query={graphql`
  query {
    allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1
    ) {
      edges {
        node {
          id
          html
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            path
            title
            technologies
          }
        }
      }
    }
  }
`}

        render={data => (
            <>
                <header>
                    <h1>{data.allMarkdownRemark.edges[0].node.frontmatter.title}</h1>
                    <div className="flex devicons mb-4">
                        {data.allMarkdownRemark.edges[0].node.frontmatter.technologies.map(tech => <i key={tech}
                                                                                                      className={`devicon-${tech}-plain colored`}/>)}
                    </div>
                    <div
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{__html: data.allMarkdownRemark.edges[0].node.html}}
                    />
                </header>
            </>
        )}
    />
)