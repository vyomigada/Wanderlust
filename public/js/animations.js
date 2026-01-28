import { animate, stagger } from "https://cdn.skypack.dev/motion";

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".listing-card");
  if (!cards.length) return;

  // Page-load animation (already working)
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
      animate(card, { scale: 1, y: 0 }, { duration: 0.25, easing: "ease-out" });
    });
  });
});

// Button tap animation
const buttons = document.querySelectorAll(".motion-btn");

buttons.forEach((btn) => {
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
      {
        scale: 1.03,
        y: -2,
      },
      {
        duration: 0.25,
        easing: "ease-out",
      },
    );
  });

  searchInput.addEventListener("blur", () => {
    animate(
      searchInput,
      {
        scale: 1,
        y: 0,
      },
      {
        duration: 0.25,
        easing: "ease-out",
      },
    );
  });
}

// Login / Auth page animation
const loginWrapper = document.querySelector(".motion-login");

if (loginWrapper) {
  animate(
    loginWrapper,
    {
      opacity: [0, 1],
      y: [60, 0],
    },
    {
      duration: 0.6,
      easing: "ease-out",
    },
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

// Scroll-based reveal for listing cards
const revealCards = document.querySelectorAll(".listing-card");

if (revealCards.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        animate(
          entry.target,
          {
            opacity: [0, 1],
            y: [80, 0],
            scale: [0.95, 1],
          },
          {
            duration: 0.6,
            easing: "ease-out",
          },
        );

        obs.unobserve(entry.target); // animate once
      });
    },
    {
      threshold: 0.2,
    },
  );

  revealCards.forEach((card) => {
    observer.observe(card);
  });
}

// Image hover parallax
document.querySelectorAll(".listing-card").forEach((card) => {
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
    animate(img, { y: 0, scale: 1 }, { duration: 0.35, easing: "ease-out" });
  });
});

// Skeleton loading fade out
window.addEventListener("load", () => {
  const skeleton = document.getElementById("skeleton-container");
  if (!skeleton) return;

  animate(skeleton, { opacity: [1, 0] }, { duration: 0.4, easing: "ease-out" });

  setTimeout(() => {
    skeleton.remove();
  }, 400);
});

// Navbar hide / reveal on scroll
let lastScrollY = window.scrollY;
const navbar = document.getElementById("main-navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollY && currentScroll > 80) {
      // scrolling down → hide
      animate(navbar, { y: "-100%" }, { duration: 0.25 });
    } else {
      // scrolling up → show
      animate(navbar, { y: "0%" }, { duration: 0.25 });
    }

    lastScrollY = currentScroll;
  });
}

// Page fade in
const page = document.getElementById("page-wrapper");

if (page) {
  animate(
    page,
    { opacity: [0, 1], y: [20, 0] },
    { duration: 0.4, easing: "ease-out" },
  );
}

// Page fade out on link click
document.querySelectorAll("a[href]").forEach((link) => {
  const url = link.getAttribute("href");

  if (
    url.startsWith("/") &&
    !url.startsWith("#") &&
    !link.hasAttribute("target")
  ) {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      animate(
        page,
        { opacity: [1, 0], y: [0, -20] },
        { duration: 0.25, easing: "ease-in" },
      );

      setTimeout(() => {
        window.location.href = url;
      }, 250);
    });
  }
});
