const params = new URLSearchParams(window.location.search);


document.querySelector("#first-name").textContent =
    params.get("first-name") || "Not provided";

document.querySelector("#last-name").textContent =
    params.get("last-name") || "Not provided";

document.querySelector("#email").textContent =
    params.get("email") || "Not provided";

document.querySelector("#phone").textContent =
    params.get("phone") || "Not provided";

document.querySelector("#organization").textContent =
    params.get("organization") || "Not provided";

document.querySelector("#timestamp").textContent =
    params.get("timestamp") || "Not provided";