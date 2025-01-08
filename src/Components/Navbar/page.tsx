"use client";

import Link from "next/link";
import React, { Fragment } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Modal from "../Modal/page";
import Signup from "../../app/Signup/page";
import Signin from "../../app/Signin/page";
import { usePathname } from "next/navigation";
import logo from "../../assests/logo-no-background.png";
import { Italic } from "lucide-react";

export default function Navbar() {
  const [ActiveMenu, setActiveMenu] = React.useState(false);
  const [showSignUp, setShowSignUp] = React.useState(false);
  const [showSignIn, setShowSignIn] = React.useState(false);

  const pathname = usePathname();

  const isActive = (path: String) => pathname === path;

  const toggleMenu = () => {
    setActiveMenu(!ActiveMenu);
  };

  return (
    // bg-indigo-950/40

    <Fragment>
      <div className="fixed w-full px-5 mt-5">
        <div className="flex rounded-md justify-around items-center px-4 py-4 bg-white/15  backdrop-blur-sm border-b border-indigo-800 text-white">
          {/* Logo */}
          {/* <div className="w-14 h-12">
        <img src={logo.src} alt="logo" className="w-fit"></img>
      </div> */}
          <div
            className="text-4xl"
            style={{ fontFamily: "'Great vibes', serif",fontStyle:"italic" }}
          >
            Lend <span className="text-yellow-300">Hub</span>
          </div>

          {/* Links for Large Screens */}
          <div className="hidden md:flex items-center  space-x-4">
            <Link
              href="/"
              className={`hover:bg-yellow-300 px-2 py-2 hover:text-black rounded-md font-serif ${
                isActive("/") ? "bg-yellow-300 text-black" : ""
              } `}
            >
              Home
            </Link>
            <Link
              href="/Borrower"
              className={`hover:bg-yellow-300 px-2 py-2 hover:text-black rounded-md font-serif ${
                isActive("/Borrower") ? "bg-yellow-300 text-black" : ""
              }`}
            >
              Borrower
            </Link>
            <Link
              href="/Details"
              className={`hover:bg-yellow-300 px-2 py-2 hover:text-black rounded-md font-serif ${
                isActive("/Details") ? "bg-yellow-300 text-black" : ""
              }`}
            >
              Details
            </Link>
            <Link
              href="/History"
              className={`hover:bg-yellow-300 px-2 py-2 hover:text-black rounded-md font-serif ${
                isActive("/History") ? "bg-yellow-300 text-black" : ""
              }`}
            >
              History
            </Link>
          </div>

          {/* Sign In/Sign Up Buttons for Large Screens */}
          <div className="hidden md:flex space-x-4 ">
            <button
              className="font-serif text-black bg-yellow-300 px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowSignIn(true)}
            >
              SIGN IN
            </button>
            <button
              className="font-serif bg-green-500 px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setShowSignUp(true)}
            >
              SIGN UP
            </button>
          </div>

          <div className="md:hidden">
            {!ActiveMenu ? (
              <button onClick={toggleMenu} className="text-3xl">
                <IoMdMenu />
              </button>
            ) : null}
          </div>
          {ActiveMenu && (
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-950 bg-opacity-90">
              <button
                onClick={toggleMenu}
                className="absolute top-4 right-4 text-3xl text-white font-serif"
              >
                <IoClose size={32} />
              </button>
              <div className="flex flex-col items-center justify-center space-y-6 h-full">
                <Link
                  href="/Home"
                  onClick={toggleMenu}
                  className="text-xl hover:underline font-serif"
                >
                  Home
                </Link>
                <Link
                  href="/Borrower"
                  onClick={toggleMenu}
                  className="text-xl hover:underline font-serif"
                >
                  Borrower
                </Link>
                <Link
                  href="/Details"
                  onClick={toggleMenu}
                  className="text-xl hover:underline font-serif"
                >
                  Details
                </Link>
                <Link
                  href="/History"
                  onClick={toggleMenu}
                  className="text-xl hover:underline font-serif"
                >
                  History
                </Link>
                <div className="flex space-x-4">
                  <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 font-serif">
                    SIGN IN
                  </button>
                  <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-600 font-serif">
                    SIGN UP
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal isVisible={showSignUp} onClose={() => setShowSignUp(false)}>
        <Signup />
      </Modal>
      <Modal isVisible={showSignIn} onClose={() => setShowSignIn(false)}>
        <Signin />
      </Modal>
    </Fragment>
  );
}
