import { discoverItems } from "../data/discover.mjs";

const discoverGrid = document.querySelector("#discover-grid");


discoverItems.forEach((item) => {

    const card = document.createElement("article");
    card.classList.add("discover-card");

    card.innerHTML = `
        <h2>${item.name}</h2>

        <figure>
            <img
                src="${item.image}"
                alt="${item.name}"
                loading="lazy"
                width="300"
                height="200"
            >
        </figure>

        <address>${item.address}</address>

        <p>${item.description}</p>

        <button type="button">Learn More</button>
    `;

    discoverGrid.appendChild(card);
});

const visitMessage = document.querySelector("#visit-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const timeDifference = currentVisit - Number(lastVisit);
    const daysDifference = Math.floor(
        timeDifference / (1000 * 60 * 60 * 24)
    );

    if (daysDifference < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        const dayText = daysDifference === 1 ? "day" : "days";

        visitMessage.textContent =
            `You last visited ${daysDifference} ${dayText} ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);

