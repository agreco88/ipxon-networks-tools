import React, { useEffect, useState } from "react"
import axios from "axios"
import { graphql, useStaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundImage from "gatsby-background-image"

import { DocumentDuplicateIcon, DuplicateIcon } from "@heroicons/react/outline"

const Buttons = () => {
  return (
    <div className="flex flex-col justify-center text-white gap-4">
      <div className="flex justify-around mt-8 w-1/2 h-10 rounded-full bg-gray-500 self-center">
        <a
          href="https://www.teamviewer.com/en-us"
          target="_blank"
          className="flex items-center justify-center gap-2"
        >
          <span>Teamviewer</span>
          <svg
            className="h-6 w-6 text-white"
            fill="currentColor"
            stroke="currentColor"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>TeamViewer</title>
            <path d="M22.597 24H1.406A1.41 1.41 0 0 1 0 22.594V1.406A1.41 1.41 0 0 1 1.406 0h21.191a1.41 1.41 0 0 1 1.406 1.406v21.188A1.41 1.41 0 0 1 22.597 24zM11.911 2.109c-5.405.047-9.763 4.482-9.802 9.89-.04 5.507 4.381 9.885 9.89 9.89 5.415.003 9.796-4.5 9.89-9.89.097-5.572-4.406-9.939-9.978-9.89zM9.65 8.633l-.889 2.159H15.3l-.889-2.159 6.642 3.365-6.642 3.365.889-2.159H8.761l.882 2.159-6.659-3.365z" />
          </svg>
        </a>
        <span className="text-center justify-center text-3xl rounded-full bg-white my-2 w-0.5"></span>
        <a
          href="https://anydesk.com/en"
          target="_blank"
          className="flex items-center justify-center gap-2"
        >
          <span>AnyDesk</span>
          <svg
            className="h-6 w-6 text-white"
            fill="currentColor"
            stroke="currentColor"
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>AnyDesk</title>
            <path d="M8.322 3.677L0 12l8.322 8.323L16.645 12zm7.371.01l-1.849 1.85 6.49 6.456-6.49 6.49 1.85 1.817L24 11.993Z" />
          </svg>
        </a>
      </div>
      <h4>Downloads - Support Tools</h4>
    </div>
  )
}

export default function WhatsMyIp() {
  const [ip, setIP] = useState()
  const [copiedIp, setCopiedIp] = useState()

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/")
    setIP(res.data.IPv4)
  }

  useEffect(() => {
    getData()
  }, [])

  const images = useStaticQuery(
    graphql`
      query {
        bgImage: file(relativePath: { eq: "Fondo-op1.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  )
  const bgImageData = images.bgImage.childImageSharp.fluid

  function handleCopiedResult() {
    setCopiedIp(true)
    navigator.clipboard.writeText(ip)
  }

  return (
    <BackgroundImage
      Tag="section"
      fluid={bgImageData}
      alt={"Satelite in space"}
    >
      <Layout>
        <SEO title="What is my IP" />

        <div className="bg-gradient-to-tr from-ipxonLightMagenta via-black to-black absolute" />
        <div className="w-full mx-auto container justify-center items-center flex flex-col h-70vh ">
          {ip ? (
            <div className="flex flex-col justify-center w-1/2 text-center gap-1 h-96">
              <div className="w-1/2 relative border-b py-2 border-ipxonLighterMagenta fles justify-center items-center self-center">
                <h2 className="flex flex-col">
                  Your IP address is:
                  <span className="flex">
                    <span className="flex-1 font-bold text-4xl">{ip}</span>
                    {/* <span className="flex-0 flex-col text-white items-center justify-center py-2 pr-2 pt-1 self-center">
                      <DuplicateIcon
                        className="
                        h-8 opacity-25 hover:opacity-100
                        transition duration-500 ease-in-out 
                      hover:text-ipxonLightMagenta
                      focus:text-ipxonLightMagenta"
                      />
                    </span> */}
                  </span>
                </h2>
              </div>
              <div className="w-1/2 self-center text-xs">
                <span
                  className="
                  hover:border-b 
                  hover:border-ipxonLighterMagenta
                  hover:text-ipxonLighterMagenta
                  transition duration-500 ease-in-out 
                  cursor-pointer
                  "
                >
                  COPY
                </span>{" "}
                <span>and share this info with IPXON Technical Support</span>
              </div>
              <Buttons />
            </div>
          ) : (
            <svg
              className="animate-spin h-5 w-5 mr-3 ..."
              viewBox="0 0 24 24"
            />
          )}
        </div>
      </Layout>
    </BackgroundImage>
  )
}
