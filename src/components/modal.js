// Открыть попап

function openPopup(querySelectorClassName) {
  querySelectorClassName.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

// Закрыть попап

function closePopup(querySelectorClassName) {
  querySelectorClassName.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeEsc);
}

//Закрыть попап esc

function closeEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_is-opened"));
  }
}

function closePopupByClick(evt, popup) {
  if (evt.target.matches(".popup_is-opened, .popup__close")) {
    closePopup(popup);
  }
}

export { openPopup, closePopup, closePopupByClick };
