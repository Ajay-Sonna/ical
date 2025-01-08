'use client'
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import {LuBadgeCheck} from 'react-icons/lu'

interface Borrower {
    id: number;
    name: string;
    loanAmount: number;
    interestRate: number;
    dueDate: string;
    interest:number;
    reminder:number;
    status: string;
  }

function page() {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
      const fetchRecords = async ()=>{
        
       const response = await axios.get("http://localhost:3001/borrowers")
       const paidRecords = await response.data.filter((borrowers: { status: string; }) => borrowers.status === 'paid');
       setBorrowers(paidRecords);
       setLoading(false);
      }

      fetchRecords();
    },[])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold">Loading....</div>
      </div>
    );
  }
   

  const calcInterest=(borrower: Borrower)=>{

const principalAmount = borrower.loanAmount;
const rate = borrower.interestRate;
const time = borrower.reminder;  

console.log("principal Amount: ",principalAmount + "rate : ",rate + "time : ", time);
const liveInterest = (principalAmount * time * rate)/100;

return liveInterest.toFixed(2);

  }
  
  return (
    <div className="overflow-x-auto container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold font-serif mb-4 text-white">History</h1>
      <table className="sm-text-xs table-auto w-full mb:table-sm lg:table-sm">
        <thead className="bg-yellow-300">
          <tr className="sm-text-xs font-serif">
            <th className="px-4 py-2 text-center md:text-center">
              Name
            </th>
            <th className="px-4 py-2 text-center md:text-center">
              Loan Amount
            </th>
            <th className="px-4 py-2 text-center md:text-center">
              Interest Rate
            </th>
            <th className="px-4 py-2 text-center md:text-center">
              Due Date
            </th>
            <th className="px-4 py-2 text-center md:text-center">
              Interest
            </th>
            <th className="px-4 py-2 text-center md:text-center">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {borrowers.map((borrower) => (
            <tr key={borrower.id} className="bg-indigo-950/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/50 font-serif hover:bg-indigo-300 text-white hover:text-black text-center">
              <td className="px-4 py-2">
                {borrower.name}
              </td>

              <td className="px-4 py-2">
                {borrower.loanAmount}
              </td>

              <td className="px-4 py-2">
                {borrower.interestRate}%
              </td>

              <td className="px-4 py-2">
                {borrower.dueDate}
              </td>

              <td className="px-4 py-2">
                {calcInterest(borrower)}
              </td>
              
              <td className="px-4 py-2">
                {borrower.status === "paid" ? (
                  // <span className="text-green-500">Paid</span>
                  <div className="inline-flex items-center bg-green-100 text-green-900 py-2 px-3 rounded-md shadow-md">
                                          <LuBadgeCheck className="w-4 h-4 mr-2"/>
                                          Paid
                                        </div>
                ) : (
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 x-4 rounded">
                    {borrower.status}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;