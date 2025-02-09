import { connectMongoDB } from "@/app/libs/mongodb";
import Song from "@/app/models/Song";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectMongoDB();  // Connect to MongoDB

    // Get the query parameter from the URL
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";  // Default to empty string if query is not present

    console.log("Query received:", query); 
    
    const songs = await Song.find(
      { track_name: { $regex: query, $options: "i" } }, 
      "track_name" // Only return the 'track_name' field
    ).limit(10); // Limit the number of results to avoid overwhelming the frontend

    console.log("Songs found:", songs); // Log the songs retrieved

    // Return the songs as a JSON response
    return NextResponse.json(songs);
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json({ message: "Error fetching songs." }, { status: 500 });
  }
}
