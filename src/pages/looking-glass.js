import React, { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Radiobutton from "../components/Form/Radiobutton"
import Dropdown from "../components/Dropdown"
import Input from "../components/Form/Input"
import Toggle from "../components/Form/Toggle"
import Map from "../components/Map"

import ErrorMessage from "../components/ErrorMessage"
import { Spinner } from "../components/Spinner"
import BeatLoader from "react-spinners/BeatLoader"
import MoonLoader from "react-spinners/MoonLoader"

import { css } from "@emotion/react"
import { Response } from "../components/Response"
import IpxonPopMap from "../images/bg-lookingGlass.svg"

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`

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
  const [DnsResolver, setDnsResolver] = useState(false)
  const [AsLookup, setAsLookup] = useState(false)
  const [ShowIps, setShowIps] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [dropdownSites, setDropdownSites] = useState()
  const [loadingIp, setLoadingIp] = useState(false)
  // const [lastResponse, setLastResponse] = useState(false)

  const getSites = async () => {
    await axios
      .get(`https://api.ipxon.net/public/lg/sites`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(response => {
        setSites(response.data)
        setDropdownSites(response.data)
        console.log("Fetched sites:", response.data)
      })
      .catch(error => {
        console.log(error)
        setErrorMessage(error)
      })
  }

  const executeCommand = async event => {
    event.preventDefault()
    setResponse(null)
    switch (command) {
      case "ping":
        setErrorMessage("")
        setLoading(true)
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
            setLoading(false)
          })
          .catch(function (error) {
            if (error.message.includes("400")) {
              //TODO TOKEN REFRESH HERE
              window.grecaptcha.reset()
              setErrorMessage(
                "Recaptcha expired. Please click on the captcha again and retry."
              )
              setLoading(false)
              //
            }
          })
        break
      case "mtr":
        setErrorMessage("")
        setLoading(true)
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
            setLoading(false)
          })
          .catch(function (error) {
            if (error.message.includes("400")) {
              //TODO TOKEN REFRESH HERE
              window.grecaptcha.reset()
              setErrorMessage(
                "Recaptcha expired. Please click on the captcha again and retry."
              )
              setLoading(false)
              //
            }
          })
        break
      case "traceroute":
        setErrorMessage("")
        setLoading(true)
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
            setLoading(false)
          })
          .catch(function (error) {
            if (error.message.includes("400")) {
              //TODO TOKEN REFRESH HERE
              window.grecaptcha.reset()
              setErrorMessage(
                "Recaptcha expired. Please click on the captcha again and retry."
              )
              setLoading(false)
              //
            }
          })
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
    setDnsResolver(false)
    setAsLookup(false)
    setShowIps(false)
    setResponse("")
  }

  const handleDestinationChange = e => {
    setDestination(e.currentTarget.value)
  }

  const getClientIp = async () => {
    setLoadingIp(true)
    const res = await axios.get("https://geolocation-db.com/json/")
    setDestination(res.data.IPv4)
    setLoadingIp(false)
  }

  const handlePacketCountChange = e => {
    setPacketCount(e.currentTarget.value)
  }

  const handleDnsChange = enabled => {
    setDnsResolver(enabled)
  }

  const handleAsLookupChange = enabled => {
    setAsLookup(enabled)
  }

  const handleShowIpsChange = enabled => {
    setShowIps(enabled)
  }

  useEffect(() => {
    getSites()
  }, [])

  return (
    <Layout>
      <SEO title="Looking glass" />
      <div className="text-white items-center flex h-screen flex-col gap-4 md:flex-row container mx-auto w-full">
        {sites && (
          <>
            <form
              onSubmit={executeCommand}
              className="flex flex-col gap-8 h-screen rounded-lg transition-all p-4 w-1/3"
            >
              <div className="radiobuttons flex flex-col gap-3">
                <label htmlFor="command" className="font-bold">
                  1. Command
                </label>
                <div className="flex gap-3 justify-around">
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
              <div className="flex flex-col gap-4 bg-ipxonGray p-2 rounded-lg">
                {command ? (
                  command == "ping" ? (
                    <div className="">
                      <Input
                        inputLabel={"Specify packet count"}
                        inputValue={packetCount}
                        inputPlaceholder={"10"}
                        onChangeHandler={handlePacketCountChange}
                      />
                    </div>
                  ) : null
                ) : null}

                {command ? (
                  command == "traceroute" ? (
                    <div className="">
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
                    <div className="">
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
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex gap-8">
                  <div className="siteDropdown flex flex-col gap-2 w-full">
                    <label htmlFor="site" className="flex text-white font-bold">
                      2. Source
                    </label>
                    {dropdownSites && (
                      <Dropdown
                        sites={dropdownSites}
                        site={site}
                        onChangeHandler={setSite}
                      />
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="destination"
                    className="flex justify-between text-white font-bold"
                  >
                    <span className="gap-2 flex">
                      3. Destination <span className="font-normal">|</span>
                      <span>
                        <button
                          onClick={() => getClientIp()}
                          disabled={loadingIp}
                          className="text-ipxonLightMagenta hover:text-ipxonLighterMagenta"
                        >
                          Set my own IP
                        </button>
                      </span>
                    </span>
                  </label>
                  <div className="flex rounded-full">
                    {loadingIp ? (
                      <button
                        type="button"
                        className="z-40 w-full flex py-2.5 pl-4 pr-10 text-left rounded-r-none rounded-l-full shadow-md  border-white border"
                        disabled
                      >
                        <span className="animate-pulse">
                          <BeatLoader
                            color={"#FFF"}
                            loading={loadingIp}
                            css={override}
                            size={10}
                            margin={2}
                          />
                        </span>
                      </button>
                    ) : (
                      <input
                        type="text"
                        value={destination}
                        placeholder="1.1.1.1"
                        onChange={handleDestinationChange}
                        className="z-40 w-full py-2.5 pl-4 pr-10 bg-transparent text-left rounded-r-none rounded-l-full shadow-md  border-white border"
                      ></input>
                    )}

                    {command && captchatoken && site && destination ? (
                      <button
                        disabled={loading && "disabled"}
                        className="bg-ipxonLightMagenta transition-all duration-500 hover:bg-ipxonLighterMagenta h-full w-3/5 border-2 border-white justify-center rounded-r-full flex items-center"
                      >
                        EXECUTE
                      </button>
                    ) : (
                      <button
                        disabled="disabled"
                        className="bg-gray-800 w-3/5 h-full border black disabled justify-center rounded-r-full flex items-center"
                      >
                        <span className="opacity-25">EXECUTE</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex">
                <ReCAPTCHA
                  sitekey="6Lcyv9gdAAAAAJ1s607OJy87WKY2g0s8xdufNRSW"
                  onChange={onCaptchaChange}
                  theme="dark"
                />
              </div>
            </form>

            <div className="flex flex-col gap-4 h-full rounded-lg transition-all w-2/3">
              <div className="h-1/2 flex flex-col w-2/3 self-start">
                <h3 className="text-2xl text-ipxonLighterMagenta to-ipxonLightMagenta via-ipxonViolet font-thin uppercase py-4">
                  Welcome to presence
                </h3>
                <div className="relative flex justify-start items-center">
                  <img src={IpxonPopMap} className="" />
                </div>
              </div>

              <div
                className={`${
                  errorMessage || response || loading
                    ? "bg-ipxonGray p-8 flex justify-start rounded-lg h-1/2 overflow-auto w-9/12  "
                    : "hidden"
                }`}
              >
                {errorMessage && <ErrorMessage error={errorMessage} />}
                {loading && (
                  <Spinner
                    text="Fetching results..."
                    spinner={
                      <MoonLoader
                        color={"#FF33AD"}
                        loading={true}
                        css={override}
                      />
                    }
                  />
                )}
                {response && (
                  <Response commandType={command} results={response} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  )
}
