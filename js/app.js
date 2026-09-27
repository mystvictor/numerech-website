/* =====================================================
   NUMERECH
   Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

        /* =====================================================
           FOOTER YEAR
        ===================================================== */
        const yearElement = document.querySelector(".footer-year");
        if (yearElement) {
                yearElement.textContent = new Date().getFullYear();
        }

        /* =====================================================
           SCROLL REVEAL (Intersection Observer)
        ===================================================== */
        const revealElements = document.querySelectorAll(".reveal");

        if (revealElements.length > 0) {
                const revealObserver = new IntersectionObserver(
                        (entries, observer) => {
                                entries.forEach((entry) => {
                                        if (entry.isIntersecting) {
                                                entry.target.classList.add("active");
                                                observer.unobserve(entry.target);
                                        }
                                });
                        },
                        {
                                threshold: 0.15,
                                rootMargin: "0px 0px -50px 0px"
                        }
                );

                revealElements.forEach((element) => revealObserver.observe(element));
        }

        /* =====================================================
           MOBILE MENU & ACCESSIBILITY
        ===================================================== */
        const menuButton = document.querySelector(".menu-toggle");
        const navLinks = document.querySelector(".nav-links");

        if (menuButton && navLinks) {
                const toggleMenu = (isOpen) => {
                        const state = isOpen !== undefined ? isOpen : !navLinks.classList.contains("mobile-open");
                        navLinks.classList.toggle("mobile-open", state);
                        menuButton.setAttribute("aria-expanded", state);
                };

                menuButton.addEventListener("click", () => toggleMenu());

                // Close mobile menu when clicking a link
                navLinks.querySelectorAll("a").forEach((link) => {
                        link.addEventListener("click", () => toggleMenu(false));
                });

                // Close mobile menu when clicking outside
                document.addEventListener("click", (e) => {
                        if (!navLinks.contains(e.target) && !menuButton.contains(e.target) && navLinks.classList.contains("mobile-open")) {
                                toggleMenu(false);
                        }
                });
        }

        /* =====================================================
           HEADER SCROLL EFFECT & ACTIVE LINK TRACKING
        ===================================================== */
        const header = document.querySelector(".header");
        const sections = document.querySelectorAll("section[id]");
        const navItems = document.querySelectorAll(".nav-links a");
        let ticking = false;

        const handleScroll = () => {
                // Header style shift
                if (window.scrollY > 40) {
                        header?.classList.add("scrolled");
                } else {
                        header?.classList.remove("scrolled");
                }

                // Scrollspy active state
                let currentSection = "";
                const scrollPosition = window.scrollY + 120;

                sections.forEach((section) => {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.offsetHeight;

                        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                                currentSection = section.getAttribute("id");
                        }
                });

                navItems.forEach((link) => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${currentSection}`) {
                                link.classList.add("active");
                        }
                });

                ticking = false;
        };

        window.addEventListener("scroll", () => {
                if (!ticking) {
                        window.requestAnimationFrame(handleScroll);
                        ticking = true;
                }
        });

        /* =====================================================
           SMOOTH ANCHOR OFFSET SCROLL
        ===================================================== */
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
                anchor.addEventListener("click", function (e) {
                        const targetId = this.getAttribute("href");
                        if (targetId === "#") return;

                        const target = document.querySelector(targetId);

                        if (target) {
                                e.preventDefault();
                                const headerHeight = header ? header.offsetHeight + 20 : 80;
                                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                                window.scrollTo({
                                        top: targetPosition,
                                        behavior: "smooth"
                                });
                        }
                });
        });

});