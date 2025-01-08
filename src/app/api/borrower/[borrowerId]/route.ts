// import { NextResponse } from "next/server"; 

// import { borrowers } from "../route";
 
//  // PUT API to update borrower status
//  export async function PUT(request: Request, { params }: { params: { borrowerId: string } }) {
//     const borrowerId = parseInt(params.borrowerId, 10); // Extract borrower ID from the URL parameter
//     const body = await request.json();
    
//     // Validate request body for status update
//     if (!body.status || (body.status !== 'paid' && body.status !== 'pending')) {
//       return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
//     }
  
//     // Find the borrower with the given ID
//     const borrowerIndex = borrowers.findIndex((borrower: { id: number; }) => borrower.id === borrowerId);
//     if (borrowerIndex === -1) {
//       return NextResponse.json({ error: 'Borrower not found' }, { status: 404 });
//     }
  
//     // Update borrower status
//     borrowers[borrowerIndex].status = body.status;
  
//     return NextResponse.json({ message: 'Status updated successfully', borrower: borrowers[borrowerIndex] }, { status: 200 });
//   }


import { NextResponse } from "next/server";
import { borrowers } from "../route";

export async function PUT(request: Request, { params }: { params: { borrowerId: string } }) {
  try {
    // Validate and parse borrowerId from params
    if (!params.borrowerId) {
      return NextResponse.json({ error: "Borrower ID is required" }, { status: 400 });
    }

    const borrowerId = parseInt(params.borrowerId, 10);
    if (isNaN(borrowerId)) {
      return NextResponse.json({ error: "Invalid Borrower ID" }, { status: 400 });
    }

    // Parse request body
    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!status || (status !== "paid" && status !== "pending")) {
      return NextResponse.json({ error: "Invalid status. Allowed values are 'paid' or 'pending'." }, { status: 400 });
    }

    // Find and update the borrower
    const borrowerIndex = borrowers.findIndex((borrower:{id:number;}) => borrower.id === borrowerId);
    if (borrowerIndex === -1) {
      return NextResponse.json({ error: "Borrower not found" }, { status: 404 });
    }

    borrowers[borrowerIndex].status = status;

    // Respond with updated borrower data
    return NextResponse.json(
      { message: "Status updated successfully", borrower: borrowers[borrowerIndex] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error handling PUT request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
