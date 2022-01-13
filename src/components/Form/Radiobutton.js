import React from "react"
import PropTypes from "prop-types"

const Radiobutton = ({ name, value, handleCommandChange }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="label-text text-white cursor-default">
        {value.toUpperCase()}
      </span>
      {value == "ping" ? (
        <input
          type="radio"
          name={name}
          className="radio radio-secondary"
          defaultChecked
          value={value}
          id={value}
          onClick={handleCommandChange}
        />
      ) : (
        <input
          type="radio"
          name={name}
          className="radio radio-secondary"
          value={value}
          id={value}
          onClick={handleCommandChange}
        />
      )}
    </div>
  )
}

Radiobutton.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleCommandChange: PropTypes.func,
}

export default Radiobutton
