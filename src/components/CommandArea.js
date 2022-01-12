import React, { useState } from "react"
import { RadioGroup } from "@headlessui/react"

const plans = [
  {
    name: "Ping",
  },
  {
    name: "Traceroute",
  },
  {
    name: "MTR",
  },
]

export default function CommandArea() {
  const [selected, setSelected] = useState(plans[0])

  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">Ping</span>
        <input
          type="radio"
          name="command"
          defaultChecked
          className="radio radio-secondary"
          value="ping"
          id="ping"
        />
      </label>
      <label className="cursor-pointer label">
        <span className="label-text">Traceroute</span>
        <input
          type="radio"
          name="command"
          defaultChecked
          className="radio radio-secondary"
          value="traceroute"
          id="traceroute"
        />
      </label>
      <label className="cursor-pointer label">
        <span className="label-text">MRT</span>
        <input
          type="radio"
          name="command"
          defaultChecked
          className="radio radio-secondary"
          value="mrt"
          id="mrt"
        />
      </label>
    </div>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
