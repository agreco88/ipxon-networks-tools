import React, { useEffect, useState } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"

import tvIcon from "../images/icon-teamviewer.svg"
import adIcon from "../images/icon-anydesk.svg"

export default function WhatsMyIp() {
  const [ip, setIP] = useState()

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/")
    setIP(res.data.IPv4)
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <Layout>
      <SEO title="What is my IP" />
      <div className="h-screen text-white flex justify-center">
        {ip ? (
          <div className="flex flex-col justify-center w-3/4 text-center gap-1">
            <div className="flex flex-col">
              <h2 className="text-sm">Su direccion IP es:</h2>
              <h2 className="font-extrabold text-4xl">{ip}</h2>
              <h3 className="pt-4">
                <span className="pt-1 font-thin border-t border-ipxonLightMagenta">
                  Comparta la IP con el{" "}
                  <span className="font-bold">soporte tecnico de IPXON</span>
                </span>
              </h3>
              <div className="flex flex-col justify-center pt-8 text-white">
                <h4>Downloads - Support Tools</h4>
                <div className="flex justify-around w-1/2 md:w-1/3 mt-8 rounded-full bg-gray-500 self-center">
                  <a
                    href="https://www.teamviewer.com/en-us"
                    target="_blank"
                    className="flex items-center"
                  >
                    <span>Teamviewer</span>
                    <StaticImage
                      src="../images/icon-anydesk.svg"
                      alt="Anydesk icon"
                      placeholder="blurred"
                      layout="fixed"
                    />
                  </a>
                  <span className="text-center justify-center text-3xl rounded-full bg-white my-2 w-0.5"></span>
                  <a
                    href="https://anydesk.com/en"
                    target="_blank"
                    className="flex items-center"
                  >
                    <span>AnyDesk</span>
                    <StaticImage
                      src="../images/icon-anydesk.svg"
                      alt="Anydesk icon"
                      placeholder="blurred"
                      layout="fixed"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
          ></svg>
        )}
      </div>
    </Layout>
  )
}
