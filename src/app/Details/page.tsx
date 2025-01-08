"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { CiClock2 } from "react-icons/ci";
import {LuBadgeCheck} from 'react-icons/lu';
//import { DeleteIcon } from "lucide-react";
import { Trash2 } from "lucide-react";


export interface Borrower {
  id: number;
  name: string;
  loanAmount: number;
  interestRate: number; // Annual rate
  dueDate: string; // Loan issue date
  reminder: number; // Not used in this implementation
  status: string;
}

function Page() {
  const [borrowers, setBorrowers] = useState<Borrower[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Borrowers
  useEffect(() => {
    axios
      .get("http://localhost:3001/borrowers")
      .then((response) => {
        setBorrowers(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching borrowers:", error));
  }, []);

  const calculateInterest = (borrower: Borrower) => {
    const { loanAmount, interestRate, dueDate } = borrower;
    const borrowedDate = new Date(dueDate);
    const currentDate = new Date();

    // Ensure due date is not in the future
    if (borrowedDate > currentDate) return { si: "0.00", ci: "0.00" };

    // Calculate total elapsed months
    let totalMonths =
      (currentDate.getFullYear() - borrowedDate.getFullYear()) * 12 +
      (currentDate.getMonth() - borrowedDate.getMonth());

    // Calculate the extra days in the current month
    const borrowedDay = borrowedDate.getDate();
    const currentDay = currentDate.getDate();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate(); // Total days in the current month

    if (currentDay > borrowedDay) {
      // Add the partial month as days/total days in the current month
      totalMonths += (currentDay - borrowedDay) / daysInMonth;
    }

    // Simple Interest (SI) Calculation
    const si = ((loanAmount * totalMonths * interestRate) / 100).toFixed(2);

    // Compound Interest (CI) Calculation
    const ci = (
      loanAmount * Math.pow(1 + interestRate / (12 * 100), totalMonths * 12) -
      loanAmount
    ).toFixed(2);

    return { si, ci };
  };

  // Mark Borrower as Paid
  const markAsPaid = async (borrowerId: number) => {
    try {
      const borrowerToUpdate = borrowers.find((b) => b.id === borrowerId);

      if (!borrowerToUpdate) {
        console.error("Borrower not found.");
        return;
      }

      await axios.put(`http://localhost:3001/borrowers/${borrowerId}`, {
        ...borrowerToUpdate,
        status: "paid",
      });

      setBorrowers(
        borrowers.map((b) =>
          b.id === borrowerId ? { ...b, status: "paid" } : b
        )
      );
    } catch (error) {
      console.error("Error updating borrower status:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    );
  }

  // Render Borrowers
  return (
    <div className="container mx-auto p-4 mt-4 overflow-x-auto  text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-white">Loans</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-yellow-300 text-black">
            <tr className="font-serif">
              <th className="px-4 py-2 sm:px-6 sm:py-3">Name</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Loan Amount</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Interest Rate</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Due Date</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Live Interest</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Status</th>
              <th className="px-4 py-2 sm:px-6 sm:py-3">Action</th>
            </tr>
          </thead>

          <tbody className="bg-indigo-950/50 backdrop-blur-sm rounded-xl p-6 border border-indigo-800/50">
            {borrowers.map((borrower) => {
              const { si, ci } = calculateInterest(borrower);

              return (
                <tr
                  key={borrower.id}
                  className="hover:bg-indigo-300 text-center items-center font-serif text-white hover:text-black"
                >
                  <td className="px-4 py-2">{borrower.name}</td>
                  <td className="px-4 py-2">{borrower.loanAmount}</td>
                  <td className="px-4 py-2">{borrower.interestRate}%</td>
                  <td className="px-4 py-2">{borrower.dueDate}</td>
                  <td className="px-4 py-2">
                    <div className="">
                      <div className="text-xs py-2 px-3 bg-blue-200 rounded-md text-black m-1">
                        <span className="font-semibold">SI:</span> ₹{si}
                      </div>
                      <div className="text-black py-2 px-3 bg-yellow-200 rounded-md text-xs m-1">
                        <span className="font-semibold">CI:</span> ₹{ci}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {borrower.status === "paid" ? (
                      // <span className="bg-green-500 px-3 py-2 rounded-sm">Paid</span>
                      <div className="inline-flex items-center bg-green-100 text-green-900 py-2 px-3 rounded-md shadow-md">
                        <LuBadgeCheck className="w-4 h-4 mr-2"/>
                        Paid
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-200 text-blue-900 shadow-md">
                          <CiClock2 className="w-4 h-4 mr-2"/>
                          <p>Pending</p>
                        </div>
                        <div>
                          <button
                            className="bg-yellow-200 px-2 py-1 rounded-md"
                            onClick={() => markAsPaid(borrower.id)}
                          >
                            <span className="text-black">
                              Mark as Paid
                            </span>
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-2">
                  <Trash2 className=''/>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
