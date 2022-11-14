import express from "express";
import morgan from "morgan";
import cors from "cors";
import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import booksRoutes from "./routes/books.routes.js";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(morgan("dev"));
app.use(cors());
const storage = multer.diskStorage({
  destination: join(__dirname, "public/uploads"),
  filename(req, file, cb) {
    cb(null, new Date().getTime() + extname(file.originalname));
  },
});
app.use(multer({ storage }).single("image"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use("/api/books", booksRoutes);

// static files
app.use(express.static(join(__dirname, "public")));

// uploads
app.use("/uploads", express.static(join(__dirname, "public/uploads")));

// frontend
app.use(express.static(join(__dirname, "../frontend/dist")));

export default app;
