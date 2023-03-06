/** @format */

"use strict";

const menu = document.querySelector(".navigation__menu");
const button = document.querySelector(".navigation__button");
const icon = document.querySelectorAll("svg");
const itemMenu = document.querySelectorAll(".navigation__item");
const linkMenu = document.querySelectorAll(".navigation__link");

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

menu.addEventListener("click", (e) => {
  const target = e.target;

  const active = document.querySelector(".navigation__item--active");
  if (active !== null) {
    active.classList.remove("navigation__item--active");
  }

  if (target.closest(".navigation__menu")) {
    target.classList.add("navigation__item--active");
  }
});
