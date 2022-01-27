import React, { useEffect, useState } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import axios from "axios"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Radiobutton from "../components/Form/Radiobutton"
import Dropdown from "../components/Dropdown"
import Input from "../components/Form/Input"
import Toggle from "../components/Form/Toggle"

import { css } from "@emotion/react"
import GridLoader from "react-spinners/GridLoader"
import BeatLoader from "react-spinners/BeatLoader"

import Map from "../components/Map"

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
  const [destination, setDestination] = useState("139.130.4.5")
  const [destinationLatitude, setDestinationLatitude] = useState("")
  const [destinationLongitude, setDestinationLongitude] = useState("")
  const [packetCount, setPacketCount] = useState(10)
  const [response, setResponse] = useState("")
  const [DnsResolver, setDnsResolver] = useState(false)
  const [AsLookup, setAsLookup] = useState(false)
  const [ShowIps, setShowIps] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [dropdownSites, setDropdownSites] = useState()
  const [loadingIp, setLoadingIp] = useState(false)

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
      <div className="text-white items-center flex flex-col md:flex-row container mx-auto h-70vh ">
        <form
          onSubmit={executeCommand}
          className="flex flex-col md:w-1/2 mt-8 gap-8 rounded-lg transition-all"
        >
          <div className="radiobuttons flex flex-col gap-3">
            <label htmlFor="command" className="font-bold">
              1. Command
            </label>
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
                    inputLabel={"Specify packet count"}
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
              <div className="flex flex-col gap-4 bg-rose bg-ipxonGray p-2 rounded-lg md:w-1/2">
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
              <div className="flex flex-col gap-4 bg-ipxonGray p-2 rounded-lg md:w-1/2">
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

          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="flex gap-8 w-full md:w-1/2">
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

            <div className="flex flex-col gap-2 w-full md:w-1/2">
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
                      Load my IP
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
                    className="bg-ipxonLightMagenta transition-all duration-150 hover:bg-ipxonLighterMagenta h-max w-3/5 border-2 border-ipxonLightMagenta justify-center rounded-r-full flex items-center"
                  >
                    EXECUTE
                  </button>
                ) : (
                  <button
                    disabled="disabled"
                    className="bg-gray-800 h-max w-3/5 border black disabled justify-center rounded-r-full flex items-center"
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
        <div className="hidden md:flex" style={{ flexGrow: 1 }}>
          {sites && <Map />}
        </div>
      </div>

      <div className="result items-center container flex container h-screen md:h-40vh mx-auto">
        <div className="result-area h-full w-full md:w-1/2 bg-gradient-to-t from-black/25 to-ipxonLightMagenta/25 overflow-auto rounded-lg flex p-8 justify-center	">
          {errorMessage ? (
            <div className="flex flex-col w-full h-full items-center gap-6 justify-center">
              <div className="font-thin text-2xl text-white">
                {errorMessage}
              </div>
            </div>
          ) : null}

          {loading ? (
            <div className="flex flex-col w-full h-full items-center gap-6 justify-center">
              <div className="animate-pulse font-thin text-2xl text-white">
                Fetching results...
              </div>
              <GridLoader color={"#FFF"} loading={loading} css={override} />
            </div>
          ) : null}

          {response && (
            <div className="flex flex-col w-full gap-4">
              <div></div>
              <div className="text-4xl flex justify-between uppercase text-white">
                <div className="text-3xl font-bold">{command} result:</div>
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                    />
                  </svg>
                </div>
              </div>
              <ul className="text-white">
                {response.map((line, lineIdx) => (
                  <li key={lineIdx}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
