//DARK THEME
//localStorage.clear() 
const toggleButton = document.getElementById("darkToggle");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}

// Toggle dark mode
toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Save preference
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleButton.textContent = "Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        toggleButton.textContent = "Dark Mode";
    }
});

//CLICK PROJECTS TO CHANGE THE BACKGROUND COLOUR?


const projectButton = document.querySelectorAll(".project-card");


projectButton.forEach(card => {
    const button = card.id
    //checking local storage
    if (localStorage.getItem(button) === "selected") {
       card.classList.add("selected");
    }

    card.addEventListener("click", () => {
        //first we loop and reset all to zero so to speak
        projectButton.forEach(otherCard => {
            if (otherCard.id != button) {
                otherCard.classList.remove("selected");
                localStorage.removeItem(otherCard.id); //ignoring our card in question ()
            }         
        })
        card.classList.toggle("selected");
        if (localStorage.getItem(card.id) === "selected") {
            localStorage.removeItem(card.id); //this loop is ensuring localstorage is correctg
        } else {
            localStorage.setItem(card.id, "selected"); //setting local storage to the correct thing
        }        

    });

});


// a button that will change colour every time you click and also show how many times it has been clicked, saved in localStorage

const clickyButton = document.querySelector("#counter");
const resetButton = document.querySelector("#resetButton");

 //now for random colour. random colour function copy pasted from chatgpt

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
//make the colour load of the button
const savedColour = localStorage.getItem("clickyColour") || "red";
clickyButton.style.backgroundColor = savedColour;
clickyButton.style.display = "inline-block";

//show high-score

if (localStorage.getItem("high-score") != null) {
    document.querySelector(".high-score").textContent = "High Score: " + localStorage.getItem("high-score");
}



//make reset button appear if count is not 0;
if (Number(localStorage.getItem("count")) > 0 ) {
    resetButton.style.display="inline-block";
    clickyButton.textContent = "ClickMe! " + Number(localStorage.getItem("count"));
    
}

clickyButton.addEventListener("click", () => {
    let counter = localStorage.getItem("count");
    counter = Number(counter) + 1;
    //setting high score here
    if (localStorage.getItem("high-score") <= counter) {
        localStorage.setItem("high-score", counter);
        document.querySelector(".high-score").textContent = "High Score: " + localStorage.getItem("high-score");
        clickyButton.textContent = "ClickMe! " + Number(localStorage.getItem("count"));
    }
    
    clickyButton.textContent = "Click Me! " + counter;
    localStorage.setItem("count", counter);
    resetButton.style.display = "inline-block";
    const newColour = getRandomColor();
    clickyButton.style.backgroundColor = newColour;

    localStorage.setItem("clickyColour", newColour);
})

//reset button functionality
resetButton.addEventListener("click", () => {
    localStorage.setItem("count", 0);
    clickyButton.textContent = "Click Me!";
    resetButton.style.display = "none";
    clickyButton.style.backgroundColor = "red";
    localStorage.setItem("clickyColour", "red");

 })

//now the timer

const timerElement = document.querySelector(".timer");

let seconds = 0;
if (localStorage.getItem("seconds")) {
    seconds = Number(localStorage.getItem("seconds"));
    timerElement.style.display = 'inline-block';
}


//from chatGPT
function formatTime(seconds) {
    const days = Math.floor(seconds / 86400); // 86400 sec in a day
    const hours = Math.floor((seconds % 86400) / 3600); // remaining hours
    const minutes = Math.floor((seconds % 3600) / 60); // remaining minutes
    const secs = seconds % 60; // remaining seconds

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}






const timer = () => {
    seconds += 1;
    timerElement.textContent = "You have been on this page for " + formatTime(seconds) + " seconds.";
    localStorage.setItem("seconds", seconds);
}

setInterval(timer, 1000);

