import { connectMongoDB } from "@/app/libs/mongodb";
import { NextResponse } from "next/server";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { name, email, password, birthday, bio, image, song1, song2, song3, song4, song5 } = await req.json();

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to MongoDB
    await connectMongoDB();

    // Create a new user in the database
    await User.create({
      name,
      email,
      password: hashedPassword,
      birthday,
      bio,
      image,
      song1,
      song2,
      song3,
      song4,
      song5
    });

    return NextResponse.json({ message: "User registered successfully." }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred during registration." },
      { status: 500 }
    );
  }
}
