import React from "react"
import PropTypes from "prop-types"

const Input = ({
  inputLabel,
  inputPlaceholder,
  inputValue,
  onChangeHandler,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={inputValue} className="flex justify-start text-white">
        {inputLabel}
      </label>
      <input
        type="text"
        value={inputValue}
        placeholder={inputPlaceholder}
        className="relative z-40 w-full py-3 pl-3 pr-10 text-left rounded-full bg-transparent border border-white text-white shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
        onChange={onChangeHandler}
      />
    </div>
  )
}

Input.propTypes = {
  inputLabel: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChangeHandler: PropTypes.func,
}

export default Input
