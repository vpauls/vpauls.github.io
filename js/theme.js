/*==========================================================
    THEME.JS
==========================================================*/

"use strict";

const Theme = (() => {

    const KEY = "portfolio-theme";

    function init() {

        load();

        bind();

    }

    function bind() {

        const button = document.querySelector("#themeToggle");

        if (!button) return;

        button.addEventListener(

            "click",

            toggle

        );

    }

    function toggle() {

        document.body.classList.toggle("light");

        save();

    }

    function save() {

        localStorage.setItem(

            KEY,

            document.body.classList.contains("light")

                ? "light"

                : "dark"

        );

    }

    function load() {

        const theme = localStorage.getItem(KEY);

        if (theme === "light") {

            document.body.classList.add("light");

        }

    }

    return {

        init

    };

})();