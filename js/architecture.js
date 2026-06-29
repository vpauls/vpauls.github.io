/*==========================================================
    ARCHITECTURE.JS
    Enterprise Portfolio

    Purpose
    --------------------------------------------
    • Architecture Modal
    • Solution Filtering
    • Expand / Collapse
==========================================================*/

"use strict";

const Architecture = (() => {

    let modal;
    let modalContent;

    /*======================================================
    INIT
    ======================================================*/

    function init() {

        modal = document.querySelector(".modal");
        modalContent = document.querySelector(".modal-content");

        initializeModal();
        initializeFilters();
        initializeExpanders();

    }

    /*======================================================
    MODAL
    ======================================================*/

    function initializeModal() {

        if (!modal) return;

        document

            .querySelectorAll("[data-modal]")

            .forEach(button => {

                button.addEventListener("click", openModal);

            });

        document

            .querySelectorAll(".modal-close")

            .forEach(button => {

                button.addEventListener("click", closeModal);

            });

        modal.addEventListener("click", event => {

            if (event.target === modal) {

                closeModal();

            }

        });

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeModal();

            }

        });

    }

    function openModal(event) {

        if (!modal) return;

        const title =
            event.currentTarget.dataset.title || "";

        const description =
            event.currentTarget.dataset.description || "";

        const titleElement =
            modalContent.querySelector(".modal-title");

        const bodyElement =
            modalContent.querySelector(".modal-body");

        if (titleElement) {

            titleElement.textContent = title;

        }

        if (bodyElement) {

            bodyElement.textContent = description;

        }

        modal.classList.add("open");

        document.body.style.overflow = "hidden";

    }

    function closeModal() {

        if (!modal) return;

        modal.classList.remove("open");

        document.body.style.removeProperty("overflow");

    }

    /*======================================================
    FILTERS
    ======================================================*/

    function initializeFilters() {

        const filters =
            document.querySelectorAll("[data-filter]");

        const cards =
            document.querySelectorAll(".architecture-card");

        if (!filters.length || !cards.length) return;

        filters.forEach(button => {

            button.addEventListener("click", () => {

                filters.forEach(btn => {

                    btn.classList.remove("active");

                });

                button.classList.add("active");

                const category =
                    button.dataset.filter;

                cards.forEach(card => {

                    if (

                        category === "all" ||

                        card.dataset.category === category

                    ) {

                        card.hidden = false;

                    } else {

                        card.hidden = true;

                    }

                });

            });

        });

    }

    /*======================================================
    EXPAND / COLLAPSE
    ======================================================*/

    function initializeExpanders() {

        document

            .querySelectorAll("[data-expand]")

            .forEach(button => {

                button.addEventListener("click", () => {

                    const target =

                        document.getElementById(

                            button.dataset.expand

                        );

                    if (!target) return;

                    target.classList.toggle("expanded");

                    button.classList.toggle("active");

                });

            });

    }

    /*======================================================
    PUBLIC API
    ======================================================*/

    return {

        init

    };

})();