
import "./main.mjs";

const instrumentList = document.querySelector("#instrument-list");
const typeFilter = document.querySelector("#type-filter");
const resultsCount = document.querySelector("#results-count");
const catalogError = document.querySelector("#catalog-error");
const instrumentDialog = document.querySelector("#instrument-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogDetails = document.querySelector("#dialog-details");
const closeDialogButton = document.querySelector("#close-dialog");

let instruments = [];

async function loadInstruments() {
    try {
        const response = await fetch("data/instruments.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        instruments = await response.json();

        displayInstruments(instruments);
    } catch (error) {
        console.error("Error loading instruments:", error);

        instrumentList.replaceChildren();
        catalogError.hidden = false;
        resultsCount.textContent = "";
    }
}

function displayInstruments(items) {
    instrumentList.innerHTML = items.map((instrument) => `
        <article class="instrument-card">
            <div class="instrument-card-content">
                <p class="instrument-type">${instrument.type}</p>

                <h3>${instrument.name}</h3>

                <p><strong>Brand:</strong> ${instrument.brand}</p>

                <p><strong>Keys:</strong> ${instrument.keys}</p>

                <p><strong>Price category:</strong> ${instrument.price}</p>

                <p>${instrument.description}</p>
                <button
                  class="button details-button"
                  type="button"
                  data-instrument-id="${instrument.id}">
                  View Details
                </button>
            </div>
        </article>
    `).join("");

    resultsCount.textContent =
        `Showing ${items.length} instrument${items.length === 1 ? "" : "s"}.`;
}

typeFilter.addEventListener("change", () => {
    const selectedType = typeFilter.value;

    const filteredInstruments = instruments.filter((instrument) => {
        if (selectedType === "all") {
            return true;
        }

        if (selectedType === "acoustic") {
            return instrument.type.startsWith("Acoustic");
        }

        return instrument.type.startsWith("Digital")
            || instrument.type === "Stage Piano";
    });

    displayInstruments(filteredInstruments);
});

loadInstruments();

instrumentList.addEventListener("click", (event) => {
    const button = event.target.closest(".details-button");

    if (!button) return;

    const instrument = instruments.find(
        (item) => String(item.id) === button.dataset.instrumentId
    );

    if (!instrument) return;

    dialogTitle.textContent = instrument.name;

    dialogDetails.innerHTML = `
        <p><strong>Type:</strong> ${instrument.type}</p>
        <p><strong>Brand:</strong> ${instrument.brand}</p>
        <p><strong>Keys:</strong> ${instrument.keys}</p>
        <p><strong>Price category:</strong> ${instrument.price}</p>
        <p>${instrument.description}</p>
    `;

    instrumentDialog.showModal();
});

closeDialogButton.addEventListener("click", () => {
    instrumentDialog.close();
});

instrumentDialog.addEventListener("click", (event) => {
    if (event.target === instrumentDialog) {
        instrumentDialog.close();
    }
});
