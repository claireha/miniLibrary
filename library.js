// Declare variables 
var username;
var usernameSubmit = document.querySelector("button");
var usernameMessage = document.querySelector("#usernameMessage");
var usernameForm = document.querySelector("#usernameForm");
var menuButtons = document.querySelectorAll(".menuButtons");
var secondaryButtonsDiv = document.querySelector("#secondaryButtonsDiv");
var messageDisplay = document.querySelector("#messageDisplay");
var books = document.querySelectorAll(".books");
var secondaryHeader = document.querySelector("#secondaryHeader");
var secondaryMessageDisplay = document.querySelector("#secondaryMessageDisplay");

// Hardcoded users 
var mike = {name:"mike", books:{}};
var claire = {name:"claire", books:{}};
var karen = {name:"karen", books:{}};
var harley = {name:"harley", books:{}};

// Hardcoded books
var book1 = {title:"How To Kill a Mockingbird", author:"hi", requestedBy:{}, location:"Library", checkedOutBy: "Library"};
var book2 = {title:"Tom Sawyer", author:"hi", requestedBy:{}, location:"Library", checkedOutBy: "Library"};
var book3 = {title:"Harry Potter", author:"hello", requestedBy:{}, location:"Library", checkedOutBy: "Library"};
var book4 = {title:"Shoe Dogs", author:"hi2", requestedBy:{}, location:"Library", checkedOutBy: "Library"};
var book5 = {title:"Sapiens", author:"hi4", requestedBy:{}, location:"Library", checkedOutBy: "Library"};


// Hardcoded array for users and library Books
var users = [mike, claire, karen, harley];
var libraryBooks = [book1,book2,book3,book4,book5]


init(); 

function init(){
	addLoginListener();
	addmenuButtonsListener();

}

function filterValue(obj, key, value) {
	return obj.find(function(v){ return v[key] === value});
}

function addLoginListener(){
	usernameForm.addEventListener('submit', function(){
		username = document.querySelector("#usernameForm").elements.namedItem("username").value;
		if(filterValue(users,"name",username)){
			usernameMessage.textContent = "Welcome back, " + username + "!";
		} else{
			usernameMessage.textContent = "Welcome, looks like you're new!";
		}
		event.preventDefault();
	})
}

function addmenuButtonsListener(){
	for(var i=0; i < menuButtons.length; i++){
		menuButtons[i].addEventListener('click',function(){
			if(this.textContent==='View Library Catalog'){
				reset()
				displayLibraryBooks();
				messageDisplay.innerHTML="<h2>Currently: Viewing The Full Library Catalog</h2>"
			} else if (this.textContent==='View My Checked Out Books'){
				reset()
				messageDisplay.innerHTML="<h2>Currently: Viewing Your Checked Out Books</h2>"
			} else if(this.textContent==='Check Out a Book'){
				reset()
				messageDisplay.innerHTML="<h2>Currently: Checking Out A Book</h2>"
			} else if(this.textContent==='Return a Book'){
				reset()
				messageDisplay.innerHTML="<h2>Currently: Returning a Book</h2>"
			} else if(this.innerHTML==="<i class=\"fas fa-home\" aria-hidden=\"true\"></i>"){
				reset()
				messageDisplay.innerHTML="<h2>WHAT DO YOU WANT TO DO?</h2>"
			} else if(this.innerHTML==="<i class=\"fas fa-pencil-alt\" aria-hidden=\"true\"></i>"){
				reset()
				messageDisplay.innerHTML="<h2>LIBRARY ADMIN PANEL</h2>"
			}
		})
	}
}

// if the user clicks on the button of a book title, show book details
function addBookListener(){
	books = document.querySelectorAll(".books");
	for(var i=0; i < books.length; i++){
		books[i].addEventListener('click',function(){

			currentBook = filterValue(libraryBooks,"title",this.textContent);

			secondaryHeader.innerHTML="<h2>" + currentBook.title + "</h2>"
			secondaryMessageDisplay.innerHTML = "<strong>Title</strong>: " + currentBook.title;
			secondaryMessageDisplay.innerHTML += "<br><strong>Author</strong>: " + currentBook.author;
			secondaryMessageDisplay.innerHTML += "<br><strong>Current Location</strong>: " + currentBook.location;



		})
	}
}


function reset(){
	secondaryButtonsDiv.innerHTML = "";
	secondaryHeader.innerHTML="";
	secondaryMessageDisplay.innerHTML = "";
}

function displayLibraryBooks(){ 
	for(var i=0; i < libraryBooks.length; i++){
		secondaryButtonsDiv.innerHTML += "<button class=\"secondaryButtons books\"><i class=\"fas fa-book\"></i>"+libraryBooks[i].title+"</button>";
	}
	addBookListener();
}

// function displayBookDetails(){
// 	for
// }