document.addEventListener("DOMContentLoaded", () => {
    // Add animation to sections when the page loads
    document.querySelectorAll('.section').forEach(section => {
        section.classList.add("section-visible");
    });

    // Smooth scroll for navbar links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            const targetPosition = targetSection.offsetTop;

            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Adjust for slower/faster scroll
            let startTime = null;

            function scrollAnimation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const scrollPosition = startPosition + distance * progress;

                // Center the content
                window.scrollTo(0, scrollPosition - (window.innerHeight / 2) + (targetSection.offsetHeight / 2));

                if (timeElapsed < duration) {
                    requestAnimationFrame(scrollAnimation);
                }
            }

            requestAnimationFrame(scrollAnimation);
        });
    });

    // Function to toggle navbar visibility
    function toggleNavbar() {
        const navbar = document.getElementById('navbar');
        navbar.classList.toggle('show'); // Toggles visibility
    }

    // Attach toggleNavbar to the hamburger menu
    const hamburger = document.getElementById('hamburger');
    hamburger.addEventListener("click", toggleNavbar);

    // Ensure navbar resets on larger screens
    window.addEventListener('resize', () => {
        const navbar = document.getElementById('navbar');
        if (window.innerWidth >= 768 && navbar) {
            navbar.classList.remove('show');
        }
    });
});
