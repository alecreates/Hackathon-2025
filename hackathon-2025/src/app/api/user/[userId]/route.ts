import { connectMongoDB } from "@/app/libs/mongodb";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// GET Handler
export async function GET(req: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params?.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid or missing User ID." }, { status: 400 });
    }

    await connectMongoDB();
    const user = await User.findById(userId).select("-password -confirmPassword");

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error retrieving user:", error);
    return NextResponse.json({ message: "Error retrieving user." }, { status: 500 });
  }
}

// PUT Handler
export async function PUT(req: Request, { params }: { params: { userId: string } }) {
  try {
    const userId = params?.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({ message: "Invalid or missing User ID." }, { status: 400 });
    }

    const { firstName, lastName, email, username, bio } = await req.json();

    await connectMongoDB();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, username, bio },
      { new: true, runValidators: true }
    ).select("-password -confirmPassword");

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ message: "Error updating user." }, { status: 500 });
  }
}
