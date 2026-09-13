const membersContainer = document.querySelector("#members-container");

async function getMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();

    displayMembers(data);
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <h2>${member.name}</h2>
            <img src="images/${member.image}" alt="${member.name} logo">
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p>
                <a href="${member.website}" target="_blank">
                    Visit Website
                </a>
            </p>
        `;

        membersContainer.appendChild(card);
    });
}

getMembers();
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

gridButton.addEventListener("click", () => {
    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");
});

const menuButton = document.querySelector("#menu-button");
const mainNav = document.querySelector("#main-nav");

menuButton.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});

const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;