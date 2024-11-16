import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
      company: {
        type: String,
        trim: true,
      },
      jobTitle: {
        type: String,
        trim: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
      },
      avatar: {
        type: String,
        default: '', 
      },
      contacts: {
        type: [
          {
            firstName: { type: String, required: true, trim: true },
            lastName: { type: String, required: true, trim: true },
            email: { type: String, trim: true, lowercase: true },
            phoneNumber: { type: String, required: true, trim: true },
            company: { type: String, trim: true },
            jobTitle: { type: String, trim: true },
            address: { type: String, trim: true },
            notes: { type: String, trim: true },
          },
        ],
        default: [],
      },

}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User

