/*==========================================================
    APP.JS
    Enterprise Portfolio Bootstrap
    --------------------------------------------------------
    Purpose
    • Initialize Application Modules
    • Safe Module Loading
    • Global Configuration
==========================================================*/

"use strict";

const App = (() => {

    /*======================================================
    CONFIGURATION
    ======================================================*/

    const CONFIG = {

        enableParticles: false,
        enableDebug: false

    };

    /*======================================================
    MODULE INITIALIZER
    ======================================================*/

    function initialize(module) {

        if (
            module &&
            typeof module.init === "function"
        ) {

            try {

                module.init();

                if (CONFIG.enableDebug) {

                    console.info(`${module.constructor?.name || "Module"} initialized`);

                }

            } catch (error) {

                console.error("Module initialization failed:", error);

            }

        }

    }

    /*======================================================
    CORE MODULES
    ======================================================*/

    function initializeCore() {

        initialize(Navigation);
        initialize(Animations);
        initialize(Counters);
        initialize(Charts);
        initialize(Theme);
        initialize(Contact);

    }

    /*======================================================
    PAGE MODULES
    ======================================================*/

    function initializePages() {

        if (typeof Timeline !== "undefined") {

            initialize(Timeline);

        }

        if (typeof Architecture !== "undefined") {

            initialize(Architecture);

        }

    }

    /*======================================================
    OPTIONAL MODULES
    ======================================================*/

    function initializeOptional() {

        if (

            CONFIG.enableParticles &&
            typeof Particles !== "undefined"

        ) {

            initialize(Particles);

        }

    }

    /*======================================================
    APPLICATION STARTUP
    ======================================================*/

    function init() {

        console.info(
            "%cVipin Paulson Portfolio",
            "color:#3b82f6;font-weight:bold;"
        );

        console.info("Initializing Application...");

        initializeCore();

        initializePages();

        initializeOptional();

        console.info("Portfolio Ready");

    }

    /*======================================================
    PUBLIC API
    ======================================================*/

    return {

        init

    };

})();

/*==========================================================
APPLICATION ENTRY POINT
==========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    App.init

);