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
import Footer from "./Footer"

import { MailIcon } from "@heroicons/react/solid"
import LanguageDropdown from "./LanguageDropdown"

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

  return (
    <>
      <div className="bg-ipxonBrown h-5vh">
        <div className="container mx-auto flex justify-between items-center h-full">
          <div className="flex justify-between items-center gap-2">
            <MailIcon className="h-4" />
            <div className="text-sm font-bold">
              <span className="font-normal">sales@ipxon.com</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="uppercase text-sm">Language:</label>
            <LanguageDropdown />
          </div>
        </div>
      </div>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main>{children}</main>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
