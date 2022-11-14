import { BookService } from "./services/BookService";
import { format } from "timeago.js";

const bookService = new BookService(
  `${import.meta.env.VITE_API_URL}/api/books`
);

export class UI {
  async renderBooks() {
    const books = await bookService.getBooks();
    const booksCardContainer = document.getElementById("books-cards");
    booksCardContainer.innerHTML = "";

    books.forEach((book) => {
      const div = document.createElement("div");
      div.className = "animated fadeInRight";
      div.innerHTML = `
      <div class="card m-2">
        <div class="row no-gutters">
            <div class="col-md-4">
            <img src="${
              book.imagePath
                ? `${import.meta.env.VITE_API_URL}/${book.imagePath}`
                : "vite.svg"
            }" class="img-fluid h-100 w-100" alt="" />
            </div>
            <div class="col-md-8">
                <div class="px-2">
                    <header class="d-flex justify-content-between">
                      <h4 class="card-title">${book.title}</h4>
                        <a href="#" class="btn btn-danger delete" _id="${
                         book._id
                        }">Delete</a>
                    </header>
                    <p class="card-text">${book.author}</p>
                </div>
            </div>
        </div>
        <div class="card-footer w-100 text-muted">
          ${format(book.created_at)}
        </div>
      </div>
      `;
      booksCardContainer.appendChild(div);
    });
  }

  async addANewBook(book) {
    await bookService.postBook(book);
    this.renderBooks();
    this.clearBookForm();
  }

  clearBookForm() {
    document.getElementById("book-form").reset();
    document.getElementById("title").focus();
  }

  renderMessage(message, colorMessage, secondsToRemove) {
    // Creating a div
    const div = document.createElement("div");
    // Styling the div
    div.className = `message ${colorMessage}`;
    // Adding Text to the div
    div.appendChild(document.createTextNode(message));
    // Puting in the documnet
    const container = document.querySelector(".col-md-4");
    const bookForm = document.querySelector("#book-form");
    container.insertBefore(div, bookForm);
    // Removing the div after some secconds
    setTimeout(() => {
      document.querySelector(".message").remove();
    }, secondsToRemove);
  }

  async deleteBook(bookId) {
    await bookService.deleteBook(bookId);
    this.renderBooks();
  }
}
