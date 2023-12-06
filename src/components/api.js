import { createCard, deleteCard, likeCard, openPopupImage } from "../components/card.js";

const BASE_URL = 'https://nomoreparties.co';
const token = 'f3166ef7-de2f-4e47-9de9-c0005a5ed228';

// И Н Ф О Р М А Ц И Я  О  П О Л Ь З О В А Т Е Л Е
  // Загрузка информации о пользователе с сервера
export function getUserInfo() {
      return fetch(BASE_URL + '/v1/' + 'wff-cohort-1' + '/users/me', {
        headers: {
          authorization: token
        }
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          throw new Error('Не удалось загрузить информацию о пользователе' + res.status);
        })
        .then((data) => {
          const { name, about, avatar, _id } = data;
        return { name, about, avatar, _id }; 
      })
        .catch((error) => {
          console.log('Error:', error);
        });
    }
  // Редактирование профиля, обновление информации
export function updateUserInfo(name, about) {
    return fetch(BASE_URL + '/v1/' + 'wff-cohort-1' + '/users/me', {
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Не удалось сохранить новые данные пользователя' + res.status);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

// Замена фотографии профиля 
export function editAvatar(avatarLink) {
  return fetch(BASE_URL + '/v1/' + 'wff-cohort-1' + '/users/me' + '/avatar', {
    method: 'PATCH',
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Не удалось загрузить фотографию' + res.status);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

// И Н Ф О Р М А Ц И Я  О  К А Р Т О Ч К А Х
//  Загрузка карточек с сервера
export function getAllCards() {
    return fetch(BASE_URL + '/v1/' + 'wff-cohort-1' + '/cards', {
      headers: {
        authorization: token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Не удалось загрузить карточки' + res.status);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }
//  Создание новой карточки
export function createCardApi(name, link) {
    return fetch(BASE_URL + '/v1/' + 'wff-cohort-1' + '/cards', {
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
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Не удалось создать карточку' + res.status);
      })
      .then((data) => {
        //const cardOwnerId = data.owner._id;
        const card = createCard(data, data.link, data.name, deleteCard, likeCard, openPopupImage, data.owner._id);
        const cardContainer = document.querySelector(".cards");
        cardContainer.prepend(card);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

    // Удаление карточки
export function deleteCardApi(_id) {
    return fetch(BASE_URL + '/v1/' + 'wff-cohort-1' + '/cards/' + _id, {
      method: 'DELETE',
      headers: {
        authorization: token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Не удалось удалить карточку' + res.status);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  }

  // Постановка и снятие лайка
  export function likeCardApi(_id, method) {
    return fetch(BASE_URL + '/v1/' + 'wff-cohort-1' + '/cards' + '/likes/'+ _id, {
        method: method,
        headers: {
            authorization: token,
        'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Не удалось поставить/удалить лайк' + res.status);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    }
