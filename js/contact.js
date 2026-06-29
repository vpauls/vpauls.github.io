/*==========================================================
    CONTACT.JS
==========================================================*/

"use strict";

const Contact = (() => {

    let form;

    function init() {

        form = document.querySelector("#contactForm");

        if (!form) return;

        form.addEventListener("submit", submit);

        attachValidation();

    }

    function attachValidation() {

        form.querySelectorAll("input, textarea").forEach(field => {

            field.addEventListener("blur", validateField);

        });

    }

    function validateField(event) {

        const field = event.target;

        field.classList.remove("error");

        if (field.hasAttribute("required") && !field.value.trim()) {

            field.classList.add("error");

        }

        if (field.type === "email") {

            const email =

                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email.test(field.value)) {

                field.classList.add("error");

            }

        }

    }

    function submit(event) {

        event.preventDefault();

        let valid = true;

        form.querySelectorAll("[required]").forEach(field => {

            if (!field.value.trim()) {

                valid = false;

                field.classList.add("error");

            }

        });

        if (!valid) return;

        alert(

            "Thank you! Your message has been received."

        );

        form.reset();

    }

    return {

        init

    };

})();