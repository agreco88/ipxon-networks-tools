import React from "react"
import { useState } from "react"

export default function Toggle({ label, value, onChangeHandler }) {
  const [checked, setChecked] = useState(value)

  return (
    <div>
      <div className="form-control">
        <label className="cursor-pointer label flex gap-4">
          <span>{label}</span>
          <input
            type="checkbox"
            defaultChecked
            value={value}
            onChange={onChangeHandler}
            className="toggle toggle-secondary"
          />
        </label>
      </div>
    </div>
  )
}
