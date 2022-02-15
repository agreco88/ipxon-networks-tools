import React from "react"
import PropTypes from "prop-types"

const ErrorMessage = ({ text }) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col w-full h-full items-center gap-6 justify-center">
        <div className="font-thin text-2xl text-white text-center">{text}</div>
      </div>
    </div>
  )
}

export const Message = ({ text, type }) => {
  return type === "error" ? (
    <ErrorMessage text={text} />
  ) : (
    <div className="container mx-auto text-xs">
      <div className="flex flex-col w-full h-full items-center gap-6 justify-center">
        <div className="font-thin text-base text-gray-300 opacity-50 text-center">
          {text}
        </div>
      </div>
    </div>
  )
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Message
