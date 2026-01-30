let animate, stagger;

try {
  const motion = await import("https://cdn.jsdelivr.net/npm/motion@11/+esm");
  animate = motion.animate;
  stagger = motion.stagger;
} catch {
  // CDN failed — page is still visible thanks to CSS defaults
  console.warn("Motion library failed to load. Animations disabled.");
}

if (animate) {
  document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".listing-card");
    if (cards.length) {
      // Page-load animation
      animate(
        cards,
        {
          opacity: [0, 1],
          y: [80, 0],
          scale: [0.95, 1],
        },
        {
          duration: 0.8,
          delay: stagger(0.15),
          easing: "ease-out",
        },
      );

      // Hover animations
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          animate(
            card,
            { scale: 1.03, y: -8 },
            { duration: 0.2, easing: "ease-out" },
          );
        });

        card.addEventListener("mouseleave", () => {
          animate(
            card,
            { scale: 1, y: 0 },
            { duration: 0.25, easing: "ease-out" },
          );
        });
      });

      // Scroll-based reveal
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animate(
              entry.target,
              { opacity: [0, 1], y: [80, 0], scale: [0.95, 1] },
              { duration: 0.6, easing: "ease-out" },
            );
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.2 },
      );

      cards.forEach((card) => observer.observe(card));

      // Image hover parallax
      cards.forEach((card) => {
        const img = card.querySelector(".motion-img");
        if (!img) return;
        card.addEventListener("mouseenter", () => {
          animate(
            img,
            { y: -12, scale: 1.05 },
            { duration: 0.35, easing: "ease-out" },
          );
        });
        card.addEventListener("mouseleave", () => {
          animate(
            img,
            { y: 0, scale: 1 },
            { duration: 0.35, easing: "ease-out" },
          );
        });
      });
    }

    // Button tap animation
    document.querySelectorAll(".motion-btn").forEach((btn) => {
      btn.addEventListener("mousedown", () => {
        animate(btn, { scale: 0.95 }, { duration: 0.1 });
      });
      btn.addEventListener("mouseup", () => {
        animate(btn, { scale: 1 }, { duration: 0.15 });
      });
      btn.addEventListener("mouseleave", () => {
        animate(btn, { scale: 1 }, { duration: 0.15 });
      });
    });

    // Search bar focus animation
    const searchInput = document.querySelector(".motion-search");
    if (searchInput) {
      searchInput.addEventListener("focus", () => {
        animate(
          searchInput,
          { scale: 1.03, y: -2 },
          { duration: 0.25, easing: "ease-out" },
        );
      });
      searchInput.addEventListener("blur", () => {
        animate(
          searchInput,
          { scale: 1, y: 0 },
          { duration: 0.25, easing: "ease-out" },
        );
      });
    }

    // Login / Auth page animation
    const loginWrapper = document.querySelector(".motion-login");
    if (loginWrapper) {
      animate(
        loginWrapper,
        { opacity: [0, 1], y: [60, 0] },
        { duration: 0.6, easing: "ease-out" },
      );
    }

    // Input focus animation
    document.querySelectorAll(".motion-input").forEach((input) => {
      input.addEventListener("focus", () => {
        animate(input, { scale: 1.02 }, { duration: 0.2 });
      });
      input.addEventListener("blur", () => {
        animate(input, { scale: 1 }, { duration: 0.2 });
      });
    });

    // Skeleton loading fade out
    const skeleton = document.getElementById("skeleton-container");
    if (skeleton) {
      animate(
        skeleton,
        { opacity: [1, 0] },
        { duration: 0.4, easing: "ease-out" },
      );
      setTimeout(() => skeleton.remove(), 400);
    }

    // Navbar hide / reveal on scroll
    let lastScrollY = window.scrollY;
    const navbar = document.getElementById("main-navbar");
    if (navbar) {
      window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScrollY && currentScroll > 80) {
          animate(navbar, { y: "-100%" }, { duration: 0.25 });
        } else {
          animate(navbar, { y: "0%" }, { duration: 0.25 });
        }
        lastScrollY = currentScroll;
      });
    }
  });
}
