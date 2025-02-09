import mongoose, { Schema, model, models } from "mongoose";

const songSchema = new Schema(
  {
    track_name: {
      type: String,
      required: true,
    },
    track_id: {
      type: String,
      required: true,
      unique: true, // Ensure trackId is unique
    },
    artist_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const Song = models.Song|| model("Song", songSchema);

export default Song;
