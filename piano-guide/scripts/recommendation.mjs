import "./main.mjs";

const params = new URLSearchParams(window.location.search);

const experience = params.get("experience");
const preferredType = params.get("type");
const budget = params.get("budget");

const recommendationContent = document.querySelector("#recommendation-content");
const recommendationIntro = document.querySelector("#recommendation-intro");

const validExperiences = ["beginner", "intermediate", "advanced"];
const validTypes = ["acoustic", "digital", "any"];
const validBudgets = ["entry", "mid", "premium"];

if (
    !validExperiences.includes(experience) ||
    !validTypes.includes(preferredType) ||
    !validBudgets.includes(budget)
) {
    recommendationIntro.textContent =
        "Please complete the questionnaire to receive a recommendation.";

    recommendationContent.innerHTML = `
        <p>We could not find all your preferences.</p>
        <a href="guide.html#contact">Complete the questionnaire</a>
    `;
} else {
    localStorage.setItem("pianoExperience", experience);
    localStorage.setItem("pianoType", preferredType);
    localStorage.setItem("pianoBudget", budget);

    const experienceNames = {
        beginner: "beginner",
        intermediate: "intermediate player",
        advanced: "advanced player"
    };

    const typeNames = {
        acoustic: "acoustic",
        digital: "digital",
        any: "any type"
    };

    const budgetNames = {
        entry: "Entry-level",
        mid: "Mid-range",
        premium: "Premium"
    };

    recommendationIntro.textContent =
        `Your preferences are saved. Let's find a piano for a ${experienceNames[experience]}.`;

    async function findRecommendation() {
        try {
            const response = await fetch("data/instruments.json");

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            const instruments = await response.json();

            const matches = instruments.filter((instrument) => {
                const typeMatches =
                    preferredType === "any" ||
                    instrument.type.toLowerCase().startsWith(preferredType);

                const budgetMatches =
                    instrument.price.toLowerCase() === budgetNames[budget].toLowerCase();

                return typeMatches && budgetMatches;
            });

            if (matches.length === 0) {
                recommendationContent.innerHTML = `
                    <p>No instruments match all your preferences in our current sample catalog.</p>
                    <a href="instruments.html">Explore all pianos</a>
                `;
                return;
            }

            const selected = matches[0];

            recommendationContent.innerHTML = `
                <article class="guide-card">
                    <p class="instrument-type">${selected.type}</p>
                    <h3>${selected.name}</h3>
                    <p><strong>Brand:</strong> ${selected.brand}</p>
                    <p><strong>Keys:</strong> ${selected.keys}</p>
                    <p><strong>Price category:</strong> ${selected.price}</p>
                    <p>${selected.description}</p>
                    <p>This instrument matches your selected piano type and budget category.</p>
                </article>
            `;
        } catch (error) {
            console.error("Could not load the piano catalog:", error);

            recommendationContent.innerHTML = `
                <p>We could not load the instrument catalog. Please try again later.</p>
                <a href="instruments.html">Browse the piano catalog</a>
            `;
        }
    }

    findRecommendation();
}
