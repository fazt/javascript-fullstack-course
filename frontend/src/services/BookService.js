export class BookService {
  constructor(URL) {
    this.URI = URL;
  }

  async getBooks() {
    return (await fetch(this.URI)).json()
  }

  async postBook(book) {
    const res = await fetch(this.URI, {
      method: "POST",
      body: book,
    });
    const data = await res.json();
  }

  async deleteBook(bookId) {
    const res = await fetch(`${this.URI}/${bookId}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "Delete",
    });
    const data = await res.json();
    console.log(data);
  }
}
