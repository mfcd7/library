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

// addBook("Harry Potter", "J.K. Rowling", 350, false);
// addBook("The Hobbit", "J.R.R. Tolkien", 500, true);
// console.log(myLibrary);

// toggleReadStatus(myLibrary[0].id);
// console.log(myLibrary);

// removeBook(myLibrary[0].id);
// console.log(myLibrary);

function renderLibrary() {
    const container = document.getElementById("library");
    container.replaceChildren();

    myLibrary.forEach(book => {
        const card = document.createElement("div");
        card.classList.add("book");
        card.setAttribute("data-id", book.id);

        card.innerHTML = `
            <h3>Title: ${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <input type="checkbox" id="read-${book.id}" ${book.read ? "checked" : ""}>
            <label for="read-${book.id}">Read</label>
            <button id="remove-${book.id}">Remove</button>
        `;

        const checkbox = card.querySelector(`#read-${book.id}`);
        if (checkbox) {
            checkbox.addEventListener('change', () => {
                toggleReadStatus(book.id);
                renderLibrary();
            });
        }

        const remove = card.querySelector(`#remove-${book.id}`);
        if (remove) {
            remove.addEventListener('click', () => {
                removeBook(book.id);
                renderLibrary();
            });
        }

        container.appendChild(card);
    });
}

const newBook = document.getElementById("new-book");
const dialog = document.getElementById("dialog");
const confirmBtn = document.getElementById("confirmBtn");

if (newBook) {
    newBook.addEventListener("click", () => {
        dialog.showModal();
    });
}

function validateInputs(title, author, pages) {
    if (!title.trim() || !author.trim()) {
        alert("Title and Author cannot be empty.");
        return false;
    }

    if (isNaN(pages) || pages <= 0) {
        alert("Please enter a valid pages (greater than 0)");
        return false;
    }
    return true;
}

if (confirmBtn) {
    confirmBtn.addEventListener("click", (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const pages = parseInt(document.getElementById("pages").value);
        const readStatus = document.getElementById("read-status").checked;

        if (validateInputs(title, author, pages)) {
            addBook(title, author, pages, readStatus);

            dialog.close();
            document.querySelector("form").reset();

            renderLibrary();
        }
    });
}

renderLibrary();