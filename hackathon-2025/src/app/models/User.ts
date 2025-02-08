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
    image: {
      type: String,
      required: true,
    },
    song1: {
      type: String,
      required: true,
    },
    song2: {
      type: String,
      required: true,
    },
    song3: {
      type: String,
      required: true,
    },
    song4: {
      type: String,
      required: true,
    },
    song5: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps
);

const User = models.User || model("User", userSchema);

export default User;
