import { BASE_URL, token } from "./utils/constants.js";

// И Н Ф О Р М А Ц И Я  О  П О Л Ь З О В А Т Е Л Е
function handleRequest(url, options) {
  return fetch(url, options)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Что-то пошло не так...');
    })
}
// Загрузка информации о пользователе с сервера
export function getUserInfo() {
  return handleRequest(BASE_URL + '/users/me', {
    headers: {
      authorization: token
    }
  })
    .catch((error) => {
      console.log(error);
    });
}
// Редактирование профиля, обновление информации
export function updateUserInfo(name, about) {
  return handleRequest(BASE_URL + '/users/me', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
}
// Замена фотографии профиля 
export function editAvatar(avatarLink) {
  return handleRequest(BASE_URL + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
}

// И Н Ф О Р М А Ц И Я  О  К А Р Т О Ч К А Х
// Загрузка карточек с сервера
export function getAllCards() {
  return handleRequest(BASE_URL + '/cards', {
    headers: {
      authorization: token
    }
  })
}
// Создание новой карточки
export function createCardApi(name, link) {
  return handleRequest(BASE_URL + '/cards', {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
}
// Удаление карточки
export function deleteCardApi(_id) {
  return handleRequest(BASE_URL + '/cards/' + _id, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
}
// Постановка и снятие лайка
export function likeCardPut(_id) {
  return handleRequest(BASE_URL + '/cards/likes/' + _id, {
    method: 'PUT',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
}
// Постановка и снятие лайка
export function likeCardDelete(_id) {
  return handleRequest(BASE_URL + '/cards/likes/' + _id, {
    method: 'DELETE',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  })
}