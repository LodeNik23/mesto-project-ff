// Открыть попап
function openPopup(querySelectorClassName){
    const popup = querySelectorClassName;
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeEsc);
  
    popup.classList.add('popup_is-opened');
  }
  
  // Закрыть попап
  function closePopup(querySelectorClassName){
    const popup = querySelectorClassName;
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeEsc);
  }
  //Закрыть попап esc
  function closeEsc(evt){
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    }
  }
  export {openPopup, closePopup, closeEsc};