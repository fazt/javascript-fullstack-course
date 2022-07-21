import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    isbn: { type: String, required: true, trim: true },
    imagePath: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Book", BookSchema);
