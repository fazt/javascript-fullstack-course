import "./styles/app.css";
import { UI } from "./UI.js";
import "./components/bookForm.js";

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  ui.renderBooks();
});


document.getElementById("books-cards").addEventListener("click", (e) => {
  const ui = new UI();
  if (e.target.classList.contains("delete")) {
    ui.deleteBook(e.target.getAttribute("_id"));
    ui.renderMessage("Book Deleted Successfully", "success", 3000);
  }
  e.preventDefault();
});
