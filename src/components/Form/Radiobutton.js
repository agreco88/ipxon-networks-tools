import React from "react"
import PropTypes from "prop-types"

const Radiobutton = ({ name, value, handleCommandChange }) => {
  return (
    <>
      <span className="label-text">{value.toUpperCase()}</span>
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
    </>
  )
}

Radiobutton.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleCommandChange: PropTypes.func,
}

export default Radiobutton
