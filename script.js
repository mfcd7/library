const myLibrary = [
    // {id: 1, title: "Harry Potter", author: "J.K. Rowling", pages: 350, read: false},
    // {id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", pages: 500, read: true},
];

function Book(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBook(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(id, title, author, pages, read);
    myLibrary.push(book);
}

function removeBook(id) {
    const indexToRemove = myLibrary.findIndex(item => item.id === id);

    if (indexToRemove !== -1) {
        myLibrary.splice(indexToRemove, 1);
    }
}

function toggleReadStatus(id) {
    const indexToUpdate = myLibrary.findIndex(item => item.id === id);

    if (indexToUpdate !== -1) {
        const book = myLibrary[indexToUpdate];
        book.read = !book.read;
    }
}

addBook("Harry Potter", "J.K. Rowling", 350, false);
addBook("The Hobbit", "J.R.R. Tolkien", 500, true);
console.log(myLibrary);

toggleReadStatus(myLibrary[0].id);
console.log(myLibrary);

removeBook(myLibrary[0].id);
console.log(myLibrary);