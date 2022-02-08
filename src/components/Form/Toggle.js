import React, { useState } from "react"
import { Switch } from "@headlessui/react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function Toggle({ label, value, onChangeHandler }) {
  console.log("Toggle props:", label, value, onChangeHandler)
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="flex justify-between p-4">
      <label>{label}</label>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? "bg-ipxonLighterMagenta" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ipxonLightMagenta"
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
    </div>
  )
}

// import React from "react"
// import { useState } from "react"

// export default function Toggle({ label, value, onChangeHandler }) {
//   const [checked, setChecked] = useState(value)

//   return (
//     <div className="form-control ">
//       <div className="cursor-pointer label flex gap-4">
//         <label>{label}</label>
//         <input
//           type="checkbox"
//           value={value}
//           onChange={onChangeHandler}
//           className="toggle text-ipxonLightMagenta"
//         />
//       </div>
//     </div>
//   )
// }
