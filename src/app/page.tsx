"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "@/Components/Navbar/page";
import { IndianRupee,Calendar } from "lucide-react";

// Assuming we have a Borrower interface as in your previous code
interface Borrower {
  id: number;
  name: string;
  loanAmount: number;
  interestRate: number; // Annual interest rate
  dueDate: string; // Loan issue date
  status: string;
}

function Home() {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [totalLoanAmount, setTotalLoanAmount] = useState(0);
  const [outstandingBalance, setOutstandingBalance] = useState(0);
  const [nearestDue, setNearestDue] = useState<Borrower | null>(null);

  useEffect(() => {
    // Fetch borrowers from your API (or mock data)
    axios
      .get("http://localhost:3001/borrowers")
      .then((response) => {
        const borrowerData =  response.data.map((borrower: any)=>({...borrower, loanAmount:Number(borrower.loanAmount)}));//response.data.map((borrower: any) => ({ ...borrower,loanAmount: Number(borrower.loanAmount)
        setBorrowers(borrowerData);

        // Calculate Total Loan Amount for pending loans only
        const totalLoan = borrowerData
          .filter((borrower: Borrower) => borrower.status === "pending")
          .reduce((acc: number, borrower: Borrower) => acc + borrower.loanAmount, 0);
        setTotalLoanAmount(totalLoan);

        // Calculate Outstanding Balance (Total interest for pending loans)
        const outstanding = borrowerData
          .filter((borrower: Borrower) => borrower.status === "pending")
          .reduce((acc: number, borrower: Borrower) => {
            // Calculate months elapsed
            const totalMonths =
              (new Date().getFullYear() - new Date(borrower.dueDate).getFullYear()) * 12 +
              (new Date().getMonth() - new Date(borrower.dueDate).getMonth());
            // Calculate simple interest: SI = P * T * R / 100
            const si = (borrower.loanAmount * totalMonths * borrower.interestRate) / 100;
            return acc + si;
          }, 0);

        setOutstandingBalance(outstanding);

        // Find the nearest due date (pending loans)
        const sortedBorrowers = borrowerData
          .filter((borrower: Borrower) => borrower.status === "pending" && new Date(borrower.dueDate) > new Date())
          .sort((a: Borrower, b: Borrower) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

        setNearestDue(sortedBorrowers[0] || null);
      })
      .catch((error) => console.error("Error fetching borrowers:", error));
  }, []);

  return (
    <div className="">

      {/* <Navbar/> */}
      {/* Hero Section */}
      <section className="text-white text-center py-10">
        <h2 className="text-4xl font-bold mb-4 font-serif">Manage Your Loans Effortlessly!</h2>
        <p className="text-lg font-serif">Track, manage, and receive your loans with ease.</p>
        <button className="mt-6 font-serif bg-black text-white px-6 py-3 rounded shadow hover:bg-white hover:text-black">
          View Details
        </button>
      </section>

      {/* Loan Overview Section */}
      <section className="relative py-8 px-6 rounded-md">
        <h3 className="text-xl font-bold mb-6 text-white font-serif">Loan Overview</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20  hover:bg-white/20 transition-colors">
            <h4 className="text-lg font-bold font-serif inline-flex space-x-1 items-center"><span><IndianRupee/></span>Total Loan Amount</h4>
            <p className="text-3xl text-white mt-4 font-serif">₹{totalLoanAmount}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20  hover:bg-white/20 transition-colors">
            <h4 className="text-lg font-bold font-serif inline-flex space-x-1 items-center"><span><IndianRupee/></span>Outstanding Interest</h4>
            <p className="text-3xl text-white mt-4 font-serif">₹{outstandingBalance.toFixed(2)}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
            <h4 className="text-lg font-bold  font-serif inline-flex space-x-1 items-center"><span><Calendar/></span>Next Due Date</h4>
            <p className="text-xl mt-4 font-serif text-white">
              {nearestDue ? nearestDue.dueDate : "No pending dues"}
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Dues Section */}
      <section className=" bg-indigo-950/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/50">
        <h3 className="text-xl font-bold mb-6 text-white font-serif">Upcoming Dues</h3>
        <div className="overflow-x-auto  shadow rounded-lg border border-yellow-300">
          <table className="min-w-full border-collapse">
            <thead className="px-6 py-3 text-left text-sm font-semibold text-indigo-900">
              <tr className="bg-yellow-300 text-black text-center font-serif">
                <th className="px-6 py-3">Loan Name</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Amount Due</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-indigo-800">
              {borrowers
                .filter((borrower) => borrower.status === "pending" && new Date(borrower.dueDate) > new Date())
                .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                .map((borrower) => (
                  <tr key={borrower.id} className="border-b text-center text-white  font-serif bg-white/5 hover:bg-white/10 transition-colors">
                    <td className="px-6 py-3 ">{borrower.name}</td>
                    <td className="px-6 py-3">{borrower.dueDate}</td>
                    <td className="px-6 py-3">₹{borrower.loanAmount}</td>
                    <td className="px-6 py-3">
                      <button className="px-1 py-2 bg-red-400/10 text-red-400 rounded-lg">Pending</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>

      
    </div>
  );
}

export default Home;

// import React, { Children } from 'react';
// import Home from './Home/page';

// function page() {
//   return (
//     <div>
//       <Home/>
//     </div>
//   )
// }

// export default page