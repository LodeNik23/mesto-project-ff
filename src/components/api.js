  const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-3',
    headers: {
      authorization: '35db1f58-1e56-4908-8968-ce83ddc170e8',
      'Content-Type': 'application/json',
    }
  }

  // Общая проверка
  function testData(res) {
    if (res.ok) 
    return res.json();  
    return Promise.reject(`Ошибка: ${res.status}`);
  };

  
//Загрузка информации о пользователе GET
  const getUserData = () => {    
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,      
    })
    .then((res) => testData(res));      
  };
  
 
  //Загрузить карточки
  const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
    .then((res) => testData(res));
  } 

  //Отредактировать профиль
  const сhangeUserData = (profileTitle, profileDescription) => {
    return fetch(`${config.baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: profileTitle,
          about: profileDescription,
      })
      })
      .then((res) => testData(res));
  }


//Добавление карточки 
  function addCard(name, link) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    })
    .then((res) => testData(res));
}

//Удаление карточки

  function deleteMyCard(cardId) {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then((res) => testData(res));  
  }
  

  // Добавить лайк
  function addLikeCardSnd(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers,
    })
    .then((res) => testData(res));
  }

  // Убрать лайк
  function deleteLikeCardSnd(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then((res) => testData(res));
  }

  // Изменить аватар
  function avatarSnd(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({avatar}),})
    .then((res) => testData(res));
  }

  export { getUserData, getInitialCards, сhangeUserData, addCard, deleteMyCard, addLikeCardSnd, deleteLikeCardSnd, avatarSnd};