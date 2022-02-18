import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import ipxonLogo from "../images/icon-ipxon.svg"

function Header({ siteTitle }) {
  const navigation = [
    { name: "Get my IP Address", to: "/whats-my-ip" },
    { name: "Looking Glass", to: "/looking-glass" },
  ]

  return (
    <nav className="h-10vh">
      <Popover>
        {({ open }) => (
          <>
            <div className="relative pt-2 md:px-0 z-20 container mx-auto flex items-center self-center text-white">
              <div className="px-4 md:px-0 flex items-center justify-between w-full md:w-auto">
                <Link to="/" className="relative text-white text-2xl">
                  <img
                    className="h-16 w-auto self-center"
                    src={ipxonLogo}
                    alt="IPXON Networks"
                  />
                </Link>
                {/* HAMBURGER MENU (CLOSED) */}
                <div className="mr-2  md:hidden">
                  <Popover.Button className="z-50 bg-ipxonGray rounded-md p-2 inline-flex items-center justify-center text-gray-100 hover:text-pink-600 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-gray-200">
                    <span className="sr-only">Open navigation menu</span>
                    <MenuIcon className="h-6 w-6" />
                  </Popover.Button>
                </div>
              </div>
              <div className="flex items-center flex-1 justify-end">
                {/* NAV ITEMS */}
                <ul className="hidden md:flex md:gap-8 py-4">
                  {navigation.map(navlink => (
                    <li className="justify-center" key={navlink.name}>
                      <Link
                        to={navlink.to}
                        className="
                        transition duration-500 ease-in-out
                        text-sm
                        font-thin
                        text-gray-200
                        hover:border-b-2
                        hover:border-ipxonLighterMagenta
                        active:text-ipxonLighterMagenta
                        focus:text-ipxonLighterMagenta  
                        "
                        activeClassName="border-b-2 border-ipxonLighterMagenta"
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
                <div className="bg-black rounded-lg shadow-md ring-1 border-white border ring-opacity-5 overflow-hidden">
                  <div className="p-5 pb-0 flex items-center justify-between">
                    <img
                      className="px-4 h-12 w-auto self-center"
                      src={ipxonLogo}
                      alt="IPXON Networks"
                    />
                    <Popover.Button className="bg-ipxonBrown rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-pink-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200">
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                  <ul className="p-5 h-32 flex flex-col justify-around">
                    {navigation.map(item => (
                      <Link
                        to={item.to}
                        className="
                          transition duration-500 ease-in-out
                          text-sm
                          font-thin
                          uppercase
                          text-gray-200
                          hover:border-ipxonLighterMagenta
                          active:text-ipxonLighterMagenta
                          focus:text-ipxonLighterMagenta  
                        "
                        activeClassName="text-ipxonLighterMagenta"
                      >
                        <li
                          key={item.name}
                          className="hover:bg-ipxonGray px-4 w-full items-center flex rounded-lg hover:bg-opacity-50 h-10 transition-all duration-200 ease-in-out cursor-pointer"
                        >
                          {item.name}
                        </li>
                      </Link>
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
