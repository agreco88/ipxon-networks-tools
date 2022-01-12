import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { StaticImage } from "gatsby-plugin-image"

function Header({ siteTitle }) {
  const navigation = [
    { name: "IP Tool", to: "/whats-my-ip" },
    { name: "Looking Glass", to: "/looking-glass" },
    { name: "Link 3", to: "/" },
    { name: "Link 4", to: "/" },
  ]

  return (
    <nav className="bg-black">
      <Popover>
        {({ open }) => (
          <>
            <div className="relative z-20 container mx-auto flex items-center p-2 md:p-8">
              <div className="px-3 md:px-0 flex items-center justify-between w-full md:w-auto">
                <Link to="/" className="relative text-white text-2xl">
                  <StaticImage
                    src="../images/icon-ipxon.svg"
                    alt="IPXON Networks"
                    placeholder="blurred"
                    layout="fixed"
                  />
                </Link>
                {/* HAMBURGER MENU (CLOSED) */}
                <div className="mr-2  md:hidden">
                  <Popover.Button className="z-50 bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-100 hover:text-pink-600 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-gray-200">
                    <span className="sr-only">Open navigation menu</span>
                    <MenuIcon className="h-6 w-6" />
                  </Popover.Button>
                </div>
              </div>
              <div className="flex items-center flex-1 justify-end">
                {/* NAV ITEMS */}
                <ul className="hidden md:flex md:gap-8  px-16 py-4">
                  {navigation.map(navlink => (
                    <li className="justify-center" key={navlink.name}>
                      <Link
                        to={navlink.to}
                        className="
                        transition duration-500 ease-in-out
                        text-sm
                        font-semibold
                        text-gray-200
                        "
                      >
                        {navlink.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* HAMBURGER MENU (EXPANDED) */}
            <Transition
              show={open}
              as={Fragment}
              enter="duration-150 ease-out"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="duration-100 ease-in"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                focus
                static
                className="z-50 absolute top-1 inset-x-0 p-2 transition transform origin-top-right md:hidden"
              >
                <div className="bg-gray-900 rounded-lg shadow-md ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="px-5 pt-4 flex items-center justify-between">
                    <div>
                      {/* <img className="h-8 w-auto" src={logoColor} alt="" /> */}
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                  <ul className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map(item => (
                      <li key={item.name}>
                        <a
                          href={item.to}
                          className="block uppercase px-3 py-4 rounded-md text-base font-medium text-gray-50 hover:bg-gray-700"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Popover.Panel>
            </Transition>
            {/* TOGGLED HAMBURGER MENU ITEMS */}
          </>
        )}
      </Popover>
    </nav>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
