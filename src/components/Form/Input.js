import React from "react"
import PropTypes from "prop-types"

const Input = ({
  inputLabel,
  inputPlaceholder,
  inputValue,
  onChangeHandler,
}) => {
  return (
    <div className="flex p-4">
      <label htmlFor={inputValue} className="flex text-white w-full">
        {inputLabel}
      </label>
      <input
        type="text"
        value={inputValue}
        placeholder={inputPlaceholder}
        className="
          w-1/4 relative z-40 text-center 
          rounded-full bg-transparent 
          text-white border"
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
