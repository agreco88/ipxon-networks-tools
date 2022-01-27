/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const date = new Date()
  const [month, day, year] = [
    date.getMonth(),
    date.getDate(),
    date.getFullYear(),
  ]
  console.log("Month:", [month])
  console.log("Day:", [day])
  console.log("Year:", [year])

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
        <footer className="h-10vh items-center container mx-auto text-white flex justify-between text-xs">
          <div>
            Copyright © {year} IPXON |{" "}
            <a
              href="https://www.ipxon.com/"
              className="font-extrabold text-white"
            >
              Terminos y condiciones
            </a>
          </div>
          <div>
            {day}/{month == "0" ? month + 1 : month}/{year}
          </div>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
