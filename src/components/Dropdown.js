import React, { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid"
import Flag from "react-world-flags"

export default function Dropdown({ sites, site, onChangeHandler }) {
  return (
    <Listbox value={site} onChange={onChangeHandler}>
      <div className="relative">
        <Listbox.Button className="z-50 relative w-full py-2.5 pl-4 pr-10 text-left rounded-full shadow-md cursor-default border-white border">
          <span className="flex gap-2 items-center truncate">
            <Flag
              className="h-6 w-6"
              margin="0"
              code={site.flag}
              key={site.flag}
            />
            {site.desc}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="z-50 absolute w-full bg-gray-800 py-1 mt-1 overflow-auto text-base rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {sites.map((site, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `${active ? "text-amber-900 bg-amber-100" : "text-white"}
                                    cursor-default select-none relative py-2 pl-3.5 pr-4`
                }
                value={site}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`flex gap-2 items-center ${
                        selected ? "font-medium" : "font-normal"
                      } block truncate`}
                    >
                      <Flag
                        className="h-6 w-6"
                        margin="0"
                        code={site.flag}
                        key={site.flag}
                      />{" "}
                      {site.desc}
                    </span>
                    {selected ? (
                      <span
                        className={`${
                          active ? "text-amber-600" : "text-amber-600"
                        }
                                          absolute inset-y-0 left-0 flex items-center pl-3`}
                      >
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
