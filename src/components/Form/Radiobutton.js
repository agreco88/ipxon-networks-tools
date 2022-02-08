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
          className="form-radio focus:ring-ipxonLighterMagenta h-4 w-4 accent-pink-500 checked:bg-ipxonLighterMagenta border-gray-300"
          defaultChecked
          value={value}
          id={value}
          onClick={handleCommandChange}
        />
      ) : (
        <input
          type="radio"
          name={name}
          className="form-radio focus:ring-ipxonLighterMagenta h-4 w-4 accent-pink-500 checked:text-ipxonLighterMagenta border-gray-300"
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

{
  /* <input
id={notificationMethod.id}
name="notification-method"
type="radio"
defaultChecked={notificationMethod.id === 'email'}
className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
/> */
}
