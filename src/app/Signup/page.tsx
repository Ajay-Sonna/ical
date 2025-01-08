import React from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { BiKey } from "react-icons/bi";

function page() {
  return (
    <div className="px-2 py-2">
      <div className="flex flex-col">
        <label className="text-white px-2 py-2 w-full h-full">Email</label>

        <div className="relative">
          <input
            className="w-full font-serif bg-white/10 border focus:outline-none border-indigo-300/30 rounded-lg py-2.5 px-4 pl-11 text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
            type="text"
            placeholder="abcd@gmail.com"
          ></input>
          <MdOutlineMailOutline className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-white px-2 py-2 w-full h-full">Password</label>
        <div className="relative">
          <input
            className="w-full font-serif bg-white/10 border focus:outline-none border-indigo-300/30 rounded-lg py-2.5 px-4 pl-11 text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
            type="password"
            placeholder="********"
          ></input>
          
          <BiKey className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="text-white px-2 py-2 w-full h-full">
          Re-Enter Password
        </label>
        <div className="relative">
          <input
            className="w-full font-serif bg-white/10 border focus:outline-none border-indigo-300/30 rounded-lg py-2.5 px-4 pl-11 text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
            type="password"
            placeholder="********"
          ></input>
          
          <BiKey className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex justify-center w-full mt-5">
        <button
          className="bg-green-400 w-full ml-2 mr-2 hover:bg-green-500 px-2 py-2 rounded-md"
          type="submit"
        >
          Create Account
        </button>
      </div>
      <div className="mt-5 flex justify-center items-center">
        <hr className="w-1/2 border  border-black  m-2" />
        <p>OR</p>
        <hr className="w-1/2 border  border-black  m-2" />
      </div>
      <div className="flex justify-center w-full mt-5 mb-5">
        <button className="bg-green-400 w-full ml-2 mr-2 hover:bg-green-500 px-2  rounded-md">
          <div className="flex justify-center items-center">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg"
              className="w-8 h-5"
            />
            <p className="m-2">Continue With Google</p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default page;
