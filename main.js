let game = document.querySelector(".game");
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let chooseLevel = document.querySelector(".choose-level");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let formInput = document.querySelector(".form-input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

formInput.onkeypress = () => document.getElementById("click-effect").play();

const words = [
	"Programming",
	"Javascript",
	"Testing",
	"Linkedin",
	"Github",
	"LeetCode",
	"Python",
	"Destructuring",
	"Paradigm",
	"Styling",
	"Documentation",
	"Coding",
	"Dependencies",
	"Task",
	"Test",
];

const lvls = { Easy: 7, Normal: 5, Hard: 3 };

let defaultLevelName = "Easy";
let defaultLevelSeconds = lvls[defaultLevelName];

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
chooseLevel.innerHTML = defaultLevelName;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

const levelNames = Object.keys(lvls);
let currentLevel = 0;
function changeLevel() {
	currentLevel = (currentLevel + 1) % levelNames.length;
	lvlNameSpan.innerHTML = levelNames[currentLevel];
	secondsSpan.innerHTML = lvls[levelNames[currentLevel]];
	chooseLevel.innerHTML = levelNames[currentLevel];
	timeLeftSpan.innerHTML = lvls[levelNames[currentLevel]];
}
chooseLevel.onclick = function () {
	changeLevel();
};

formInput.onpaste = function () {
	return false;
};

startButton.onclick = function () {
	this.remove();
	formInput.focus();
	genWords();
};

function genWords() {
	let randomWord = words[Math.floor(Math.random() * words.length)];
	let wordIndex = words.indexOf(randomWord);
	words.splice(wordIndex, 1);
	theWord.innerHTML = randomWord;
	upcomingWords.innerHTML = "";
	for (let i = 0; i < words.length; i++) {
		let div = document.createElement("div");
		let txt = document.createTextNode(words[i]);
		div.appendChild(txt);
		upcomingWords.appendChild(div);
	}
	startPlay();
}

function startPlay() {
	timeLeftSpan.innerHTML = lvls[levelNames[currentLevel]];
	let start = setInterval(() => {
		timeLeftSpan.innerHTML--;
		if (timeLeftSpan.innerHTML === "0") {
			clearInterval(start);
			if (theWord.innerHTML === formInput.value) {
				formInput.value = "";
				scoreGot.innerHTML++;
				if (words.length > 0) {
					genWords();
				} else {
					let span = document.createElement("span");
					span.className = "good";
					let spanText = document.createTextNode("Congrats");
					span.appendChild(spanText);
					finishMessage.appendChild(span);
					upcomingWords.remove();

					let re = document.createElement("div");
					re.className = "again";
					let reText = document.createTextNode("Play again");
					re.appendChild(reText);
					game.appendChild(re);
					re.onclick = function () {
						location.reload();
					};
				}
			} else {
				let span = document.createElement("span");
				span.className = "bad";
				let spanText = document.createTextNode("Game Over");
				span.appendChild(spanText);
				finishMessage.appendChild(span);
				upcomingWords.remove();

				let re = document.createElement("div");
				re.className = "reload";
				let reText = document.createTextNode("↻");
				re.appendChild(reText);
				game.appendChild(re);
				re.onclick = function () {
					location.reload();
				};
			}
		}
	}, 1000);
}
