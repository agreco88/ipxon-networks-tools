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
  const [DnsResolver, setDnsResolver] = useState(true)
  const [AsLookup, setAsLookup] = useState(true)
  const [ShowIps, setShowIps] = useState(true)
  const [loading, setLoading] = useState(false)

  const getSites = async () => {
    setLoading(true)
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
      .finally(setLoading(false))
  }

  const executeCommand = async event => {
    setLoading(true)
    event.preventDefault()
    switch (command) {
      case "ping":
        await axios
          .post(
            `https://api.ipxon.net/public/lg/ping?source=${site.id}&target=${destination}&captchatoken=${captchatoken}&count=${packetCount}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(response => {
            console.log("Ping response:", response.data.result)
            setResponse(response.data.result)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(setLoading(false))

        break
      case "mtr":
        await axios
          .post(
            `https://api.ipxon.net/public/lg/mtr?source=${site.id}&target=${destination}&captchatoken=${captchatoken}&resolver=${DnsResolver}&aslookup=${AsLookup}&showips=${ShowIps}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(response => {
            console.log("MTR response:", response.data.result)
            setResponse(response.data.result)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(setLoading(false))
        break
      case "traceroute":
        await axios
          .post(
            `https://api.ipxon.net/public/lg/traceroute?source=${site.id}&target=${destination}&captchatoken=${captchatoken}&resolver=${DnsResolver}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then(response => {
            console.log("Traceroute response:", response.data.result)
            setResponse(response.data.result)
          })
          .catch(error => {
            console.log(error)
          })
          .finally(setLoading(false))

        break
      default:
      // code block
    }
  }

  function onCaptchaChange(value) {
    setCaptchaToken(value)
  }

  const handleCommandChange = e => {
    setCommand(e.currentTarget.value)
    setResponse("")
  }

  const handleDestinationChange = e => {
    setDestination(e.currentTarget.value)
  }

  const handlePacketCountChange = e => {
    setPacketCount(e.currentTarget.value)
  }

  const handleDnsChange = e => {
    setDnsResolver(e.target.checked)
  }

  const handleAsLookupChange = e => {
    setAsLookup(e.target.checked)
  }

  const handleShowIpsChange = e => {
    setShowIps(e.target.checked)
  }

  useEffect(() => {
    getSites()
  }, [])

  return (
    <Layout>
      <SEO title="Looking glass" />
      <div className="text-white flex flex-col container mx-auto h-screen ">
        <div className="flex">
          <form onSubmit={executeCommand} className="flex justify-center py-16">
            <div className="flex flex-col self-center gap-8 rounded-lg transition-all">
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
                    value={"mtr"}
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
                  <div className="flex flex-col gap-4">
                    <Toggle
                      label={"Reverse DNS resolver"}
                      toggleValue={DnsResolver}
                      onChangeHandler={handleDnsChange}
                    />
                  </div>
                ) : null
              ) : null}

              {command ? (
                command == "mtr" ? (
                  <div className="flex flex-col gap-4">
                    <Toggle
                      label={"Reverse DNS resolver"}
                      value={DnsResolver}
                      onChangeHandler={handleDnsChange}
                    />
                    <Toggle
                      label={"Lookup ASN"}
                      value={AsLookup}
                      onChangeHandler={handleAsLookupChange}
                    />
                    <Toggle
                      label={"Show IPs"}
                      value={ShowIps}
                      onChangeHandler={handleShowIpsChange}
                    />
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
                </div>
                <div className="flex justify-center">
                  <ReCAPTCHA
                    sitekey="6Lcyv9gdAAAAAJ1s607OJy87WKY2g0s8xdufNRSW"
                    onChange={onCaptchaChange}
                    theme="dark"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="flex bg-gray-400 w-full m-16 mr-0 rounded-lg">
            TODO MAP
          </div>
        </div>
        <div className="flex">
          <div className="result flex w-full flex-col gap-4 bg-gradient-to-t from-black to-pink-700 mt-4 mb-12 p-8 rounded-lg">
            <h2 className="text-4xl uppercase">{command} Results:</h2>
            {loading ? <p>Loading</p> : null}
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
      </div>
    </Layout>
  )
}
