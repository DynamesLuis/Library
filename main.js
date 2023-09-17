const containerBooks = document.querySelector(".containerBooks");
const addBtn = document.getElementById("addBook");
const closePopup = document.getElementById("closePopup");
const popUpForm = document.getElementById("popUpForm");
const addToLibrary = document.getElementById("addNew");
const myLibrary = [];

addBtn.addEventListener('click', () => {
    popUpForm.classList.add("active");
    containerBooks.style.display = "none";
});

closePopup.addEventListener('click', () => {
    popUpForm.classList.remove("active");
    containerBooks.style.display = "flex";
});

addToLibrary.addEventListener('click', getBookValues);

function getBookValues() {
    const newTitle = document.getElementById("bookTitle").value;
    const newauthor = document.getElementById("bookAuthor").value;
    const newPages = document.getElementById("bookPages").value;
    const newRead = document.querySelector("input[type=radio]:checked").value;
    addBookToLibrary(newTitle, newauthor, newPages, newRead);
    displayBooks(myLibrary);

    popUpForm.classList.remove("active");
    containerBooks.style.display = "flex";

    document.getElementById("bookTitle").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookPages").value = "";
    document.querySelector("input[type=radio]:checked").checked = false;
}

// function book(title, author, pages, read) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;
//     this.info = function () {
//         const isRead = this.read === 'read' ? `already ${this.read}` : `${this.read} yet`;
//         return `${this.title} by ${this.author}, ${this, pages} pages, ${isRead} `
//     }
// }

class book {
    constructor(titlle, author, pages, read) {
        this.title = titlle;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    info() {
        const isRead = this.read === 'read' ? `already ${this.read}` : `${this.read} yet`;
        return `${this.title} by ${this.author}, ${this, pages} pages, ${isRead} `
    }
}

function addBookToLibrary(title, author, pages, read) {
    const bookToAdd = new book(title, author, pages, read);
    myLibrary.push(bookToAdd);
}

function displayBooks(library) {
    containerBooks.innerHTML = "";
    library.forEach((book, index) => {
        const bookEl = document.createElement("div");
        bookEl.classList.add("card");
        bookEl.innerHTML = `
            <button class="closeCard" data-index=${index}>x</button>
            <h3>${book.title}</h3>
            <p class="author">by ${book.author}</p>
            <p class="pages">${book.pages} pages</p>
            <p class="read">${book.read}</p>
            ${book.read === 'not read' ? '<button class="changeRead" data-index=${index}>Change Read Status</button>' : ""}
        `;
        containerBooks.appendChild(bookEl);
    });

    const closeCardBook = document.querySelector(".card .closeCard");
    closeCardBook.addEventListener("click", () => {
        const index = closeCardBook.getAttribute("data-index");
        library.splice(index, 1);
        displayBooks(library);
    });

    const changeStatus = document.querySelector(".card .changeRead");
    changeStatus.addEventListener("click", () => {
        const index = closeCardBook.getAttribute("data-index");
        library[index].read = "Read";
        displayBooks(library);
    });
}

