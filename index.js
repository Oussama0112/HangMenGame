//-----------setting the alphabaticals letters to choose from-------
let alphaLetters = "abcdefghijklmnopqrstuvwxyz",
  availableLetters = document.querySelector(".letters");

alphaLetters.split("").forEach((ele) => {
  let span = document.createElement("span");
  span.className = "chosenLetter";
  span.innerText = ele.toUpperCase();
  availableLetters.appendChild(span);
});

// -----------------------setting the object of the words and category-------------------
const words = {
  programming: ["php", "javascript", "go", "scala", "fortran", "rust", "mysql", "python"],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
//-------------------preparing the available category for the user --------------
let myCategoryDataList = document.querySelector("datalist");
let availableCategoryList = Object.keys(words);
availableCategoryList.forEach((ele) => {
  let myoption = document.createElement("option");
  myoption.value = ele;
  myoption.innerText = ele;
  myCategoryDataList.appendChild(myoption);
});
//-------------------game start set---------------------------------

let selectedCategoryDisplay = document.querySelector(".chosenCategory"),
  myInputCategory = document.querySelector(".categ"),
  startBtn = document.querySelector(".startBtn"),
  userName = document.querySelector(".name"),
  lettersToGuess = document.querySelector(".wordtoGeuss");
// --------start button event-----------
startBtn.addEventListener("click", (e) => {
  let name = window.prompt("Enter your Name please");
  if (name === null || name.trim() === "") {
    userName.innerHTML = `name : unknown`;
  } else {
    userName.innerHTML = `name : ${name}`;
  }
  if (myInputCategory.value && availableCategoryList.includes(myInputCategory.value)) {
    const category = myInputCategory.value;
    selectedCategoryDisplay.innerHTML = category;
    randomWord(category);
  } else if (
    (myInputCategory.value = "" || !availableCategoryList.includes(myInputCategory.value))
  ) {
    const category1 =
      availableCategoryList[Math.floor(Math.random() * availableCategoryList.length)];

    selectedCategoryDisplay.innerHTML = category1;

    randomWord(category1);
  }
  startBtn.parentElement.remove();
});
// ------------------------------------------------------------------------
//---------------------------main events------------------------------------
// -------------------------------------------------------------------------
let wrong = 0;

document.addEventListener("click", function (event) {
  let wordToVerify = window.localStorage.getItem("myword"),
    hangMan = document.querySelectorAll(".wrong"),
    gussedLetter = document.querySelectorAll(".gussedLetter");
  if (event.target.classList.contains("chosenLetter")) {
    let contenue = event.target.innerText.toLocaleLowerCase(),
      myLetterArray = wordToVerify.toLocaleLowerCase().split("");
    // -----selecting and verifying a singel word each time-----------
    if (myLetterArray.includes(contenue)) {
      for (let i = 0; i < myLetterArray.length; i++) {
        if (myLetterArray[i] == contenue && gussedLetter[i].innerText === "") {
          gussedLetter[i].innerText = wordToVerify.split("")[i];
          document.querySelector(".success").play();
          break;
        }
      }
    } else {
      if (wrong < hangMan.length - 1) {
        hangMan[wrong].style.display = "block";
        wrong++;
        document.querySelector(".fail").play();
      } else {
        gussedLetter.forEach((ele) => (ele.style.cssText = "pointer-events: none;"));
        setTimeout(() => {
          gameOver(wordToVerify, document.querySelector(".chosenCategory").innerText);
          document.querySelector(".lost").play();
        }, 1500);
      }
    }
    let gla = [];
    gussedLetter.forEach((ele, i) => {
      gla.push(gussedLetter[i].innerText);
    });
    if (gla.filter((ele) => ele !== "").length === gussedLetter.length) {
      setTimeout(() => {
        youWon(wordToVerify, document.querySelector(".chosenCategory").innerText);
        document.querySelector(".won").play();
      }, 1500);
    }
  }
});

//--------------------------------function to call--------------------------
//1/--------------- random word selected from the input value and creating the empty span-------------
function randomWord(category) {
  let a = words[category];
  let hint = document.querySelector(".firstLetter");
  let myWord = a[Math.floor(Math.random() * a.length)];
  if (myWord.length > 3) {
    hint.innerText = `the first letter is "${myWord.charAt(
      0
    )}" and the last letter is "${myWord.charAt(myWord.length - 1)}"`;
  }
  window.localStorage.setItem("myword", myWord);
  myWord.split("").forEach((ele) => {
    let span = document.createElement("span");
    span.className = "gussedLetter";
    if (ele === " ") {
      span.innerText = "-";
    } else {
      span.innerText = "";
    }
    lettersToGuess.appendChild(span);
  });
}

// ---------------end game popup----------
function gameOver(word, category) {
  let endContainer = document.createElement("div"),
    paragraphe = document.createElement("p"),
    playAgainBtn = document.createElement("button");
  endContainer.className = "gameStart";
  paragraphe.className = "greeting";
  paragraphe.innerHTML = `the word was ${word} from the ${category} category <br> sadly you lost this time better luck next time`;
  playAgainBtn.className = "startBtn";
  playAgainBtn.innerText = "play again";
  playAgainBtn.style.cssText = "margin-top:40px;";
  playAgainBtn.addEventListener("click", () => {
    window.location.reload();
  });
  endContainer.appendChild(paragraphe);
  endContainer.appendChild(playAgainBtn);
  document.body.appendChild(endContainer);
}
function youWon(w, p) {
  let endContainer = document.createElement("div"),
    paragraphe = document.createElement("p"),
    playAgainBtn = document.createElement("button");
  endContainer.className = "gameStart";
  paragraphe.className = "greeting";
  paragraphe.innerHTML = `greate you won!!!!!!! <br> the word was ${w} from the ${p} category`;
  playAgainBtn.className = "startBtn";
  playAgainBtn.innerText = "play again";
  playAgainBtn.style.cssText = "margin-top:40px;";
  playAgainBtn.addEventListener("click", () => {
    window.location.reload();
  });
  endContainer.appendChild(paragraphe);
  endContainer.appendChild(playAgainBtn);
  document.body.appendChild(endContainer);
}
