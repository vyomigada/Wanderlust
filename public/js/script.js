// Bootstrap validation
(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

// Motion animations
document.addEventListener("DOMContentLoaded", () => {
  // wait until motion is actually available
  if (typeof window.motion === "undefined") {
    console.warn("Motion not available on this page");
    return;
  }

  const { animate, stagger } = window.motion;

  // Only run if listing cards exist
  if (!document.querySelector(".listing-card")) return;

  animate(
    ".listing-card",
    {
      opacity: [0, 1],
      y: [100, 0],
      scale: [0.9, 1],
    },
    {
      duration: 1,
      delay: stagger(0.2),
      easing: "ease-out",
    },
  );
});
