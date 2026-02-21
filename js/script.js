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
