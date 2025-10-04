const addBook = document.querySelector("#addbtn");
const dialog = document.querySelector("dialog");
const bookForm = document.querySelector("form");
const closeModal = document.querySelector(".modal-close");
const modalAddBook = document.querySelector("#addbtn2");
const bookLibrary = document.querySelector(".book-library");
let myLibrary = [];

// Class syntax
class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    };

    readStatus() {
        this.read = this.read === "Read" ? "Not Read" : "Read";
        displayMyLibraryBooks();
    };

    removeCard(index) {
        myLibrary.splice(index, 1);
        displayMyLibraryBooks();
    };
}

// Constructor syntax
//function Book(title, author, pages, read) {
//    this.title = title;
//    this.author = author;
//    this.pages = pages;
//    this.read = read;
//};
//Book.prototype.readStatus = function() {
//    this.read = this.read === "Read" ? "Not Read" : "Read";
//    displayMyLibraryBooks();
//};
//Book.prototype.removeCard = function(index) {
//    myLibrary.splice(index, 1);
//    displayMyLibraryBooks();
//};

addBook.addEventListener("click", function() {
    bookForm.reset();
    dialog.showModal();
});

closeModal.addEventListener("click", function() {
    dialog.close();
});

modalAddBook.addEventListener("click", addBookToLibrary);

function addBookToLibrary() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const yes = document.querySelector("#yes");
    let read = "";
    yes.checked ? read = "Read" : read = "Not Read"
    // Create the new book object and store it in the myLibrary array
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    displayMyLibraryBooks()
}

function displayMyLibraryBooks() { 
    //clear out the div that holds the cards
    bookLibrary.innerHTML = "";

    //loop through the myLibrary array create a card for each book and display it in the booklibrary div
    myLibrary.forEach(function(book, index) {
        let bookCard = document.createElement("div");
        bookCard.classList.add("book");
        bookCard.setAttribute("data-index", index)
        bookCard.innerHTML = `<h2>Title: ${book.title}</h2> <h3>Author: ${book.author}</h3> <h3>Pages: ${book.pages}</h3> <h3>Read: ${book.read}</h3>`; 
        
        const readStatusButton = document.createElement("button");
        readStatusButton.innerText = "Read Status"
        readStatusButton.addEventListener("click", function(){
            myLibrary[index].readStatus();
        });
        bookCard.append(readStatusButton);
        
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove"
        removeButton.addEventListener("click", function() {
            myLibrary[index].removeCard();
        });
        bookCard.append(removeButton);
        
        bookLibrary.append(bookCard);
    });  
};                        

//add an example book
const exampleBook = new Book("The Catcher in the Rye", "J.D. Salinger", 234, "Read");
    myLibrary.push(exampleBook);
    displayMyLibraryBooks()

