const allBtn = document.querySelector("#all-btn");
const readBtn = document.querySelector("#read-btn");
const notReadBtn = document.querySelector("#not-read-btn");
const searchInput = document.querySelector("#search");
const newBookBtn = document.querySelector("#addbtn");
const dialog = document.querySelector("dialog");
const bookForm = document.querySelector("form");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const yes = document.querySelector("#yes");
const no = document.querySelector("#no");
const closeModal = document.querySelector(".modal-close");
const modalAddBookBtn = document.querySelector("#addbtn2");
const saveBtn = document.querySelector("#save-btn");
const bookLibrary = document.querySelector(".book-library");
let currentFilter = "all";
let myLibrary = []

class Book {
    constructor (title, author, pages, read, id) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }
    toggleReadStatus() {
        this.read = !this.read
    }
}

document.addEventListener("DOMContentLoaded", () => {
    myLibrary = loadFromStorage("myLibrary");
    displayMyLibraryBooks(myLibrary);
})

allBtn.addEventListener("click", () => {
    currentFilter = "all";
    searchInput.value = "";
    updateSelectedButtonStyle("all-btn");
    displayMyLibraryBooks(myLibrary);
})

readBtn.addEventListener("click", () => {
    currentFilter = "read";
    searchInput.value = "";
    updateSelectedButtonStyle("read-btn");
    displayMyLibraryBooks(myLibrary);
})

notReadBtn.addEventListener("click", () => {
    currentFilter = "not-read";
    searchInput.value = "";
    updateSelectedButtonStyle("not-read-btn");
    displayMyLibraryBooks(myLibrary);
})

searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const queriedLibrary = myLibrary.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));
    displayMyLibraryBooks(queriedLibrary)
})

newBookBtn.addEventListener("click", () => {
    bookForm.reset();
    modalAddBookBtn.classList.remove("hide");
    saveBtn.classList.add("hide");
    dialog.showModal();
});

closeModal.addEventListener("click", () => {
    dialog.close();
});

modalAddBookBtn.addEventListener("click", () => {
    addBookToLibrary();
    displayMyLibraryBooks(myLibrary)
});

saveBtn.addEventListener("click", () => {
    saveBookEdits();
    displayMyLibraryBooks(myLibrary);
})

function updateSelectedButtonStyle(selectedBtn) {
    const filterButtons = [allBtn, readBtn, notReadBtn]
    filterButtons.forEach(button => {
        button.classList.toggle("selected", button.id === selectedBtn);
    });
}

function loadFromStorage(key) {
    const storedLibrary = JSON.parse(localStorage.getItem(key))
    if (storedLibrary) {
        return storedLibrary.map(book => new Book(book.title, book.author, book.pages, book.read, book.id));
    } else {
        return [];
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function addBookToLibrary() {
    const read = yes.checked;
    const id = crypto.randomUUID();
    // Create the new book object and push it to the myLibrary array
    const newBook = new Book(title.value, author.value, pages.value, read, id);
    myLibrary.push(newBook);
    saveToStorage("myLibrary", myLibrary);
}

function displayMyLibraryBooks(libraryArray) { 
    // Clear out the div that holds the cards
    bookLibrary.innerHTML = "";
    // Determine which books we are going to display
    let filteredLibrary = [];
    if (currentFilter === "read") {
        filteredLibrary = libraryArray.filter((book) => book.read);
    } else if (currentFilter === "not-read") {
        filteredLibrary = libraryArray.filter((book) => !book.read);
    } else {
        filteredLibrary = libraryArray;
    }
    // Loop through the filteredLibrary array, create a card for each book and append it in to the booklibrary div
    filteredLibrary.forEach(function(book) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book");
        const readInfo = book.read ? "I Already Read This!" : "I Want To Read This!" 
        bookCard.innerHTML = `<h2>Title: ${book.title}</h2> <h3>Author: ${book.author}</h3> <h3>Pages: ${book.pages}</h3> <h3>Read: ${readInfo}</h3>`; 
        // Read status button
        const readStatusButton = document.createElement("button");
        readStatusButton.innerText = "Change Read Status";
        readStatusButton.addEventListener("click", () => {
            book.toggleReadStatus();
            saveToStorage("myLibrary", myLibrary);
            displayMyLibraryBooks(myLibrary);
        });
        // Remove button
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove Book";
        removeButton.addEventListener("click", () => {
            removeBookFromLibrary(book.id);
            displayMyLibraryBooks(myLibrary);
        });
        // Edit button
        const editButton = document.createElement("button");
        editButton.innerText = "Edit Book";
        editButton.addEventListener("click", () => {
            addEditBookInfoToModal(book);
            dialog.showModal();
        })
        bookCard.append(readStatusButton, removeButton, editButton)
        bookLibrary.append(bookCard);
    });  
}; 

function removeBookFromLibrary(id) { 
    const index = myLibrary.findIndex(b => b.id === id)
    if (index !== -1) {
        myLibrary.splice(index, 1);
        saveToStorage("myLibrary", myLibrary);
    }   
}

function addEditBookInfoToModal(book) {
    title.value = book.title;
    author.value = book.author;
    pages.value = book.pages;
    book.read ? yes.checked = true : no.checked = true;
    modalAddBookBtn.classList.add("hide");
    saveBtn.classList.remove("hide");
    saveBtn.setAttribute("data-book-id", book.id)  
}

function saveBookEdits() {
    const editBookId = saveBtn.dataset.bookId;
    const bookToEdit = myLibrary.find(book => book.id === editBookId);
    if (bookToEdit) {
        bookToEdit.title = title.value;
        bookToEdit.author = author.value;
        bookToEdit.pages = pages.value;
        bookToEdit.read = yes.checked;
        saveToStorage("myLibrary", myLibrary);
    }
}

// Add an example book
//const exampleBook = new Book("The Catcher in the Rye", "J.D. Salinger", 234, true, crypto.randomUUID());
//myLibrary.push(exampleBook);
//displayMyLibraryBooks(myLibrary);