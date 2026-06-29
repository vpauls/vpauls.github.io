/*==========================================================
    CHARTS.JS
    Enterprise Portfolio

    Purpose
    --------------------------------------------
    • Progress Bar Animation
    • Skill Dashboard Animation
    • Lightweight Charts
==========================================================*/

"use strict";

const Charts = (() => {

    let observer;

    /*======================================================
    INIT
    ======================================================*/

    function init() {

        initializeProgressBars();

    }

    /*======================================================
    PROGRESS BAR INITIALIZATION
    ======================================================*/

    function initializeProgressBars() {

        const progressBars = document.querySelectorAll(".progress-value");

        if (!progressBars.length) return;

        observer = new IntersectionObserver(

            handleProgressIntersection,

            {
                threshold: 0.35
            }

        );

        progressBars.forEach(bar => {

            observer.observe(bar);

        });

    }

    /*======================================================
    OBSERVER CALLBACK
    ======================================================*/

    function handleProgressIntersection(entries) {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            animateProgress(entry.target);

            observer.unobserve(entry.target);

        });

    }

    /*======================================================
    ANIMATE PROGRESS BAR
    ======================================================*/

    function animateProgress(bar) {

        const percentage = Number(bar.dataset.progress || 0);

        bar.style.width = "0%";

        requestAnimationFrame(() => {

            bar.style.width = percentage + "%";

        });

    }

    /*======================================================
    PUBLIC API
    ======================================================*/

    return {

        init

    };

})();