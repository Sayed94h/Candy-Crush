const candybox = document.getElementById("candy-crushbox");

const width = 8;
let scores = 0;
let scoresBox = document.getElementById("score");

const candyArr = [];
const candyColors = [
	"url(./public/candies/red.png)",
	"url(./public/candies/yellow.png)",
	"url(./public/candies/orange.png)",
	"url(./public/candies/purple.png)",

	"url(./public/candies/green.png)",
	"url(./public/candies/blue.png)",
];

// Create board

function createBoard() {
	for (let i = 0; i < width * width; i++) {
		let candy = document.createElement("div");
		let randomCandyColors = Math.floor(Math.random() * candyColors.length);
		candy.style.backgroundImage = candyColors[randomCandyColors];
		candy.setAttribute("draggable", true);
		candy.id = i;
		candybox.appendChild(candy);
		candyArr.push(candy);
	}
}

createBoard();

// Drag candies

let candyColorBeingDragged;
let candyColorBeingReplaced;
let candyIdBeingDragged;
let candyIdBeingReplaced;
candyArr.forEach((eachCandy) =>
	eachCandy.addEventListener("dragstart", dragStart)
);
candyArr.forEach((eachCandy) => eachCandy.addEventListener("dragend", dragEnd));
candyArr.forEach((eachCandy) =>
	eachCandy.addEventListener("dragover", dragOver)
);
candyArr.forEach((eachCandy) =>
	eachCandy.addEventListener("dragenter", dragEnter)
);
candyArr.forEach((eachCandy) =>
	eachCandy.addEventListener("dragleave", dragLeave)
);
candyArr.forEach((eachCandy) => eachCandy.addEventListener("drop", dragDrop));
/**
 *
 * Drag starts
 */
function dragStart(event) {
	candyColorBeingDragged = this.style.backgroundImage;
	candyIdBeingDragged = parseInt(this.id);
	//event.preventDefault();
	//console.log("drag starts");
}
/**
 * Drag overs
 */

function dragOver(event) {
	event.preventDefault();
	//console.log("drag overs");
}
/**
 *
 * Drag Enters
 */
function dragEnter(event) {
	event.preventDefault();
	//console.log("drag Enters");
}
/**
 * Drag Leaves
 */
function dragLeave(event) {
	//event.preventDefault();
	//console.log("drag Leaves");
}

/**
 * Drag Ends
 */
function dragEnd() {
	//console.log("drag ends");
	let correctMoves = [
		candyIdBeingDragged - 1,
		candyIdBeingDragged - width,
		candyIdBeingDragged + 1,
		candyIdBeingDragged + width,
	];
	let correctMove = correctMoves.includes(candyIdBeingReplaced);
	if (candyIdBeingReplaced && correctMove) {
		candyIdBeingReplaced = null;
	} else if (candyIdBeingReplaced && !correctMove) {
		candyArr[
			candyIdBeingReplaced
		].style.backgroundImage = candyColorBeingReplaced;
		candyArr[
			candyIdBeingDragged
		].style.backgroundImage = candyColorBeingDragged;
	} else {
		candyArr[
			candyIdBeingDragged
		].style.backgroundImage = candyColorBeingDragged;
	}
}

/**
 * check for matches 		first - rows and columns of three
 * check for row of three
 */

function checkRowForThree() {
	for (let i = 0; i < 61; i++) {
		let rowOfThree = [i, i + 1, i + 2];
		let decidedColor = candyArr[i].style.backgroundImage;
		const isBlank = candyArr[i].style.backgroundImage === "";
		const notCorrectMove = [
			6,
			7,
			14,
			15,
			22,
			23,
			30,
			31,
			38,
			39,
			46,
			47,
			54,
			55,
		];
		if (notCorrectMove.includes(i)) {
			continue;
		}
		if (
			rowOfThree.every(
				(index) =>
					candyArr[index].style.backgroundImage === decidedColor && !isBlank
			)
		) {
			scores += 3;
			scoresBox.textContent = `${scores}`;
			rowOfThree.forEach((index) => {
				candyArr[index].style.backgroundImage = "";
			});
		}
	}
}
//checkRowForThree();

/*
 * check for column of three
 */

function checkColForThree() {
	for (let i = 0; i < 47; i++) {
		let colOfThree = [i, i + width, i + width * 2];

		let decidedColor = candyArr[i].style.backgroundImage;
		const isBlank = candyArr[i].style.backgroundImage === "";

		if (
			colOfThree.every(
				(index) =>
					candyArr[index].style.backgroundImage === decidedColor && !isBlank
			)
		) {
			scores += 3;
			scoresBox.textContent = `${scores}`;
			colOfThree.forEach((index) => {
				candyArr[index].style.backgroundImage = "";
			});
		}
	}
}
//checkColForThree();
/**
 * drop candies if the row or column below the candies is empty
 */

