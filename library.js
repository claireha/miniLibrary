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
var book2 = {title:"20,000 Leagues Under the Sea", author:"Jules Verne", requestedBy:[], location:"Checked Out", checkedOutBy: "karen", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/VrF4oKsKXgppOL9-0CMQ_rockpaperbooks3.png"};
var book3 = {title:"The Art of War", author:"Sun Tzu", requestedBy:[], location:"Library", checkedOutBy: "Library", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/bAdLK-I9VWXA9otlXyWL_rockpaperbooks5.png"};
var book4 = {title:"Moby Dick", author:"Herman Melville", requestedBy:[], location:"Checked Out", checkedOutBy: "karen", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/5YIh-o2i55cRUR8KfsNX_rockpaperbooks10.png"};
var book5 = {title:"The Odyssey", author:"Homer", requestedBy:[], location:"Library", checkedOutBy: "Library", img: "https://mymodernmet.com/wp/wp-content/uploads/archive/7vca9hzJahOi2CuQ3E9y_rockpaperbooks14.png"};

// Hardcoded users 
var mike = {name:"mike", books:[book1]};
var claire = {name:"claire", books:[]};
var karen = {name:"karen", books:[book4, book2]};
var harley = {name:"harley", books:[]};


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
	signupButton.addEventListener('click',function(){
			var newUsername= prompt("Please enter your username", "");
			var newUser = {name:newUsername, books:[]};
			users.push(newUser)
			username = newUsername;
			usernameMessage.textContent = "Welcome to the library, " + username + "!";
		})
}

function addmenuButtonsListener(){
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

	books = document.querySelectorAll(".books");
	for(var i=0; i < books.length; i++){
		books[i].addEventListener('click',function(){

			currentBook = filterValue(libraryBooks,"title",this.textContent);

			bodyText.innerHTML = "<h2>" + currentBook.title + "</h2>"
			bodyText.innerHTML += "<br><strong>Title</strong>: " + currentBook.title;
			bodyText.innerHTML += "<br><strong>Author</strong>: " + currentBook.author;
			bodyText.innerHTML += "<br><strong>Current Location</strong>: " + currentBook.location;

			displayCheckOrRequest();

			bodyText.innerHTML += "<br><br>";
			bodyImage.innerHTML  = "<br><br><img src='" + currentBook.img +  "'></div>";
			
		})
	}
}



function displayCheckOrRequest(){

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
			button.addEventListener("click", function() {
			  console.log('i worked');
			});
		} else {
			var button = document.createElement("button");
			bodyText.innerHTML += "<br><strong>Checked Out By</strong>: " + currentBook.checkedOutBy;
			button.innerHTML = "Request?";
			bodyAction.appendChild(button)
			button.addEventListener("click", function() {
			  console.log('i worked');
			});
		}
	}
}


function returnBook(){

	

	// Remove the book from ther user's array of books
	var userBooks = filterValue(users,"name",username).books // array of the books for the user 
	var index = userBooks.indexOf(currentBook)
	if (index > -1) {
        userBooks.splice(index, 1);
    }

    reset();
    menuButtons[2].classList.add("selected")
	displayMyBooks();


    // change location and checked out by param for the book object
    console.log(libraryBooks); // array of lib books
    var index = libraryBooks.indexOf(currentBook)
    libraryBooks[index].location = "Library"; 
    libraryBooks[index].checkedOutBy = "Library";
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

function displayLibraryBooks(){ 

	for(var i=0; i < libraryBooks.length; i++){
		if(libraryBooks[i].checkedOutBy==="Library"){
			secondaryButtonsDiv.innerHTML += "<button class=\"secondaryButtons books\"><i class=\"fas fa-book\"></i>"+libraryBooks[i].title+"</button>";
		} else {
			secondaryButtonsDiv.innerHTML += "<button class=\"secondaryButtons books\"><i class=\"far fa-times-circle\"></i>"+libraryBooks[i].title+"</button>";
		}
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
