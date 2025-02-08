import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
    },
    password: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    songs: {
      type: String,
      required: true,
    }
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const User = models.User || model("User", userSchema);

export default User;
