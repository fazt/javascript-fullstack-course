import {UI} from "../UI.js";

const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = bookForm["title"].value;
  const author = bookForm["author"].value;
  const isbn = bookForm["isbn"].value;

  const image = document.getElementById("image").files;

  const formData = new FormData();
  formData.append("image", image[0]);
  formData.append("title", title);
  formData.append("author", author);
  formData.append("isbn", isbn);

  for (var pair of formData.entries()) {
    console.log(pair[0] + ", " + pair[1]);
  }

  // Instatiating the UI
  const ui = new UI();

  // // Validating User Input
  if (title === "" || author === "" || isbn === "") {
    ui.renderMessage("Please fill all the fields", "error", 3000);
  } else {
    // Pass the new book to the UI
    ui.addANewBook(formData);
    ui.renderMessage("New Book Added Successfully", "success", 2000);
  }
});
