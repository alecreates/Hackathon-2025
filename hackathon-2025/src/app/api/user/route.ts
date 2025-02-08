import { connectMongoDB } from "@/app/libs/mongodb";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

// GET Handler to fetch all users
export async function GET(req: NextRequest) {
  try {
    // Connect to the MongoDB database
    await connectMongoDB();

    // Fetch all users (no filtering)
    const users = await User.find().select("-password -confirmPassword"); // Exclude sensitive fields like password

    if (users.length === 0) {
      return NextResponse.json({ message: "No users found." }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return NextResponse.json({ message: "Error retrieving users." }, { status: 500 });
  }
}

