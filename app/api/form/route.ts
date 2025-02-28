//app/api/form/route.tsx: holds the Route Handler for the API endpoint

import { NextRequest, NextResponse } from 'next/server' //NextRequest and NextResponse-- extended versions of the native Request & Response objects--they come with extra utilities
import { z } from 'zod'; //importing Zod for server-side validation
import { FormData } from "@/types"; //a type definition for FormData exists in types.ts
import { FormSchema } from '@/schemas/formSchema'; //importing the standard form schema from schemas (validation consistency across client and server)
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(req: NextRequest) {
    try {
      const data: FormData = await req.json(); // Parsing (analyze and breakdown) the incoming form data
      
      //logging the incoming data to check if it's received properly
      console.log("Received data:", data);

      // Validating the data using the shared Zod FormSchema
      FormSchema.parse(data); // Throw an error if validation fails

      //if data is valid, proceed with server-side logic e.g., saving to a DB

      console.log("Form data is valid, processing to save to MongoDB...")
  
      // form data save to the database
      const { db } = await connectToDatabase(); //connect to mongodb
      const collection = db.collection('Customers'); //specifying my collection name

      //inserting the form data into the MongoDB collection
      //...data : copy all the properties from the data object into the new document (mongodb document)
      const result = await collection.insertOne({
        ...data,
        createdAt: new Date(),
      });

      console.log("Data saved to MongoDB collection:", result.insertedId);

      //responding with a success message status: 200
  
      return NextResponse.json({ message: "Form submitted successfully!" }, { status: 200 });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle validation errors thrown by Zod
        return NextResponse.json({ error: error.errors }, { status: 400 });
      }
  
      // Handle internal server errors)
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }