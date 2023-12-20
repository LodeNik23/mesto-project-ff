// Открыть попап
function openPopup(popup){
    popup.classList.add('popup');
    document.addEventListener('keydown', closeEsc);
    popup.classList.add('popup_is-opened');
  }
  
  // Закрыть попап
  function closePopup(popup){
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
  }

  //Закрыть попап esc
  function closeEsc(evt){
      if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_is-opened'));
    }
  }

  function closePopupByClick(evt){
      if (evt.target.matches('.popup_is-opened, .popup__close')){
      closePopup(popup);
    }
  }
    
  export {openPopup, closePopup, closePopupByClick};