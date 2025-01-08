import { NextResponse } from "next/server";

export const borrowers:any = [
    { id: 1, name: 'John Doe', loanAmount: 1000, interestRate: 10, dueDate: '2024-01-01',status:'pending' },
    { id: 2, name: 'Jane Smith', loanAmount: 5000, interestRate: 8, dueDate: '2024-02-15',status:'pending' },
    { id: 3, name: 'Alice Johnson', loanAmount: 2500, interestRate: 12, dueDate: '2024-03-10',status:'pending' },
    { id: 4, name: 'Robert Brown', loanAmount: 800, interestRate: 9, dueDate: '2024-04-20' ,status:'pending'},
    { id: 5, name: 'Emily Davis', loanAmount: 1200, interestRate: 11, dueDate: '2024-05-05',status:'pending' },
    { id: 6, name: 'Michael Wilson', loanAmount: 3000, interestRate: 7, dueDate: '2024-06-15',status:'pending' },
    { id: 7, name: 'Sarah Miller', loanAmount: 4500, interestRate: 8, dueDate: '2024-07-25',status:'pending' },
    { id: 8, name: 'David Martinez', loanAmount: 2000, interestRate: 10, dueDate: '2024-08-30',status:'pending' },
    { id: 9, name: 'Laura Garcia', loanAmount: 600, interestRate: 12, dueDate: '2024-09-10' ,status:'pending'},
    { id: 10, name: 'Chris Anderson', loanAmount: 1500, interestRate: 9, dueDate: '2024-10-20',status:'pending' },
    
    { id: 11, name: 'Ram Anderson', loanAmount: 100000, interestRate: 2, dueDate: '2023-10-20',status:'pending' }
];


export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { borrowerName, amount, interestRate, dueDate ,reminder} = body;
  
      // Validate form inputs
      if (!borrowerName || !amount || !interestRate || !dueDate || !reminder) {
        return NextResponse.json({ error: "Please fill all the fields" }, { status: 400 });
      }
  
      console.log('Form data:', body);
      return NextResponse.json({ message: "Form submitted successfully..." }, { status: 201 });
    } catch (error) {
      console.error('Error handling request:', error);
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
  }
  
  // Optional: Handle other HTTP methods (e.g., GET, PUT, DELETE)
  export async function GET(){

    try{
       return NextResponse.json(borrowers,{status:201})
    }catch (error){
     return NextResponse.json(error, {status:500})
    }

  }
  



 

