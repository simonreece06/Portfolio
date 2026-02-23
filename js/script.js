//DARK THEME

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
if (localStorage.getItem("clickyColour")) {
    clickyButton.style.backgroundColor = localStorage.getItem("clickyColour");
}

//make reset button appear if count is not 0;
if (localStorage.getItem("count") != null) {
    resetButton.style.display="inline-block";
}

clickyButton.addEventListener("click", () => {
    let counter = localStorage.getItem("count");
    counter = Number(counter) + 1;
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

 })

