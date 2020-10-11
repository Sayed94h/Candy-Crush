const candybox = document.getElementById("candy-crushbox");

const width = 8;
const candydArr = [];
const candyColors = ["red", "yellow", "orange", "purple", "green", "blue"];

// Create board

function createBoard() {
	for (let i = 0; i < width * width; i++) {
		let candy = document.createElement("div");
		let randomCandyColors = Math.floor(Math.random() * candyColors.length);
		candy.style.backgroundColor = candyColors[randomCandyColors];
		candy.setAttribute("draggable", true);
		candy.id = i;
		candybox.appendChild(candy);
		candydArr.push(candy);
	}
}

createBoard();

// Drag candies

let candyColorBeingDragged;
let candyColorBeingReplaced;
let candyIdBeingDragged;
let candyIdBeingReplaced;
candydArr.forEach((eachCandy) =>
	eachCandy.addEventListener("dragstart", dragStart)
);
candydArr.forEach((eachCandy) =>
	eachCandy.addEventListener("dragend", dragEnd)
);
candydArr.forEach((eachCandy) =>
	eachCandy.addEventListener("dragover", dragOver)
);
candydArr.forEach((eachCandy) =>
	eachCandy.addEventListener("dragenter", dragEnter)
);
candydArr.forEach((eachCandy) =>
	eachCandy.addEventListener("dragleave", dragLeave)
);
candydArr.forEach((eachCandy) => eachCandy.addEventListener("drop", dragDrop));

function dragStart(event) {
	candyColorBeingDragged = this.style.backgroundColor;
	candyIdBeingDragged = parseInt(this.id);
	//event.preventDefault();
	console.log("drag starts");
}
function dragEnd(event) {
	//	event.preventDefault();
	console.log("drag ends");
}
function dragOver(event) {
	event.preventDefault();
	console.log("drag overs");
}
function dragEnter(event) {
	event.preventDefault();
	console.log("drag Enters");
}
function dragLeave(event) {
	//event.preventDefault();
	console.log("drag Leaves");
}
function dragDrop() {
	console.log("drag drops");
	candyIdBeingReplaced = parseInt(this.id);
	candyColorBeingReplaced = this.style.backgroundColor;
	candydArr[
		candyIdBeingDragged
	].style.backgroundColor = candyColorBeingReplaced;
	this.style.backgroundColor = candyColorBeingDragged;
}
