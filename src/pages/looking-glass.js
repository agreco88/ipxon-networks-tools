import React, { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Radiobutton from "../components/Form/Radiobutton"
import Dropdown from "../components/Dropdown"
import Input from "../components/Form/Input"
import Toggle from "../components/Form/Toggle"

import Message from "../components/Message"
import { Spinner } from "../components/Spinner"
import BeatLoader from "react-spinners/BeatLoader"
import MoonLoader from "react-spinners/MoonLoader"

import { ChevronDoubleLeftIcon } from "@heroicons/react/outline"

import { css } from "@emotion/react"
import { Response } from "../components/Response"
import mainBackground from "../images/bg-ipxon.svg"
import { AnchorLink } from "gatsby-plugin-anchor-links"

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
  const [message, setMessage] = useState("")
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
      })
      .catch(error => {
        console.log(error)
        setMessage(error)
      })
  }

  const executeCommand = async event => {
    event.preventDefault()
    setResponse(null)
    switch (command) {
      case "ping":
        setMessage("")
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
            setResponse(response.data.result)
            setLoading(false)
          })
          .catch(function (error) {
            if (error.message.includes("400")) {
              //TODO TOKEN REFRESH HERE
              window.grecaptcha.reset()
              setMessage(
                "Recaptcha expired. Please click on the captcha again and retry."
              )
              setCaptchaToken("")
              setLoading(false)
              //
            }
          })
        break
      case "mtr":
        setMessage("")
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
            setResponse(response.data.result)
            setLoading(false)
          })
          .catch(function (error) {
            if (error.message.includes("400")) {
              //TODO TOKEN REFRESH HERE
              window.grecaptcha.reset()
              setMessage(
                "Recaptcha expired. Please click on the captcha again and retry."
              )
              setCaptchaToken("")
              setLoading(false)
              //
            }
          })
        break
      case "traceroute":
        setMessage("")
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
            setResponse(response.data.result)
            setLoading(false)
          })
          .catch(function (error) {
            if (error.message.includes("400")) {
              //TODO TOKEN REFRESH HERE
              window.grecaptcha.reset()
              setMessage(
                "Recaptcha expired. Please click on the captcha again and retry."
              )
              setCaptchaToken("")
              setLoading(false)
              //
            }
          })
        break
      default:
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
    setMessage("")
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
    <div
      style={{
        backgroundImage: `url(${mainBackground})`,
        backgroundSize: `cover`,
        height: `screen`,
      }}
    >
      <Layout>
        <SEO title="Looking glass" />
        <div className="z-50 text-white p-0 flex h-full md:h-80vh flex-col gap-4 md:flex-row container mx-auto w-full overflow-hidden">
          {sites && (
            <>
              <form
                // onSubmit={executeCommand}
                className="flex flex-col gap-8 rounded-lg transition-all p-4 w-full md:w-1/3 order-1"
                id="form"
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
                      <label
                        htmlFor="site"
                        className="flex text-white font-bold"
                      >
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
                            className="text-ipxonLightMagenta hover:text-ipxonLighterMagenta transition duration-150 ease-in"
                          >
                            Set my own IP
                          </button>
                        </span>
                      </span>
                    </label>
                    <div className="flex h-10 rounded-full">
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
                          className="z-40 w-full py-2.5 pl-4 pr-10 bg-transparent h-full text-left rounded-r-none rounded-l-full shadow-md  border-white border"
                        />
                      )}

                      {command && captchatoken && site && destination ? (
                        <AnchorLink
                          to={"/looking-glass/#result"}
                          className="bg-ipxonLightMagenta transition-all duration-500 hover:bg-ipxonLighterMagenta hover:border-ipxonLighterMagenta h-full w-3/5 border-2 border-ipxonLightMagenta justify-center rounded-r-full flex items-center cursor-pointer"
                        >
                          <button
                            onClick={executeCommand}
                            disabled={loading && "enabled"}
                            className="w-full h-full rounded-r-full"
                          >
                            EXECUTE
                          </button>
                        </AnchorLink>
                      ) : (
                        <button
                          disabled="disabled"
                          className="bg-gray-800 w-3/5 h-full border black disabled justify-center rounded-r-full flex items-center"
                        >
                          <span className="opacity-20">EXECUTE</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-start">
                  <ReCAPTCHA
                    sitekey="6Lcyv9gdAAAAAJ1s607OJy87WKY2g0s8xdufNRSW"
                    onChange={onCaptchaChange}
                    theme="dark"
                  />
                  {captchatoken === "" && (
                    <div className="w-full md:justify-evenly gap-1 p-4 flex items-center animate-pulse text-ipxonLightMagenta text-sm font-thin transition-all duration-500">
                      <ChevronDoubleLeftIcon className="h-6 w-1/3 hidden md:flex" />
                      <span className="uppercase">Captcha required</span>
                    </div>
                  )}
                </div>
              </form>

              <div className="flex flex-col gap-8 h-full rounded-lg transition-all max-w-5xl order-1 pt-0 p-2 md:p-4">
                <div className="h-full flex flex-col md:w-5/6 self-center md:self-end gap-4 ">
                  <div className="flex flex-col gap-2 self-center">
                    <h3 className="text-xl text-ipxonLighterMagenta to-ipxonLightMagenta via-ipxonViolet font-thin uppercase pt-4 hidden md:flex">
                      Welcome to presence
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base md:w-5/6 pt-4 pb-8 px-4 md:px-0 md:py-0">
                      Access an extensive network with more than 14 datacenters
                      providing <b>low-latency</b> solutions in strategic
                      locations throughout LATAM.
                    </p>
                  </div>
                  <div
                    id="result"
                    className="bg-ipxonGray w-full p-4 md:p-8 flex justify-center rounded-lg h-96 md:h-full md:max-h-96 items-center overflow-auto self-center border-2 border-white border-opacity-10"
                  >
                    {message && <Message text={message} type={"error"} />}
                    {response === "" && message === "" && (
                      <Message
                        text={
                          "Set your commands in order to try our network and services"
                        }
                      />
                    )}

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
                  <div className={`${"flex justify-end"} `}>
                    <a
                      className={`
                      flex items-center
                      justify-center
                      w-full
                      mb-20 md:mb-0
                      md:w-3/12 
                      uppercase bg-transparent 
                      font-bold  
                      hover:bg-transparent border
                      text-ipxonLighterMagenta md:text-gray-200
                      bg-white md:bg-transparent hover:bg-white
                      hover:text-ipxonLighterMagenta 
                      border-gray-200 
                      h-10 rounded-full 
                      transition duration-500 ease-in-out
                      self-end
                    `}
                      href="https://www.ipxon.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Buy services
                    </a>{" "}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Layout>
    </div>
  )
}
