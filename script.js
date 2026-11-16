const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");

let isOpen = false;

menuBtn.addEventListener("click", () => {
  isOpen = !isOpen;

  mobileMenu.classList.toggle("hidden");

  menuIcon.innerHTML = isOpen
    ? ` <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"/> `
    : ` <path stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"/> `;
});
