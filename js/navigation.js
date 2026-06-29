/*==========================================================
    NAVIGATION.JS
    Enterprise Portfolio
==========================================================*/

"use strict";

const Navigation = (() => {

    let header;
    let nav;
    let menuButton;
    let backToTop;
    let progressBar;

    /*======================================================
    INIT
    ======================================================*/

    function init() {

        header = document.querySelector("header");
        nav = document.querySelector(".main-nav");
        menuButton = document.querySelector(".menu-toggle");

        setupCurrentPage();

        setupStickyHeader();

        setupMobileMenu();

        setupSmoothScroll();

        setupBackToTop();

        setupScrollProgress();

    }

    /*======================================================
    CURRENT PAGE
    ======================================================*/

    function setupCurrentPage() {

        const page = window.location.pathname.split("/").pop() || "index.html";

        document.querySelectorAll(".main-nav a").forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href && href.endsWith(page)) {

                link.classList.add("active");

            }

        });

    }

    /*======================================================
    STICKY HEADER
    ======================================================*/

    function setupStickyHeader() {

        window.addEventListener("scroll", () => {

            if (!header) return;

            header.classList.toggle(

                "sticky",

                window.scrollY > 40

            );

        });

    }

    /*======================================================
    MOBILE MENU
    ======================================================*/

    function setupMobileMenu() {

        if (!menuButton || !nav) return;

        menuButton.addEventListener("click", () => {

            menuButton.classList.toggle("active");

            nav.classList.toggle("open");

            document.body.classList.toggle("menu-open");

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", closeMenu);

        });

        document.addEventListener("keydown", e => {

            if (e.key === "Escape") {

                closeMenu();

            }

        });

    }

    function closeMenu() {

        if (!menuButton || !nav) return;

        menuButton.classList.remove("active");

        nav.classList.remove("open");

        document.body.classList.remove("menu-open");

    }

    /*======================================================
    SMOOTH SCROLL
    ======================================================*/

    function setupSmoothScroll() {

        document.querySelectorAll('a[href^="#"]').forEach(anchor => {

            anchor.addEventListener("click", e => {

                e.preventDefault();

                const target = document.querySelector(

                    anchor.getAttribute("href")

                );

                if (!target) return;

                target.scrollIntoView({

                    behavior: "smooth",

                    block: "start"

                });

            });

        });

    }

    /*======================================================
    BACK TO TOP
    ======================================================*/

    function setupBackToTop() {

        backToTop = document.querySelector(".back-to-top");

        if (!backToTop) return;

        window.addEventListener("scroll", () => {

            backToTop.classList.toggle(

                "show",

                window.scrollY > 500

            );

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }

    /*======================================================
    SCROLL PROGRESS
    ======================================================*/

    function setupScrollProgress() {

        progressBar = document.querySelector(".scroll-progress");

        if (!progressBar) return;

        window.addEventListener("scroll", () => {

            const height =

                document.documentElement.scrollHeight -

                document.documentElement.clientHeight;

            const progress =

                (window.scrollY / height) * 100;

            progressBar.style.width = progress + "%";

        });

    }

    return {

        init

    };

})();