/* This example requires Tailwind CSS v2.0+ */
import React, { useState, Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Flag from "react-world-flags"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export default function LanguageDropdown() {
  const languages = [
    { name: "english", code: "EN", flag: "US" },
    { name: "spanish", code: "ES", flag: "ES" },
  ]

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])

  return (
    <Menu as="div" className="relative inline-block text-left z-50">
      <div>
        <Menu.Button className="inline-flex items-center gap-2 justify-center w-full rounded-full border bg-transparent text-white shadow-sm px-3 py-1 text-sm font-medium   focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-gray-100 focus:ring-white">
          <Flag
            className="h-6 w-6 rounded-lg"
            margin="0"
            code={selectedLanguage.flag}
            key={selectedLanguage.name}
          />
          {selectedLanguage.code}
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="border-1 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-ipxonBrown border-1 border-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
          <div className="py-1 border-1 border-white">
            {languages.map(language => (
              <Menu.Item key={language.code}>
                {({ active }) => (
                  <a
                    href="#"
                    onClick={() => setSelectedLanguage(language)}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-white",
                      "group flex items-center px-4 py-2 gap-2 text-sm"
                    )}
                  >
                    <Flag
                      className="h-6 w-6 rounded-lg"
                      margin="0"
                      code={language.flag}
                      key={language.code}
                    />
                    {language.name.toUpperCase()}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
