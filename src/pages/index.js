import React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1 className="text-white flex text-center justify-center uppercase h-screen">
      Home page
    </h1>
  </Layout>
)

export default IndexPage
