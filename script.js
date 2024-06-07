const addBook = document.querySelector("#addbtn");
const dialog = document.querySelector("dialog");
const closeModal = document.querySelector(".modal-close");
const modalAddBook = document.querySelector("#addbtn2");


let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
};

Book.prototype.readStatus = function() {
    this.read = this.read === "Read" ? "Not Read" : "Read";
    addBookToLibrary();
};

function removeCard(index) {
    myLibrary.splice(index, 1);
    addBookToLibrary();
};

addBook.addEventListener("click", function() {
    dialog.showModal();
    const bookForm = document.querySelector("form");
    bookForm.reset();
});

closeModal.addEventListener("click", function() {
    dialog.close();
});

modalAddBook.addEventListener("click", function() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const yes = document.querySelector("#yes");

    let read = "";
    yes.checked ? read = "Read" : read = "Not Read"

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    addBookToLibrary()
});

function addBookToLibrary() { 
    //clear out the div that holds the cards
    const bookLibrary = document.querySelector(".book-library");
    bookLibrary.innerHTML = "";
    //loop through the myLibrary array create a card for each book and display it
    myLibrary.forEach(function(book, index) {
        let bookCard = document.createElement("div");
        bookCard.classList.add("book");
        bookCard.setAttribute("data-index", index)
        bookCard.innerHTML = `<h2>Title: ${book.title}</h2> <h3>Author: ${book.author}</h3> <h3>Pages: ${book.pages}</h3> <h3>Read: ${book.read}</h3>`; 
        
        const readStatusButton = document.createElement("button");
        readStatusButton.innerText = "Read Status"
        readStatusButton.addEventListener("click", function(){
            myLibrary[index].readStatus();
            //addBookToLibrary();
        });
        bookCard.append(readStatusButton);
        
        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove"
        removeButton.addEventListener("click", function() {
            removeCard(index);
            //addBookToLibrary();
        });
        bookCard.append(removeButton);
        
        bookLibrary.append(bookCard);
});  
};                        

//add an example book
const exampleBook = new Book("The Catcher in the Rye", "J.D. Salinger", 234, "Read");
    myLibrary.push(exampleBook);
    addBookToLibrary()

