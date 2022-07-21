import { Router } from "express";
import Book from "../models/Book.js";
import fs from "fs-extra";
import path from "path";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const books = await Book.find().sort("-_id");
    res.json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, author, isbn } = req.body;

    if (!title || !author || !isbn)
      return res.status(400).json({ message: "Please, provide all fields" });

    const newBook = new Book({ title, author, isbn });

    if (req.file) {
      newBook.imagePath = "/uploads/" + req.file.filename;
    }

    const savedBook = await newBook.save();
    res.json(savedBook);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    await fs.unlink(path.resolve("./backend/public/" + book.imagePath));
    res.json({ message: "Book Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(book);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
