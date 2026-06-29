/*==========================================================
    TIMELINE.JS
    Enterprise Portfolio

    Purpose
    --------------------------------------------
    • Career Timeline
    • Expand / Collapse
    • Active Timeline Navigation
==========================================================*/

"use strict";

const Timeline = (() => {

    let items;
    let navigation;

    /*======================================================
    INIT
    ======================================================*/

    function init() {

        items = document.querySelectorAll(".timeline-item");

        navigation = document.querySelectorAll("[data-timeline]");

        if (!items.length) return;

        initializeExpand();

        initializeNavigation();

    }

    /*======================================================
    EXPAND / COLLAPSE
    ======================================================*/

    function initializeExpand() {

        document

            .querySelectorAll("[data-expand]")

            .forEach(button => {

                button.addEventListener("click", () => {

                    const targetId = button.dataset.expand;

                    const target = document.getElementById(targetId);

                    if (!target) return;

                    const expanded = target.classList.toggle("expanded");

                    button.setAttribute(
                        "aria-expanded",
                        expanded
                    );

                });

            });

    }

    /*======================================================
    TIMELINE NAVIGATION
    ======================================================*/

    function initializeNavigation() {

        if (!navigation.length) return;

        navigation.forEach(link => {

            link.addEventListener("click", event => {

                event.preventDefault();

                const target = document.getElementById(

                    link.dataset.timeline

                );

                if (!target) return;

                navigation.forEach(item => {

                    item.classList.remove("active");

                });

                link.classList.add("active");

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            });

        });

    }

    /*======================================================
    OPEN TIMELINE ITEM
    ======================================================*/

    function open(id) {

        const section = document.getElementById(id);

        if (!section) return;

        section.classList.add("expanded");

        section.scrollIntoView({

            behavior: "smooth",

            block: "center"

        });

    }

    /*======================================================
    CLOSE TIMELINE ITEM
    ======================================================*/

    function close(id) {

        const section = document.getElementById(id);

        if (!section) return;

        section.classList.remove("expanded");

    }

    /*======================================================
    TOGGLE
    ======================================================*/

    function toggle(id) {

        const section = document.getElementById(id);

        if (!section) return;

        section.classList.toggle("expanded");

    }

    /*======================================================
    PUBLIC API
    ======================================================*/

    return {

        init,

        open,

        close,

        toggle

    };

})();