let imgArr = [
	"../public/images/1.jpg",
	"../public/images/2.jpg",
	"../public/images/3.jpg",
	"../public/images/4.jpg",
];
let i = 0;
function changeBackgrndImg() {
	if (i > 3) {
		i = 0;
	}
	document.body.style.backgroundImage = `url(${imgArr[i]})`;

	i++;
}

setInterval(changeBackgrndImg, 180000);
