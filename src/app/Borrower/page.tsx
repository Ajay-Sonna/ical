// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';

// function page() {

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const router = useRouter();

//   const submit = async (data: any) => {
//     const existingBorrowes = JSON.parse(localStorage.getItem("borrowers")|| "[]");

//     const newBorrower = {

//         id:uuidv4(),
//         name:data.borrowerName,
//         loanAmount: data.loanAmount,
//         interestRate:data.interestRate,
//         dueDate: data.dueDate,
//         interest:"",
//         status:"pending",
//     }
//     try{
//         await axios.post('http://localhost:3001/borrowers',newBorrower);

//     console.log("Borrower Added Successfully..");
//     router.push("/Details");
//     }catch(error){
//         console.error("Error Adding Borrower",error);
//     }

//     // try {
//     //   const response = await axios.post("/api/borrower", {
//     //     borrowerName: data.borrowerName,
//     //     amount: data.amount, // Fix field name to lowercase 'amount'
//     //     interestRate: data.interestRate,
//     //     dueDate: data.dueDate,
//     //   });
//     //   if (response.status === 201) {
//     //     console.log("Form Submitted Successfully");
//     //   } else {
//     //     console.error("Error Submitting Form ", response.statusText);
//     //   }
//     // } catch (errors) {
//     //   console.log(errors);
//     // }
//   };
//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md sm:p-6 md:p-8 lg:p-10">
//       <h1 className="text-2xl font-bold mb-4 text-center sm:text-left md:text-center lg:text-left">
//         B Form
//       </h1>
//       <form
//         className="flex flex-col space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10"
//         onSubmit={handleSubmit(submit)}
//       >
//         <label className="block">
//           <span className="text-gray-700">B Name</span>
//           <input
//             type="text"
//             {...register("borrowerName", { required: true })}
//             className="block w-full p-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//           {errors.borrowerName && (
//             <div className="text-red-500">BorrowerName is required</div>
//           )}
//         </label>
//         <label className="block">
//           <span className="text-gray-700">Amount</span>
//           <input
//             type="text"
//             {...register("loanAmount", { required: true })}
//             className="block w-full p-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//           {errors.loanAmount && (
//             <div className="text-red-500">Amount is required</div>
//           )}
//         </label>
//         <label className="block">
//           <span className="text-gray-700">I Rate</span>
//           <input
//             type="text"
//             {...register("interestRate", { required: true })}
//             className="block w-full p-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//           {errors.interestRate && (
//             <div className="text-red-500">Rate is required</div>
//           )}
//         </label>
//         <label className="block">
//           <span className="text-gray-700">Date</span>
//           <input
//             type="date"
//             {...register("dueDate", { required: true })}
//             className="block w-full p-2 mt-1 text-gray-700 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//           />
//           {errors.dueDate && <div className="text-red-500">Date is required</div>}
//         </label>
//         <button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:ring-blue-500 focus:border-blue-500"
//         >
//           Add
//         </button>
//       </form>
//     </div>
//   );
// }

// export default page;

"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { User, IndianRupee, Percent, Calendar, Bell } from "lucide-react";

function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const submit = async (data: any) => {
    // const existingBorrowes = JSON.parse(localStorage.getItem("borrowers") || "[]");
    const newBorrower = {
      id: uuidv4(),
      name: data.borrowerName,
      loanAmount: data.loanAmount,
      interestRate: data.interestRate,
      dueDate: data.dueDate,
      reminder: data.reminder,
      interest: "",
      status: "pending",
    };

    try {
      await axios.post("http://localhost:3001/borrowers", newBorrower);
      console.log("Borrower Added Successfully..");
      router.push("/Details");
    } catch (error) {
      console.error("Error Adding Borrower", error);
    }
  };

  return (
    <div className="max-w-md mt-16 mx-auto p-4 bg-white/10 rounded-md border border-white/20 shadow-md sm:p-6 md:p-8 lg:p-5">
      <h1 className="text-2xl font-bold mb-4 text-center sm:text-left md:text-center lg:text-left text-white font-serif">
        Add Borrower
      </h1>
      <form
        className="flex flex-col space-y-2 sm:space-y-6 md:space-y-8 lg:space-y-5"
        onSubmit={handleSubmit(submit)}
      >
        <div className="relative">
          <label className="block ">
            <span className="text-white font-serif">Borrower Name </span>
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("borrowerName", { required: true })}
              className="w-full font-serif bg-white/10 border focus:outline-none border-indigo-300/30 rounded-lg py-2.5 px-4 pl-11 text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
              placeholder="Enter Borrower Name"
            />
            {errors.borrowerName && (
              <div className="text-red-500">BorrowerName is required</div>
            )}
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <label className="block">
            <span className="text-white font-serif">Amount</span>
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("loanAmount", { required: true })}
              className="w-full font-serif bg-white/10 border focus:outline-none border-indigo-300/30 rounded-lg py-2.5 px-4 pl-11 text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
              placeholder="Enter Loan Amount"
            />
            {errors.loanAmount && (
              <div className="text-red-500">Amount is required</div>
            )}
            <IndianRupee className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <label className="block">
            <span className="text-white font-serif">Interest Rate</span>
          </label>
          <div className="relative">
            <input
              type="text"
              {...register("interestRate", { required: true })}
              className="w-full font-serif bg-white/10 border focus:outline-none border-indigo-300/30 rounded-lg py-2.5 px-4 pl-11 text-white placeholder-gray-400 focus:ring-2  focus:border-transparent"
              placeholder="Interest Rate"
            />
            {errors.interestRate && (
              <div className="text-red-500">Rate is required</div>
            )}
            <Percent className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          </div>
        </div>
        <div className="md:grid grid-cols-2 gap-4">
          <div className="relative">
            <label className="block">
              <span className="text-white font-serif">Date</span>
            </label>
            <div className="relative">
              <input
                type="date"
                {...register("dueDate", { required: true })}
                className="w-full font-serif bg-white/10 border border-indigo-300/30 rounded-lg py-2.5 px-4 pl-11 text-white focus:ring-2 focus:outline-none focus:border-transparent"
                placeholder="Due Date"
              />
              {errors.dueDate && (
                <div className="text-red-500">Date is required</div>
              )}
              <Calendar className=" absolute left-3 top-3 w-5 h-5 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <label className="block">
              <span className="text-white font-serif">Reminder (Months)</span>
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="100"
                {...register("reminder", { required: true })}
                className="w-full font-serif bg-white/10 border border-indigo-300/30 rounded-lg py-2.5 px-4 pl-11 text-white focus:ring-2 focus:outline-none focus:border-transparent"
              />
              {errors.reminder && (
                <div className="text-red-500">Reminder is required</div>
              )}
              <Bell className="absolute left-3 top-3 w-5 h-5 text-gray-400"/>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="font-serif px-4 py-2 bg-yellow-300 text-black hover:text-black rounded-md hover:bg-green-500"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default page;
