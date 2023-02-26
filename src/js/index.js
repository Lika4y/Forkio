
/** @format */

"use strict";

const menu = document.querySelector(".navigation__menu");
const button = document.querySelector(".navigation__button");
const icon = document.querySelectorAll("svg");

button.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest(".navigation__button")) {
    menu.classList.toggle("navigation__menu--hidden");
    icon.forEach((element) => {
      element.classList.toggle("navigation__button--hidden");
    });
  }
});

window.addEventListener("click", (ev) => {
  const target = ev.target;

  if (
    target.closest(".navigation__menu") ||
    target.closest(".navigation__button")
  ) {
    return;
  }
  if (menu.classList.contains("navigation__menu--hidden")) {
    return;
  }
  if (!target.classList.contains("navigation__menu--hidden")) {
    menu.classList.add("navigation__menu--hidden");
    icon.forEach((element) => {
      element.classList.toggle("navigation__button--hidden");
    });
  }
});
