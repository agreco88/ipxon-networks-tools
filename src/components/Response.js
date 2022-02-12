import React, { useState } from "react"
import PropTypes from "prop-types"

export const Response = ({ commandType, results }) => {
  const [copiedResult, setCopiedResult] = useState(false)

  function handleCopiedResult() {
    setCopiedResult(true)
    navigator.clipboard.writeText(results)
  }

  return (
    <div className="result h-full px-1 flex flex-col w-full gap-4 overflow-scroll">
      <div className="text-4xl flex justify-between uppercase text-white">
        <div className="text-3xl font-bold">{commandType} result:</div>
        <button
          className="Copy button flex justify-center items-center gap-2 pr-4 active:text-ipxonLightMagenta focus:text-ipxonLightMagenta hover:text-ipxonLighterMagenta"
          onClick={() => {
            handleCopiedResult()
          }}
        >
          {copiedResult && (
            <span className="text-ipxonLightMagenta text-xs ">COPIED</span>
          )}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-full"
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
        </button>
      </div>
      <ul className="text-white text-sm leading-8">
        {results.map((line, lineIdx) => (
          <li key={lineIdx}>{line}</li>
        ))}
      </ul>
    </div>
  )
}

Response.propTypes = {
  commandType: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
}
