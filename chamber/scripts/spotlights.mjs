const spotlightsContainer =
    document.querySelector("#spotlights-container");


async function getMembers() {

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load data/members.json");
        }

        const members = await response.json();


        // Only Gold and Silver members
        const qualifiedMembers = members.filter(
            member =>
                member.membership === 2 ||
                member.membership === 3
        );


        // Randomize the members
        const shuffledMembers = [...qualifiedMembers]
            .sort(() => Math.random() - 0.5);


        // Select three members
        const selectedMembers =
            shuffledMembers.slice(0, 3);


        displaySpotlights(selectedMembers);

    } catch (error) {

        console.error(
            "Error loading member spotlights:",
            error
        );

    }

}


function displaySpotlights(members) {

    spotlightsContainer.innerHTML = "";


    members.forEach(member => {

        const card =
            document.createElement("article");


        const membershipLevel =
            member.membership === 3
                ? "Gold"
                : "Silver";


        card.classList.add("spotlight-card");


        card.innerHTML = `

            <img
                src="images/${member.image}"
                alt="${member.name} logo"
                loading="lazy"
            >

            <h3>${member.name}</h3>

            <p>
                <strong>Address:</strong>
                ${member.address}
            </p>

            <p>
                <strong>Phone:</strong>
                ${member.phone}
            </p>

            <p>
                <strong>Membership:</strong>
                ${membershipLevel}
            </p>

            <a
                href="${member.website}"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit Website
            </a>

        `;


        spotlightsContainer.appendChild(card);

    });

}


getMembers();