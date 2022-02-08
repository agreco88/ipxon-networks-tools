import React from "react"
import PropTypes from "prop-types"

export const Spinner = ({ text, spinner }) => {
  return (
    <div className="flex flex-col w-full h-full items-center gap-6 justify-center">
      <div className="animate-pulse font-thin text-2xl text-white">{text}</div>
      {spinner}
    </div>
  )
}

Spinner.propTypes = {
  text: PropTypes.string.isRequired,
}
