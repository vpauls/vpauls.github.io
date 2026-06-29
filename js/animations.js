/*==========================================================
    ANIMATIONS.JS
    Enterprise Portfolio Animation Engine

    Purpose
    --------------------------------------------
    • Scroll Reveal
    • Animation Helpers
    • Reduced Motion Support
==========================================================*/

"use strict";

const Animations = (() => {

    let observer;

    /*======================================================
    INIT
    ======================================================*/

    function init() {

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

            document
                .querySelectorAll(".reveal")
                .forEach(el => el.classList.add("visible"));

            return;

        }

        createObserver();

        observeElements();

    }

    /*======================================================
    CREATE OBSERVER
    ======================================================*/

    function createObserver() {

        observer = new IntersectionObserver(

            handleIntersection,

            {
                threshold: 0.15,
                rootMargin: "0px 0px -60px 0px"
            }

        );

    }

    /*======================================================
    OBSERVE ELEMENTS
    ======================================================*/

    function observeElements() {

        document
            .querySelectorAll(".reveal")
            .forEach(element => observer.observe(element));

    }

    /*======================================================
    INTERSECTION CALLBACK
    ======================================================*/

    function handleIntersection(entries) {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            reveal(entry.target);

            observer.unobserve(entry.target);

        });

    }

    /*======================================================
    REVEAL ELEMENT
    ======================================================*/

    function reveal(element) {

        element.classList.add("visible");

    }

    /*======================================================
    PUBLIC API
    ======================================================*/

    return {

        init

    };

})();