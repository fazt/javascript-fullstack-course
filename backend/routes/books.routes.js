import { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../controllers/books.controller.js";

const router = Router();

router.get("/", getAllBooks);

router.post("/", createBook);

router.delete("/:id", deleteBook);

router.patch("/:id", updateBook);

export default router;