function dropCandies() {
	for (let i = 0; i < 55; i++) {
		if (candyArr[i + width].style.backgroundImage === "") {
			candyArr[i + width].style.backgroundImage =
				candyArr[i].style.backgroundImage;
			candyArr[i].style.backgroundImage = "";
			const firstRow = [0, 1, 2, 3, 4, 6, 7];
			const isFirstRow = firstRow.includes(i);
			if (isFirstRow && candyArr[i].style.backgroundImage === "") {
				let randomNumberFormColorArr = Math.floor(
					Math.random() * candyColors.length
				);
				candyArr[i].style.backgroundImage =
					candyColors[randomNumberFormColorArr];
			}
		}
	}
}
dropCandies();
/**
 * check for matches 		second - rows and columns of four
 * check for rows of four
 */

function checkRowForFour() {
	for (let i = 0; i < 60; i++) {
		let rowOfFour = [i, i + 1, i + 2, i + 3];
		let decidedColor = candyArr[i].style.backgroundImage;
		const isBlank = candyArr[i].style.backgroundImage === "";
		const notCorrectMove = [
			5,
			6,
			7,
			14,
			15,
			21,
			22,
			23,
			29,
			30,
			31,
			37,
			38,
			39,
			45,
			46,
			47,
			53,
			54,
			55,
		];
		if (notCorrectMove.includes(i)) {
			continue;
		}
		if (
			rowOfFour.every(
				(index) =>
					candyArr[index].style.backgroundImage === decidedColor && !isBlank
			)
		) {
			scores += 4;
			scoresBox.textContent = `${scores}`;
			rowOfFour.forEach((index) => {
				candyArr[index].style.backgroundImage = "";
			});
		}
	}
}
//checkRowForFour();

/*
 * check for column of Four
 */

function checkColForFour() {
	for (let i = 0; i < 39; i++) {
		let colOfFour = [i, i + width, i + width * 2, i + width * 3];

		let decidedColor = candyArr[i].style.backgroundImage;
		const isBlank = candyArr[i].style.backgroundImage === "";

		if (
			colOfFour.every((index) => {
				candyArr[index].style.backgroundImage === decidedColor && !isBlank;
			})
		) {
			scores += 4;
			scoresBox.textContent = `${scores}`;
			colOfFour.forEach((index) => {
				candyArr[index].style.backgroundImage = "";
			});
		}
	}
}
//checkColForFour();

/**
 * check for matches 		third - rows and columns of five
 * check for rows of five
 */

function checkRowForFive() {
	for (let i = 0; i < 59; i++) {
		let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
		let decidedColor = candyArr[i].style.backgroundImage;
		const isBlank = candyArr[i].style.backgroundImage === "";
		const notCorrectMove = [
			4,
			5,
			6,
			7,
			12,
			13,
			14,
			15,
			20,
			21,
			22,
			23,
			28,
			29,
			30,
			31,
			36,
			37,
			38,
			39,
			44,
			45,
			46,
			47,
			52,
			53,
			54,
			55,
		];
		if (notCorrectMove.includes(i)) {
			continue;
		}
		if (
			rowOfFive.every(
				(index) =>
					candyArr[index].style.backgroundImage === decidedColor && !isBlank
			)
		) {
			scores += 5;
			scoresBox.textContent = `${scores}`;
			rowOfFive.forEach((index) => {
				candyArr[index].style.backgroundImage = "";
			});
		}
	}
}
//checkRowForFive();

/*
 * check for column of Five
 */

function checkColForFive() {
	for (let i = 0; i < 31; i++) {
		let colOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4];

		let decidedColor = candyArr[i].style.backgroundImage;
		const isBlank = candyArr[i].style.backgroundImage === "";

		if (
			colOfFive.every((index) => {
				candyArr[index].style.backgroundImage === decidedColor && !isBlank;
			})
		) {
			scores += 5;
			scoresBox.textContent = `${scores}`;
			colOfFive.forEach((index) => {
				candyArr[index].style.backgroundImage = "";
			});
		}
	}
}
//checkColForFive();

window.setInterval(function () {
	dropCandies();
	checkRowForFive();
	checkColForFive();
	checkRowForFour();
	checkColForFour();
	checkRowForThree();
	checkColForThree();
}, 100);

/**
 *
 * Drag drops
 *
 *
 */
function dragDrop() {
	//console.log("drag drops");
	candyIdBeingReplaced = parseInt(this.id);
	candyColorBeingReplaced = this.style.backgroundImage;
	candyArr[candyIdBeingDragged].style.backgroundImage = candyColorBeingReplaced;
	this.style.backgroundImage = candyColorBeingDragged;
}
