import React, { Fragment, useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import Flag from "react-world-flags"

import axios from "axios"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Radiobutton from "../components/Form/Radiobutton"
import Dropdown from "../components/Dropdown"
import Input from "../components/Form/Input"
import Toggle from "../components/Form/Toggle"
// import CommandArea from "../components/CommandArea"

export default function LookingGlass() {
  const [captchatoken, setCaptchaToken] = useState("")
  const [sites, setSites] = useState("")
  const [command, setCommand] = useState("ping")
  const [site, setSite] = useState({
    id: "cordoba",
    flag: "ar",
    country: "ar",
    desc: "Argentina - Cordoba",
    ipv6: false,
  })
  const [destination, setDestination] = useState("1.1.1.1")
  const [packetCount, setPacketCount] = useState(10)
  const [response, setResponse] = useState("")
  const [tracerouteTarget, setTracerouteTarget] = useState("")
  const [tracerouteResolver, setTracerouteResolver] = useState(false)
  const [tracerouteDnsLookup, setTracerouteDnsLookup] = useState(false)
  const [tracerouteShowIps, setTracerouteShowIps] = useState(false)

  const getSites = async () => {
    await axios
      .get(`https://api.ipxon.net/public/lg/sites`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        setSites(response.data)
        console.log("Fetched sites:", response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const pingLocation = async event => {
    event.preventDefault()
    await axios
      .post(
        `https://api.ipxon.net/public/lg/ping?source=${site.id}&target=${destination}&captchatoken=${captchatoken}&count=${packetCount}
      `,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(response => {
        console.log(response.data.result)
        setResponse(response.data.result)
      })
      .catch(error => {
        console.log(error)
      })
  }

  function onChange(value) {
    console.log("Captcha value:", value)
    setCaptchaToken(value)
  }

  const handleCommandChange = e => {
    setCommand(e.currentTarget.value)
  }

  const handleDestinationChange = e => {
    setDestination(e.currentTarget.value)
  }

  const handlePacketCountChange = e => {
    setPacketCount(e.currentTarget.value)
  }

  useEffect(() => {
    getSites()
  }, [])

  return (
    <Layout>
      <SEO title="Looking glass" />
      <div className="text-white flex flex-col container mx-auto h-screen ">
        <div class="grid grid-rows-5 col-span-4 grid-flow-col gap-4 h-screen">
          <div class="col-span-2 row-span-3">
            <form
              onSubmit={pingLocation}
              className="flex flex-col self-center gap-4 rounded-lg"
            >
              <div className="radiobuttons flex flex-col gap-3">
                <label htmlFor="command">1. Command:</label>
                <div className="flex gap-3 justify-start">
                  <Radiobutton
                    name={"command"}
                    value={"ping"}
                    handleCommandChange={handleCommandChange}
                  />
                  <Radiobutton
                    name={"command"}
                    value={"traceroute"}
                    handleCommandChange={handleCommandChange}
                  />
                  <Radiobutton
                    name={"command"}
                    value={"mrt"}
                    handleCommandChange={handleCommandChange}
                  />
                </div>
              </div>

              {command ? (
                command == "ping" ? (
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex flex-col text-gray-500 gap-4">
                      <Input
                        inputLabel={"Specify packet count:"}
                        inputValue={packetCount}
                        inputPlaceholder={"10"}
                        onChangeHandler={handlePacketCountChange}
                      />
                    </div>
                  </div>
                ) : null
              ) : null}

              {command ? (
                command == "traceroute" ? (
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex text-gray-500 gap-4 w-1/2 md:w-2/4">
                      <Input
                        inputLabel={"Target:"}
                        inputValue={tracerouteTarget}
                        inputPlaceholder={"1.1.1.1"}
                        onChangeHandler={handlePacketCountChange}
                      />
                    </div>
                    <div className="flex self-center justify-center">
                      {" "}
                      <Toggle />
                    </div>
                  </div>
                ) : null
              ) : null}

              <div className="flex flex-col gap-8 w-full">
                <div className="flex gap-8">
                  <div className="siteDropdown flex flex-col gap-2 w-full">
                    <label htmlFor="site" className="flex text-white">
                      2. IPXON Site:
                    </label>
                    {sites && (
                      <Dropdown
                        sites={sites}
                        site={site}
                        onChangeHandler={setSite}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="destination"
                    className="flex justify-start text-white"
                  >
                    3. Destination:
                  </label>
                  <div className="bg-pink-800 hover:bg-pink-600 flex rounded-full">
                    <input
                      type="text"
                      value={destination}
                      placeholder="1.1.1.1"
                      onChange={handleDestinationChange}
                      className="z-40 w-full py-2.5 pl-4 pr-10 bg-black text-left rounded-r-none rounded-l-full shadow-md  border-white border"
                    />

                    {command && captchatoken && site && destination ? (
                      <button
                        className="bg-pink-800 h-max w-1/2 border black justify-center rounded-r-full flex items-center
                      "
                      >
                        START
                      </button>
                    ) : (
                      <button
                        disabled="disabled"
                        className="bg-gray-800 h-max w-1/2 border black disabled justify-center rounded-r-full flex items-center"
                      >
                        START
                      </button>
                    )}
                  </div>
                  <div className="flex pt-4">
                    <ReCAPTCHA
                      sitekey="6Lcyv9gdAAAAAJ1s607OJy87WKY2g0s8xdufNRSW"
                      onChange={onChange}
                      theme="dark"
                      className="h-10"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="col-span-2 row-span-2">
            <div className="result flex w-full flex-col gap-4 bg-gradient-to-t from-black to-pink-700 mt-4 mb-12 p-8 rounded-lg">
              <h2 className="text-4xl uppercase">{command} Results:</h2>
              {response ? (
                <ul className="text-white w-1/2">
                  {response.map((line, lineIdx) => (
                    <li key={lineIdx}>{line}</li>
                  ))}
                </ul>
              ) : (
                <h1>NO RESPONSE YET</h1>
              )}
            </div>
          </div>
          <div class="col-span-2 row-span-5 bg-gray-400">MAP SPACE</div>
        </div>
      </div>
    </Layout>
  )
}
