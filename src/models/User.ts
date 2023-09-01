import mongoose = require('mongoose') 
import { Document, Schema } from 'mongoose';

// Define User interface extending Document (Mongoose's representation of a MongoDB document)
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

// Define User Schema
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true, // Built-in trim to remove leading and trailing whitespaces
      lowercase: true, // Convert to lowercase
      unique: true,
      minlength: [3, 'Username should be at least 3 characters long'],
      maxlength: [30, 'Username should not exceed 30 characters'],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: (email: string) => {
          // Simple email validation
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password should be at least 6 characters long'],
      // Don't set maxlength for password because we're going to hash it
    },
  },
  {
    timestamps: true, // Adds created_at and updated_at timestamps
  }
);

// Export User model with IUser interface
const User = mongoose.model<IUser>('User', UserSchema);

export default User;
