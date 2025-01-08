
import React,{useEffect, useState} from 'react';
import { IoIosClose } from "react-icons/io";

function page({isVisible, onClose, children}:any) {

  if(!isVisible){
    return null;
  }


  const handleClose=(e:any)=>{
    if(e.target.id === 'parent-container') {
      onClose();
    }
  }

  return (
    <div className={`fixed inset-0 w-full h-full flex justify-center items-center backdrop-blur-sm bg-black bg-opacity-50 z-50 transition-opacity duration-300 ${
      isVisible ? "opacity-100" : "opacity-0"
    }`} 
    id='parent-container' 
    onClick={handleClose}>
      <div className={`relative  bg-white/10 rounded-md border border-white/20 shadow-md sm:p-6 md:p-8 lg:p-5 mt-5 transform transition-transform ease-in-out ${
          isVisible ? "animate-modal-in" : "scale-95 opacity-0"
        }`}>
        <div className=' sm:w-1/4 md:w-[500px] flex flex-col  P-2 rounded'>
        <button className='text-black  place-self-end text-4xl' onClick={()=>onClose()}><IoIosClose /></button>
            {children}
        </div>
      </div>

    </div>
  )
} 

export default page;