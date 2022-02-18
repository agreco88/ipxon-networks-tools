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
      <div className=" bg-ipxonBrown h-5vh px-4 z-0">
        <div className="flex justify-between items-center h-full mx-auto container">
          <div className="flex justify-between items-center gap-2 text-white">
            <MailIcon className="h-4 text-white" />
            <div className="text-sm font-bold">
              <span className="font-normal text-white">sales@ipxon.com</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="uppercase text-sm text-white hidden md:flex">
              Language:
            </label>
            <LanguageDropdown />
          </div>
        </div>
      </div>
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="mt-16 md:pt-0">{children}</main>
      <Footer year={year} />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
