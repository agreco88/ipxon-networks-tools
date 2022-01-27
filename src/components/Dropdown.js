import React, { Fragment } from "react"
import { Listbox, Transition } from "@headlessui/react"
import { SelectorIcon } from "@heroicons/react/solid"
import Flag from "react-world-flags"

export default function Dropdown({ sites, site, onChangeHandler }) {
  return (
    <Listbox value={site} onChange={onChangeHandler}>
      <div className="relative">
        <Listbox.Button className="z-50 relative w-full py-2.5 pl-4 pr-10 text-left rounded-full shadow-md cursor-default border-white border">
          <span className="flex gap-2 justify-between truncate">
            <span className="flex gap-2">
              <Flag
                className="h-6 w-6"
                margin="0"
                code={site.flag}
                key={site.flag}
              />
              {site.desc}{" "}
            </span>

            {site.ipv6 ? (
              <span className="flex bg-clip-text text-ipxonLightMagenta font-semibold">
                IPV6
              </span>
            ) : (
              <span className="flex"></span>
            )}
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
          <Listbox.Options className="z-50 absolute w-full bg-black border borderwhite py-1 mt-1 text-base rounded-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm overflow-visible">
            {sites.map(site => (
              <Listbox.Option key={site.id} value={site}>
                <>
                  <span
                    className={`flex gap-2 w-full  justify-between items-center truncate py-2 pl-3.5 pr-4`}
                  >
                    <span className="flex gap-4">
                      <Flag
                        className="h-6 w-6"
                        margin="0"
                        code={site.flag}
                        key={site.flag}
                      />

                      <span className="self-center">{site.desc} </span>
                    </span>

                    {site.ipv6 ? (
                      <span className="flex bg-clip-text text-ipxonLightMagenta text-transparent font-semibold">
                        IPV6
                      </span>
                    ) : (
                      <span className="flex"></span>
                    )}
                  </span>
                </>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}
