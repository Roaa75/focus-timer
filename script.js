
let selectedTime = 25*60;
let timeLeft = selectedTime;
let timerInterval = null;
let currentMode = "focus";
let sessionscompleted = 0;
let dailyGoal = 4;
let breakTime = 5*60; 
let selectedBreakTime = 5*60;
let breakTimeLeft = breakTime;


let beginAgainButton = document.getElementById("beginAgain");
let timer = document.getElementById("timer");
let modeDisplay = document.getElementById("mode");
let sessionsDisplay = document.getElementById("sessions");
let goalDisplay = document.getElementById("goal");
let goalInput = document.getElementById("goalInput");
let setGoalButton = document.getElementById("setGoal")

function playSound() {
    let audio = new AudioContext();
let Oscillator = audio.createOscillator();
let gain = audio.createGain();

    Oscillator.connect(gain);
    gain.connect(audio.destination);

    Oscillator.frequency.value = 500;

    gain.gain.setValueAtTime(0.3, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.15);

    Oscillator.start();
    Oscillator.stop(audio.currentTime + 0.15);

}

beginAgainButton.addEventListener("click", function(){
   let confirmReset = confirm("start again and reset your sessions?");

    if(confirmReset){
    sessionscompleted = 0;
        localStorage.setItem("sessionsCompleted", sessionscompleted);
    sessionsDisplay.textContent = `sessions: ${sessionscompleted} / ${dailyGoal}`;
    }
});

setGoalButton.addEventListener("click", function(){
    dailyGoal = Number(goalInput.value);
    localStorage.setItem("dailyGoal", dailyGoal);
    goalDisplay.textContent = `Daily goal: ${dailyGoal}sessions`;
});

let startButton = document.getElementById("start");
let pausebutton = document.getElementById("pause");
let resetbutton = document.getElementById("reset");

let fifteenbutton = document.getElementById("15");
let twentyFivebutton = document.getElementById("25");
let fortyFiveButton = document.getElementById("45");
let sixtyButton = document.getElementById("60");

let breakFiveButton = document.getElementById("break5");
let breakTenButton = document.getElementById("break10");
let breakFifteenButton = document.getElementById("break15");

breakFiveButton.addEventListener("click", function(){
    selectedBreakTime = 5*60;
    localStorage.setItem("selectedBreakTime", selectedBreakTime);
    breakTime = selectedBreakTime;
    breakTimeLeft = selectedBreakTime;

    breakFiveButton.classList.add("selected");
    breakTenButton.classList.remove("selected");
    breakFifteenButton.classList.remove("selected");
});

breakTenButton.addEventListener("click", function(){
    selectedBreakTime = 10*60;
     localStorage.setItem("selectedBreakTime", selectedBreakTime);
    breakTime = selectedBreakTime;
    breakTimeLeft = selectedBreakTime;

    breakFiveButton.classList.remove("selected");
    breakTenButton.classList.add("selected");
    breakFifteenButton.classList.remove("selected");
});

breakFifteenButton.addEventListener("click", function(){
    selectedBreakTime = 15*60;
     localStorage.setItem("selectedBreakTime", selectedBreakTime);
    breakTime = selectedBreakTime;
    breakTimeLeft = selectedBreakTime;

    breakFiveButton.classList.remove("selected");
    breakTenButton.classList.remove("selected");
    breakFifteenButton.classList.add("selected");
});


