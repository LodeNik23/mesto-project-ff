import "./pages/index.css";
import {
    initialCards,
    createCard,
    deleteCallback,
  } from "./components/cards";

// @todo: Темплейт карточки
const cardtemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const allcards = document.querySelector('.places__list');


// @todo: Вывести карточки на страницу
initialCards.forEach((cardItm) => {
    allcards.append(createCard(cardItm, deleteCallback));
});
