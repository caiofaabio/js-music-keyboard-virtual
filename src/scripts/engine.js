const pianoKeys = document.querySelectorAll(".piano-keys .key");
const volumeSlider = document.querySelector(".volume-slider input");
const keysCheck = document.querySelector(".keys-check input");
const themeToggle = document.getElementById("theme-toggle");

let mapedKeys = [];
let audio = new Audio("src/tunes/a.wav");

const playTune = (key) => {
  audio.src = `src/tunes/${key}.wav`;
  audio.play();

  const clickedKey = document.querySelector(`[data-key="${key}"]`);
  clickedKey.classList.add("active");
  setTimeout(() => {
    clickedKey.classList.remove("active");
  }, 150);
};

pianoKeys.forEach((key) => {
  key.addEventListener("click", () => playTune(key.dataset.key));
  mapedKeys.push(key.dataset.key);
});

document.addEventListener("keydown", (e) => {
  if (mapedKeys.includes(e.key)) {
    playTune(e.key);
  }
});

const handleVolume = (e) => {
  audio.volume = e.target.value;
};

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
});

const showHideKeys = () => {
  pianoKeys.forEach((key) => key.classList.toggle("hide"));
};

volumeSlider.addEventListener("input", handleVolume);

keysCheck.addEventListener("click", showHideKeys);

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
}

themeToggle.addEventListener("change", () => {
  const isDark = themeToggle.checked;
  document.body.classList.toggle("dark", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