function updateTimer(){ 

    document.body.className = currentMode;

    modeDisplay.textContent = currentMode === "focus"? "Focus Time" : "Break Time";
    
    let currentTime = currentMode === "focus" ? timeLeft : breakTimeLeft;

    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;

    timer.textContent =  `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
updateTimer();

function countdown() {
    if (currentMode === "focus"){
        if (timeLeft >0){
            timeLeft--;
            updateTimer();    
        } else {
            playSound();

            sessionscompleted++;
            localStorage.setItem("sessionsCompleted", sessionscompleted);
           sessionsDisplay.textContent = `sessions: ${sessionscompleted} / ${dailyGoal}`;

           if(sessionscompleted === dailyGoal){
            alert("Daily goal completed! Great job!");
           }

            currentMode = "break";
            breakTimeLeft = selectedBreakTime;
            modeDisplay.textContent = "break time";
            updateTimer();
            alert("Great job! Time for a break");
        }
    } else {
        if (breakTimeLeft>0){
            breakTimeLeft--;
            updateTimer();
        } else {
            playSound();

            currentMode = "focus";
            timeLeft = selectedTime;
            modeDisplay.textContent = "Focus time";
            updateTimer();
              alert("Time to back, let's focus");

        }
    } 

}
startButton.addEventListener("click", function(){
    if (timerInterval === null){
    timerInterval = setInterval(countdown, 1000);
    }
});

pausebutton.addEventListener("click", function(){
clearInterval(timerInterval);
timerInterval = null;
});

resetbutton.addEventListener("click", function(){
clearInterval(timerInterval);
timerInterval = null;
currentMode = "focus";
modeDisplay.textContent = "Focus time";
breakTimeLeft = breakTime ; 
timeLeft = selectedTime;
updateTimer();
});

fifteenbutton.addEventListener("click",function(){
    clearInterval(timerInterval);
    timerInterval = null;
    currentMode = "focus";
    selectedTime = 15*60;
    localStorage.setItem("selectedTime", selectedTime);

    timeLeft = selectedTime; 
    updateTimer();

    fifteenbutton.classList.add("selected");
    twentyFivebutton.classList.remove("selected");
    fortyFiveButton.classList.remove("selected");
    sixtyButton.classList.remove("selected");
});

twentyFivebutton.addEventListener("click",function(){
    clearInterval(timerInterval);
    timerInterval = null;
    currentMode = "focus";
    selectedTime = 25*60;
    localStorage.setItem("selectedTime", selectedTime);
    timeLeft = selectedTime; 
    updateTimer();

    fifteenbutton.classList.remove("selected");
    twentyFivebutton.classList.add("selected");
    fortyFiveButton.classList.remove("selected");
    sixtyButton.classList.remove("selected");
});

fortyFiveButton.addEventListener("click", function(){

    clearInterval(timerInterval);
    timerInterval = null;
    currentMode = "focus";
    selectedTime = 45*60;
    localStorage.setItem("selectedTime", selectedTime);
    timeLeft = selectedTime;
    updateTimer();

    fifteenbutton.classList.remove("selected");
    twentyFivebutton.classList.remove("selected");
    fortyFiveButton.classList.add("selected");
    sixtyButton.classList.remove("selected");
});

sixtyButton.addEventListener("click", function(){
    clearInterval(timerInterval);
    timerInterval = null;
    currentMode = "focus";
    selectedTime = 60*60;
    localStorage.setItem("selectedTime", selectedTime);
    timeLeft = selectedTime;
    updateTimer();

    fifteenbutton.classList.remove("selected");
    twentyFivebutton.classList.remove("selected");
    fortyFiveButton.classList.remove("selected");
    sixtyButton.classList.add("selected");
});

let savedGoal = localStorage.getItem("dailyGoal");
if(savedGoal !== null){
    dailyGoal = Number(savedGoal);
}
goalDisplay.textContent = `Daily goal: ${dailyGoal}sessions`;

let savedSessions = localStorage.getItem("sessionsCompleted");

if(savedSessions !== null){
    sessionscompleted = Number(savedSessions);
}
sessionsDisplay.textContent = `sessions: ${sessionscompleted} / ${dailyGoal}`;

let savedTime = localStorage.getItem("selectedTime");

if(savedTime !== null){
    selectedTime = Number(savedTime);
    timeLeft = selectedTime;
}
updateTimer();

if(selectedTime === 15*60) {
    fifteenbutton.classList.add("selected");
} else if (selectedTime === 25*60) {
    twentyFivebutton.classList.add("selected");
} else if (selectedTime === 45*60) {
    fortyFiveButton.classList.add("selected");
} else if (selectedTime === 60*60) {
    sixtyButton.classList.add("selected");
}

let savedBreakTime = localStorage.getItem("selectedBreakTime");

if(savedBreakTime !== null){
    selectedBreakTime = Number(savedBreakTime);
    breakTime = selectedBreakTime;
    breakTimeLeft = selectedBreakTime;
}

if(selectedBreakTime === 5*60) {
    breakFiveButton.classList.add("selected");
} else if (selectedBreakTime === 10*60) {
    breakTenButton.classList.add("selected");
} else if (selectedBreakTime === 15*60) {
    breakFifteenButton.classList.add("selected");
} 