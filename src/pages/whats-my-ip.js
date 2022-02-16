import React, { useEffect, useState } from "react"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"

import mainBackground from "../images/bg-ipxon.svg"
import { DuplicateIcon } from "@heroicons/react/outline"
import BeatLoader from "react-spinners/BeatLoader"

import { css } from "@emotion/react"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

const Buttons = () => {
  return (
    <div className="flex flex-col justify-center text-white gap-4">
      <div className="flex justify-around mt-8 w-1/2 h-10 rounded-full bg-gray-500 self-center">
        <a
          href="https://www.teamviewer.com/en-us/download/"
          target="_blank"
          rel="noreferrer"
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
          href="https://anydesk.com/en/downloads/"
          target="_blank"
          rel="noreferrer"
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
  const [loading, setLoading] = useState(true)
  const [ip, setIP] = useState()

  const getData = async () => {
    const res = await axios.get("https://geolocation-db.com/json/")
    setIP(res.data.IPv4)
    setLoading(false)
  }

  useEffect(() => {
    getData()
  }, [])

  function handleCopiedResult() {
    navigator.clipboard.writeText(ip)
  }

  return (
    <div
      style={{
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: `cover`,
      }}
    >
      <Layout>
        <SEO title="What is my IP" />
        <div className="text-white w-full p-8 md:p-0 mx-auto container justify-center items-center flex flex-col h-80vh">
          <div className="flex flex-col justify-center w-1/2 text-center gap-1 h-96">
            <div className="w-1/2 relative border-b py-2 border-ipxonLighterMagenta justify-center items-center self-center">
              <h2 className="flex flex-col">
                Your IP address is:
                <span className="flex">
                  <span className="flex-1 font-bold text-4xl">
                    {loading ? (
                      <BeatLoader
                        color={"#FFF"}
                        loading={true}
                        css={override}
                      />
                    ) : (
                      ip
                    )}
                  </span>
                </span>
              </h2>
            </div>
            <div className=" w-1/2 mt-1 self-center text-xs flex items-center justify-around transition duration-500 ease-in-out active:text-ipxonLightMagenta focus:text-ipxonLightMagenta hover:text-ipxonLighterMagenta ">
              <span>Copy and share this info with IPXON Technical Support</span>
              <div className="flex flex-col">
                {" "}
                <DuplicateIcon
                  className="h-8 cursor-pointer"
                  onClick={handleCopiedResult}
                />{" "}
              </div>
            </div>
            <Buttons />
          </div>
        </div>
      </Layout>
    </div>
  )
}
