import React from "react"
import PropTypes from "prop-types"

export const ErrorMessage = ({ error }) => {
  return (
    <div className="container mx-auto text-xs">
      <div className="flex flex-col w-full h-full items-center gap-6 justify-center">
        <div className="font-thin text-2xl text-white text-center">{error}</div>
      </div>
    </div>
  )
}

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
}

export default ErrorMessage
