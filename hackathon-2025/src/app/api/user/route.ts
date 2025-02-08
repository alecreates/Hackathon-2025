import { connectMongoDB } from "@/app/libs/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";

// GET first 5 users
export async function GET() {
  try {
    await connectMongoDB();
    const users = await User.find().limit(5).select("-password -confirmPassword");

    if (!users.length) {
      return NextResponse.json({ message: "No users found." }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return NextResponse.json({ message: "Error retrieving users." }, { status: 500 });
  }
}