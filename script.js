// Add Array Keywords
const words = [
  "Hello",
  "Beautiful",
  "Go",
  "Typing",
  "Town",
  "Country",
  "Testing",
  "Instagram",
  "Writing",
  "Twitter",
  "Island",
  "Presentation",
  "Internet",
  "Language",
  "English",
  "Biological",
  "Paradigm",
  "Styling",
  "Unfortunately",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Literally",
  "Playing",
];

// / Add Levels
const levels = {
  Easy: 7,
  Normal: 4,
  Hard: 2,
};

// Select Elements
let lvlName = document.querySelector(".message .lvl");
let secondsTimer = document.querySelector(".message .seconds");
let startBtn = document.querySelector(".start");
let word = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeft = document.querySelector(".time span");
let gottenScore = document.querySelector(".score .got");
let totalScore = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// Default level
let defaultLevelName;
let defaultLevelSeconds;

// Retrieve level from local storage
if (localStorage.getItem("typingTestLevel")) {
  defaultLevelName = localStorage.getItem("typingTestLevel");
  defaultLevelSeconds = levels[defaultLevelName];
} else {
  defaultLevelName = "Normal";
  defaultLevelSeconds = levels[defaultLevelName];
}

lvlName.innerHTML = defaultLevelName;
secondsTimer.innerHTML = defaultLevelSeconds;
timeLeft.innerHTML = defaultLevelSeconds;
totalScore.innerHTML = words.length;

let setting = document.querySelector(".setting");

setting.addEventListener("click", () => {
  // Add Class Spin To Settings Box
  setting.firstElementChild.classList.add("fa-bounce");

  // Create Overlay Layer
  let popup = document.createElement("div");
  popup.classList.add("overlay");

  // Append Overlay To Body
  document.body.appendChild(popup);

  // Create popupBox
  let popupBox = document.createElement("div");
  popupBox.classList.add("popup-box");
  popup.appendChild(popupBox);

  // Create Heading Of Popup Box
  let heading = document.createElement("h2");
  heading.innerHTML = "Settings Box";
  popupBox.appendChild(heading);

  // Create Levels Container
  let levelsContainer = document.createElement("div");
  levelsContainer.classList.add("levels");

  // levels Heading
  let levelHeading = document.createElement("h3");
  levelHeading.innerHTML = "Select Your Level";
  let icon = document.createElement("i");
  icon.className = "fa-solid fa-angles-up";
  levelHeading.appendChild(icon);
  levelsContainer.appendChild(levelHeading);

  // Loop through levels
  for (const level in levels) {
    let span = document.createElement("span");
    span.classList.add("level");
    span.innerHTML = `${level}`;
    levelsContainer.appendChild(span);
  }

  // Exit Button
  let exitButton = document.createElement("div");
  exitButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  exitButton.classList.add("exit");
  popupBox.appendChild(exitButton);
  popupBox.appendChild(levelsContainer);

  // On CLick Exit Button
  exitButton.onclick = () => {
    popup.remove();
    setting.firstElementChild.classList.remove("fa-bounce");
  };

  // Add Customization Function
  customizeLevels(document.querySelectorAll("span.level"));
});

function customizeLevels(spans) {
  spans.forEach((span) => {
    if (span.innerHTML === defaultLevelName) {
      span.classList.add("active");
    }

    span.addEventListener("click", (e) => {

      // Update defaultLevelName with clicked span's innerHTML
      defaultLevelName = e.target.innerHTML;

       // Update defaultLevelSeconds based on the selected level
      defaultLevelSeconds = levels[defaultLevelName];

      // Loop On Span Active class
      spans.forEach((otherSpan) => {
        if (otherSpan !== e.target) {
          otherSpan.classList.remove("active");
        }
      });

      e.target.classList.add("active");

      // Setting Level Name + Seconds + Score
      lvlName.innerHTML = defaultLevelName;
      secondsTimer.innerHTML = defaultLevelSeconds;
      timeLeft.innerHTML = defaultLevelSeconds;
      totalScore.innerHTML = words.length;

      // Save level in local storage
      localStorage.setItem("typingTestLevel", defaultLevelName);
    });
  });
}

// Disable Paste Event
input.onpaste = () => false;

startBtn.onclick = function () {
  this.remove();
  input.focus();
  // Generate Words;
  genWords();
};

function genWords() {
  // Get Random Word
  let randomWord = words[Math.round(Math.random() * words.length)];

  // Get Word Index
  let wordIndex = words.indexOf(randomWord);

  // Remove Word from Array
  words.splice(wordIndex, 1);

  // Empty Upcoming Words
  upcomingWords.innerHTML = "";

  // Show Random Word
  word.innerHTML = randomWord;

  // Generate Upcoming Words;
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    // Add Text to Element
    div.innerHTML = words[i];
    // Append Word to Words
    upcomingWords.appendChild(div);
  }
  // call start function
  startPlay();
}

function startPlay() {
  if (defaultLevelName === '') {
    defaultLevelName = 'Normal';
  }
  if (defaultLevelSeconds === undefined) {
    defaultLevelSeconds = levels[defaultLevelName];
  }
  // Reset Timer
  timeLeft.innerHTML = defaultLevelSeconds;

  let start = setInterval(() => {
    timeLeft.innerHTML--;
    if (timeLeft.innerHTML === "0") {
      clearInterval(start);
      if (word.innerHTML.toLowerCase() == input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";

        // Increase Score
        gottenScore.innerHTML++;

        // If There Is Still Words
        if (words.length > 0) {
          // Generate Words;
          genWords();
        } else {
          let span = document.createElement("span");
          span.classList.add("good");
          span.appendChild(
            document.createTextNode(
              `Congratulations! You Got ${gottenScore.innerHTML} From ${gottenScore.innerHTML}`
            )
          );
          finishMessage.appendChild(span);
        }
      } else {
        // Create Span
        let span = document.createElement("span");

        // Add Class Bad To Looser
        span.classList.add("bad");

        // Append Span
        span.appendChild(document.createTextNode("Game Over"));
        finishMessage.appendChild(span);

        // Remove Massage And Words From DOM
        document.querySelector(".message").remove();
        upcomingWords.remove();

        // Empty Input Field
        input.value = "";
      }
    }
  }, 1000);
}
