
/* =========================
   RESPONSIVE NAVIGATION
========================= */

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", String(isOpen));

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");

            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );
        });
    });
}

/* =========================
   CURRENT YEAR
========================= */

const currentYear = document.querySelector("#current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

// Restore saved piano preferences in the buying guide.
const experienceField = document.querySelector("#experience");
const typeField = document.querySelector("#piano-type");
const budgetField = document.querySelector("#budget");

if (experienceField && typeField && budgetField) {
    experienceField.value = localStorage.getItem("pianoExperience") || "";
    typeField.value = localStorage.getItem("pianoType") || "";
    budgetField.value = localStorage.getItem("pianoBudget") || "";
}