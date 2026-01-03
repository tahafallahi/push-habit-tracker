const scoreElement = document.querySelector("main .score .count");
const recordElement = document.querySelector("header .record .count");
const increaseBtn = document.querySelector("button.increase");
const resetBtn = document.querySelector("button.reset");
// A very roundabout way to get the current date
const currentDate = Number(
  new Date().toJSON().split("T")[0].split("-").join("")
);

function setUp() {
  let lastDate = Number(localStorage.getItem("lastDate"));
  let record = Number(localStorage.getItem("record"));
  let score = Number(localStorage.getItem("scored"));
  if (!record) record = 0;
  if (!score) score = 0;
  recordElement.textContent = record;
  scoreElement.textContent = score;
  console.log(currentDate - lastDate);
  if (lastDate && currentDate - lastDate < 1) {
    increaseBtn.classList.add("disable");
  }

  increaseBtn.addEventListener("click", () => {
    score++;
    scoreElement.textContent = score;
    if (score > record) {
      record++;
      recordElement.textContent = record;
    }
    lastDate = currentDate;
    if (lastDate && currentDate - lastDate < 1) {
      increaseBtn.classList.add("disable");
    }
    saveData(score, record, lastDate);
  });

  resetBtn.addEventListener("click", () => {
    score = 0;
    scoreElement.textContent = score;
    increaseBtn.classList.remove("disable");

    saveData(score, record, null);
  });

  document.querySelector("body").classList.remove("hidden");
}

function saveData(score, record, lastDate) {
  localStorage.setItem("lastDate", lastDate);
  localStorage.setItem("record", record);
  localStorage.setItem("scored", score);
}

setUp();
