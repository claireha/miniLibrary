// Declare Login/Sign Up Variables 
var username = document.querySelector("#usernameForm").elements.namedItem("username").value;
var usernameSubmit = document.querySelector("button");
var usernameMessage = document.querySelector("#usernameMessage");
var usernameForm = document.querySelector("#usernameForm");
var signupButton = document.querySelector("#signup");


// Declare Header & Secondary Section Variables 
var menuButtons = document.querySelectorAll(".menuButtons");
var secondaryButtonsDiv = document.querySelector("#secondaryButtonsDiv");
var messageDisplay = document.querySelector("#messageDisplay");
var secondaryHeader = document.querySelector("#secondaryHeader");
var secondaryMessageDisplay = document.querySelector("#secondaryMessageDisplay");

// Declare Body variables 
var bodyText = document.querySelector("#bodyText");
var bodyAction = document.querySelector("#bodyAction");
var bodyImage = document.querySelector("#bodyImage");
var books = document.querySelectorAll(".books");

// Hardcoded books
var book1 = {title:"Dracula", author:"Bram Stoker", requestedBy:[], location:"Checked Out", checkedOutBy: "mike", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/NqQICa118fuVFZGBcmvj_rockpaperbooks2.png"};
var book2 = {title:"20,000 Leagues Under the Sea", author:"Jules Verne", requestedBy:[], location:"Checked Out", checkedOutBy: "harley", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/VrF4oKsKXgppOL9-0CMQ_rockpaperbooks3.png"};
var book3 = {title:"Time Machine", author:"H.G. Wells", requestedBy:[], location:"Library", checkedOutBy: "Library", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/O-GtmQ4EVp-4zEif--bH_rockpaperbooks12.png"};
var book4 = {title:"The Art of War", author:"Sun Tzu", requestedBy:[], location:"Library", checkedOutBy: "Library", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/bAdLK-I9VWXA9otlXyWL_rockpaperbooks5.png"};
var book5 = {title:"Peter Pan", author:"James Matthew Barrie", requestedBy:[], location:"Library", checkedOutBy: "Library", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/4PFoSAOaRZpkmMDdxSYA_rockpaperbooks15.png"};
var book6 = {title:"Around The World in 80 Days", author:"Jules Verne", requestedBy:[], location:"Library", checkedOutBy: "Library", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/8Xm7KKJiEt8lD2Y1469s_rockpaperbooks13.png"};
var book7 = {title:"Moby Dick", author:"Herman Melville", requestedBy:[], location:"Checked Out", checkedOutBy: "karen", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/5YIh-o2i55cRUR8KfsNX_rockpaperbooks10.png"};
var book8 = {title:"Don Quixote", author:"Miguel de Cervantes", requestedBy:[], location:"Library", checkedOutBy: "Library", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/bsGyOSc-J9Xny5ChSFWQ_rockpaperbooks7.png"};
var book9 = {title:"The Odyssey", author:"Homer", requestedBy:[], location:"Library", checkedOutBy: "Library", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/7vca9hzJahOi2CuQ3E9y_rockpaperbooks14.png"};
var book10 = {title:"The Adventure of Sherlock Holmes", author:"Arthur Conan Doyle", requestedBy:[], location:"Library", checkedOutBy: "Library", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/oEMh3U6uTOqbFZRYq-HY_rockpaperbooks6.png"};
var book11 = {title:"The Wonderful Wizard of Oz", author:"L. Frank Baum", requestedBy:[], location:"Checked Out", checkedOutBy: "karen", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/aMGvOex15deEtnm7PQan_rockpaperbooks4.png"};

// Hardcoded users 
var mike = {name:"mike", books:[book1]};
var claire = {name:"claire", books:[]};
var karen = {name:"karen", books:[book7, book11]};
var harley = {name:"harley", books:[book2]};
book1.requestedBy.push(karen);
book1.requestedBy.push(harley);

// Hardcoded array for users and library Books
var users = [mike, claire, karen, harley];
var libraryBooks = [book1,book2,book3,book4,book5,book6,book7,book8,book9,book10,book11]


init(); 

function init(){
	addLoginListener();
	addmenuButtonsListener();
}


function filterValue(obj, key, value) {
	return obj.find(function(v){ return v[key] === value});
}


function addLoginListener(){
	// Adds event listener on the sign up + new user form 
	usernameForm.addEventListener('submit', function(){
		username = document.querySelector("#usernameForm").elements.namedItem("username").value;
		if(filterValue(users,"name",username).name === username){
			usernameMessage.textContent = "Welcome back, " + username + "!";
		} else {
			usernameMessage.textContent = "Welcome, looks like you're new!";
		}
		event.preventDefault();
	})

	createNewUser();
	
}

function createNewUser(){
	// Prompts user for username and creates new users 
	signupButton.addEventListener('click',function(){
			var newUsername= prompt("Please enter your username", "");
			var newUser = {name:newUsername, books:[]};
			users.push(newUser)
			username = newUsername;
			usernameMessage.textContent = "Welcome to the library, " + username + "!";
		})
}

function addmenuButtonsListener(){
	// adds listners to the menu buttons and calls relevant functions 
	for(var i=0; i < menuButtons.length; i++){
		menuButtons[i].addEventListener('click',function(){
			if(this.textContent==='View Library Catalog'){
				reset();
				displayLibraryBooks();
				this.classList.add("selected")
				messageDisplay.innerHTML="<h2>Select a book to check out or request!</h2>"
			} else if (this.textContent==='View/Return Books'){
				reset();
				displayMyBooks();
				this.classList.add("selected")
				messageDisplay.innerHTML="<h2>Select a book to view or return!</h2>"
			} else if(this.textContent==='Donate A Book'){
				reset();
				this.classList.add("selected")
				messageDisplay.innerHTML="<h2>Want to donate a book to the library?</h2>"
				secondaryButtonsDiv.innerHTML += "<br>Coming soon, you will be able to add your own books to the library!"
			} else if(this.innerHTML==="<i class=\"fas fa-home\" aria-hidden=\"true\"></i>"){
				reset();
				this.classList.add("selected")
				messageDisplay.innerHTML="<h2>WHAT DO YOU WANT TO DO?</h2>"
				secondaryButtonsDiv.innerHTML += "<br>Select a button to do something in the library."
			} else if(this.innerHTML==="<i class=\"fas fa-pencil-alt\" aria-hidden=\"true\"></i>"){
				reset();
				this.classList.add("selected")
				messageDisplay.innerHTML="<h2>LIBRARY ADMIN PANEL</h2>"
				secondaryButtonsDiv.innerHTML += "<br>Coming soon, you will be able to remove books and library card holders!"
			}
		})
	}
}


function addBookListener(){
	// crerates listener for book 
	books = document.querySelectorAll(".books");
	for(var i=0; i < books.length; i++){
		books[i].addEventListener('click',function(){

			currentBook = filterValue(libraryBooks,"title",this.textContent);
			showBookDetails()

		})
	}
}

function showBookDetails(){
	// Shows details for the book in the body 
	bodyText.innerHTML = "<h2>" + currentBook.title + "</h2>"
	bodyText.innerHTML += "<br><strong>Title</strong>: " + currentBook.title;
	bodyText.innerHTML += "<br><strong>Author</strong>: " + currentBook.author;
	bodyText.innerHTML += "<br><strong>Current Location</strong>: " + currentBook.location;

	displayCheckOrRequest();

	bodyText.innerHTML += "<br><br>";
	bodyImage.innerHTML  = "<br><br><img src='" + currentBook.img +  "'></div>";
}


function displayCheckOrRequest(){
	// Displays Check Out or Request button based on book stattus 
	// Adds event listeners and calls the relevant function
	bodyAction.innerHTML = "";

	if(menuButtons[2].classList.contains("selected")){
		var button = document.createElement("button");
		button.textContent = "Return?";
		bodyAction.appendChild(button)
		button.addEventListener("click", returnBook);
		
	} else if(menuButtons[1].classList.contains("selected")){
		if(currentBook.location === 'Library'){
			var button = document.createElement("button");
			button.innerHTML = "Check Out?";
			bodyAction.appendChild(button)
			button.addEventListener("click", checkoutBook);
		} else {
			var button = document.createElement("button");
			bodyText.innerHTML += "<br><strong>Checked Out By</strong>: " + currentBook.checkedOutBy;
			bodyText.innerHTML += "<br><strong>Next on Waitlist</strong>: " + getWaitlist();
			button.innerHTML = "Request?";
			bodyAction.appendChild(button)
			button.addEventListener("click", requestBook);
		}
	}
}

function getWaitlist(){
	// Gets users on waitlist for given book
	if(currentBook.requestedBy.length <1){
		return("No waitlist!")
	}

	var waitlist = ""

	for(var i=0; i<currentBook.requestedBy.length; i++){
		waitlist = currentBook.requestedBy[i].name;
	}

	return waitlist;
}

function checkoutBook(){
	// Checks out book 

	validateUser()
	return;

	var userBooks = filterValue(users,"name",username).books // array of the books for the user 
	userBooks.push(currentBook)

    // change location and checked out by param for the book object
    var index = libraryBooks.indexOf(currentBook)
    libraryBooks[index].location = "Checked Out"; 
    libraryBooks[index].checkedOutBy = username;

    reset();
    menuButtons[1].classList.add("selected")
    displayLibraryBooks()
    showBookDetails()

    alert('Book successfully checked out!')

}

function validateUser(){
	// Validates that user is logged in, otherwise creates alert
	if(username === "" ){
		alert('Please login to do that. You can make a new user or login using \'karen\'')
	}
}

function requestBook(){

	validateUser();
	return; 

	// if user already on waitlist, send alert
	if(currentBook.requestedBy.includes(filterValue(users,"name",username))){
		alert('You\'re already on the waitlist!')
	} else if (currentBook.checkedOutBy === username) {
		alert('You currently have this book!')
	} else {
		currentBook.requestedBy.push(filterValue(users,"name",username));
		reset();
	    menuButtons[1].classList.add("selected")
	    displayLibraryBooks()
	    showBookDetails()
	    alert('You were successfully added to the waitlist')

	}

    

}

function returnBook(){

	validateUser();

	// Remove the book from ther user's array of books
	var userBooks = filterValue(users,"name",username).books // array of the books for the user 
	var index = userBooks.indexOf(currentBook)
	if (index > -1) {
        userBooks.splice(index, 1);
    }

    // change location and checked out by param for the book object
    var index = libraryBooks.indexOf(currentBook)
    libraryBooks[index].location = "Library"; 
    libraryBooks[index].checkedOutBy = "Library";

    reset();
    menuButtons[2].classList.add("selected")
	displayMyBooks();

    alert('Book successfully returned!')
}
	


function reset(){
	secondaryButtonsDiv.innerHTML = "";
	secondaryHeader.innerHTML="";
	bodyText.innerHTML = "";
	bodyAction.innerHTML = "";
	bodyImage.innerHTML = "";

	for(var i = 0; i < menuButtons.length; i++ ){
		menuButtons[i].classList.remove("selected")
	}
}

function getCheckedOutBooks(){

	checkedOutBooks = []

	for(var i = 0; i < libraryBooks.length; i++){
		if(libraryBooks[i].checkedOutBy==="Library"){
			checkedOutBooks.push(libraryBooks[i])
		}
	}

	return(checkedOutBooks)

}

function getAvailableBooks(){
	
	availableBooks = []

	for(var i = 0; i < libraryBooks.length; i++){
		if(libraryBooks[i].checkedOutBy!="Library"){
			availableBooks.push(libraryBooks[i])
		}
	}

	return(availableBooks)
}

function displayLibraryBooks(){ 

	secondaryButtonsDiv.innerHTML += "<p>Available for Check Out:</p>"

	checkedOutBooks = getCheckedOutBooks(); 
	availableBooks = getAvailableBooks(); 


	for(var i=0; i < checkedOutBooks.length; i++){
		secondaryButtonsDiv.innerHTML += "<button class=\"secondaryButtons books\"><i class=\"fas fa-book\"></i>"+checkedOutBooks[i].title+"</button>";
	}

	secondaryButtonsDiv.innerHTML += "<br><p>Checked Out But Waitlist Available:</p>"

	for(var i=0; i < availableBooks.length; i++){
		secondaryButtonsDiv.innerHTML += "<button class=\"secondaryButtons books\"><i class=\"far fa-times-circle\"></i>"+availableBooks[i].title+"</button>";	
	}

	addBookListener();

}

function displayMyBooks(){

	if(filterValue(users,"name",username) === undefined){
		secondaryButtonsDiv.innerHTML += "<br>You have no books!"
	} else if (filterValue(users,"name",username).books.length === 0){
		secondaryButtonsDiv.innerHTML += "<br>You have no books!"
	} else {
		var myBooks = filterValue(users,"name",username).books 
		for(var i=0; i < myBooks.length; i++){
			secondaryButtonsDiv.innerHTML += "<button class=\"secondaryButtons books\"><i class=\"fas fa-book\"></i>"+myBooks[i].title+"</button>";
		}
	}
	addBookListener();
	
}
