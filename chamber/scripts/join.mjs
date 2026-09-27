const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();


const modalLinks = document.querySelectorAll(".modal-link");
const closeButtons = document.querySelectorAll(".close-modal");


modalLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const modalId = link.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        modal.showModal();

    });

});


closeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const modal = button.closest("dialog");

        modal.close();

    });

});