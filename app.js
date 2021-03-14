let library = [];
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${read == true ? "read" : "not read yet"}`;
    }
}
//------------Create book cards for each new book--------------------
const bookCard = document.createElement('div');
bookCard.classList.add('book-card');
const bookDisplayInfo = document.createElement('div');
bookDisplayInfo.id = "book-display-info";
for(let i =0; i<3; i++){
    bookDisplayInfo.appendChild(document.createElement('p'));
}
const bookRead = document.createElement('div');
bookRead.id = "book-read";
const bookRemove = document.createElement('div');
bookRemove.id = "book-remove";
let InnerCard = [bookDisplayInfo, bookRead, bookRemove];
for(let i = 0; i<3; i++){
    bookCard.appendChild(InnerCard[i]);
}
let removeButton;
let readButton;

//-------If the local storage is not empty display the books----------
if(localStorage.length != 0){
    library = JSON.parse(localStorage.getItem('library'));
    const libraryDisplay = document.querySelector('#library-display');
    for(let i = 0; i< library.length; i++){
        let book = library[i];
        bookCard.children[0].children[0].innerText = (book.title).toUpperCase();
        bookCard.children[0].children[1].innerText = `by ${book.author}`;
        bookCard.children[0].children[1].style.fontStyle = "italic";
        bookCard.children[0].children[2].innerText = `pg. ${book.pages}`;
        bookCard.children[0].children[2].style.fontStyle = "italic";
        (bookCard.children[1]).innerText = `Read : ${book.read}`;
        (bookCard.children[2]).innerText = "Remove";
        bookCard.dataset.title = book.title;
        libraryDisplay.insertBefore(bookCard.cloneNode(yes),libraryDisplay.firstElementChild);
    }
    removeButton = document.querySelectorAll('#book-remove');
    removeButton.forEach(button => button.addEventListener('click', removeBook));
    readButton = document.querySelectorAll("#book-read");
    readButton.forEach(button => button.addEventListener('click', readBook));
}

const addSectionButton = document.querySelector("#add-section-button");
const addSection = document.querySelector('#add-book');
const bookAddButton = document.querySelector('input[type = "submit"]');

//--Below for adding book section function--
let arr = Array.from(addSectionButton.childNodes);
const buttonText = arr[0];
let isAddSectionOpen = false;
addSectionButton.addEventListener('click', function(){
    if(!isAddSectionOpen){
        buttonText.innerText = "Close"
        addSection.style.left = "0px";
        isAddSectionOpen = true;
        this.style.width = "auto";
        this.style.padding = "10px";
    }else{
        addSection.style.left = "-350px";
        buttonText.innerText = "New book";
        isAddSectionOpen = false;
        this.style.width = "20%";
        this.style.padding = "0px";
    }
    
})

function addBookToLibrary(){
    let bookTitle = document.querySelector("#title").value;
    let bookAuthor = document.querySelector("#author").value;
    let bookPages = document.querySelector("#pages").value;
    let bookRead;
    let readArr = Array.from(document.getElementsByName("read"));
    readArr.forEach(function(radioButton){
        if(radioButton.checked){
            bookRead = radioButton.value;
        }
    })
    if(bookTitle != "" && bookAuthor != "" && bookPages != ""){
        const book = new Book(bookTitle, bookAuthor, bookPages, bookRead);
        library.unshift(book);
        localStorage.setItem('library', JSON.stringify(library));
    }
}

bookAddButton.addEventListener("click", addBookToLibrary);

//-----------------------------------------------------------------
function displayBook(){
    const libraryDisplay = document.querySelector('#library-display');
    let book = library[0];
    bookCard.children[0].children[0].innerText = (book.title).toUpperCase();
    bookCard.children[0].children[1].innerText = `by ${book.author}`;
    bookCard.children[0].children[1].style.fontStyle = "italic";
    bookCard.children[0].children[2].innerText = `pg. ${book.pages}`;
    bookCard.children[0].children[2].style.fontStyle = "italic";
    (bookCard.children[1]).innerText = `Read : ${book.read}`;
    (bookCard.children[2]).innerText = "Remove";
    bookCard.dataset.title = book.title;
    libraryDisplay.insertBefore(bookCard.cloneNode(yes),libraryDisplay.firstElementChild);
    removeButton = document.querySelectorAll('#book-remove');
    removeButton.forEach(button => button.addEventListener('click', removeBook));
    readButton = document.querySelectorAll("#book-read");
    readButton.forEach(button => button.addEventListener('click', readBook));
}

bookAddButton.addEventListener('click',displayBook);

function removeBook(e){
    const bookTitle = e.target.parentElement.children[0].children[0].innerText;
    const index = library.findIndex(book => book.title == bookTitle.toLowerCase());
    library.splice(index,1);
    localStorage.setItem('library', JSON.stringify(library));
    //Get the book from the dislay section and remove it
    const bookCards = Array.from(document.querySelectorAll('.book-card'));
    bookCards.forEach(function(book){
        if(book.dataset.title == bookTitle.toLowerCase()){
            book.remove();
        }
    });
}

function readBook(e){
    const bookTitle = e.target.parentElement.children[0].children[0].innerText;
    const index = library.findIndex(book => book.title == bookTitle.toLowerCase());
    const book = library[index];
    book.read = (book.read == 'yes') ? 'no' : 'yes';
    localStorage.setItem('library', JSON.stringify(library));
    e.target.innerText = `Read : ${book.read}`;
}




