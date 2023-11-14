// @todo: Темплейт карточки
const cardtemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const allcards = document.querySelector('.places__list');
// @todo: Функция создания карточки

const createCard = (cards, deleteCallback) => {
    const cardN = cardtemplate.querySelector('.card').cloneNode(true);
    const cardsImg = cardN.querySelector('.card__image');
    const cardsTtl = cardN.querySelector('.card__title');
    cardsImg.src = cards.link;
    cardsImg.alt = cards.name; 
    cardsTtl.textContent = cards.name;
    cardN.querySelector('.card__delete-button').addEventListener('click', deleteCallback);
    return cardN;
};
// @todo: Функция удаления карточки
const deleteCallback = (event) => {
    event.target.closest('.card').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((cardItm) => {
    allcards.append(createCard(cardItm, deleteCallback));
});
