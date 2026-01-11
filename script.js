let workTime = 25 * 60;
let breakTime = 5 * 60;
let time = workTime;
let timer = null;
let isStudy = true;

/* ---------- STORAGE ---------- */
let sessions = Number(localStorage.getItem("sessions")) || 0;
document.getElementById("sessions").innerText = sessions;

/* ---------- VOICE ---------- */
function speak(msg) {
  if (!document.getElementById("voiceToggle").checked) return;
  const speech = new SpeechSynthesisUtterance(msg);
  speech.rate = 0.9;
  speech.pitch = 0.9;
  window.speechSynthesis.speak(speech);
}

/* ---------- MOOD ---------- */
function setMood(mood) {
  document.body.classList.remove("blue", "yellow", "red");

  if (mood === "tired") {
    document.body.classList.add("blue");
    workTime = 15 * 60;
    speak("You seem tired. Let's go slow.");
  }

  if (mood === "normal") {
    document.body.classList.add("yellow");
    workTime = 25 * 60;
    speak("Balanced mood. Stay focused.");
  }

  if (mood === "motivated") {
    document.body.classList.add("red");
    workTime = 40 * 60;
    speak("You're motivated. Let's do this.");
  }

  localStorage.setItem("mood", mood);
  document.getElementById("lastMood").innerText =
    "Last selected mood: " + mood;

  resetTimer();
}

/* ---------- TIMER ---------- */
function startTimer() {
  if (timer) return;

  speak("Study session started.");

  timer = setInterval(() => {
    time--;

    if (time < 0) {
      if (isStudy) {
        sessions++;
        localStorage.setItem("sessions", sessions);
        document.getElementById("sessions").innerText = sessions;
        speak("Good job. Take a break.");
      } else {
        speak("Break over. Back to study.");
      }

      isStudy = !isStudy;
      document.getElementById("mode").innerText =
        isStudy ? "Study Time" : "Break Time";
      time = isStudy ? workTime : breakTime;
    }

    updateTimer();
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isStudy = true;
  time = workTime;
  document.getElementById("mode").innerText = "Study Time";
  updateTimer();
}

function updateTimer() {
  let m = Math.floor(time / 60);
  let s = time % 60;
  document.getElementById("timer").innerText =
    `${m}:${s < 10 ? "0" : ""}${s}`;
}

/* ---------- THEME ---------- */
function toggleTheme() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

/* ---------- RESTORE ---------- */
const savedMood = localStorage.getItem("mood") || "tired";
setMood(savedMood);