import "./index.css";
import { createCard, likeCard } from "../components/card.js";
import { openPopup, closePopup, handleOverlayClose } from "../components/modal.js";
import { enableValidation, clearValidation } from "../components/validation.js";
import { getUserInfo, updateUserInfo, getAllCards, createCardApi, editAvatar, deleteCardApi } from "../components/api.js";
import { validationConfig } from "../components/utils/constants.js";

let userId

// П Е Р Е М Е Н Н Ы Е (общее) 
const popupCard = document.querySelector("#popup-card");
const popupProfile = document.querySelector("#popup-profile");
const popupDescription = document.querySelector("#popup-description");
const popupAvatar = document.querySelector("#popup-avatar");
const allPopups = Array.from(document.querySelectorAll(".popup"));

// П Е Р Е М Е Н Н Ы Е (редактирования профиля) 
const buttonOpenPopupProfile = document.querySelector(".profile__correct-button");
const buttonClosePopupProfile = document.querySelector("#close-button-profile");
const formEditProfile = document.querySelector("#popup-form-edit");
const nameInput = formEditProfile.querySelector("#name-input"); 
const jobInput = formEditProfile.querySelector("#description-input"); 
const profileName = document.querySelector(".profile__name"); 
const profileDescription = document.querySelector(".profile__description");
const avatarElement = document.querySelector(".profile__avatar");
const buttonSaveNewInfo = document.querySelector('#save-button-info');

// П Е Р Е М Е Н Н Ы Е (смена фотографии в профиле)
const buttonOpenPopupAvatar = document.querySelector(".profile__update-button");
const buttonClosePopupAvatar = document.querySelector("#close-button-avatar");
const formEditAvatar = document.querySelector("#popup-form-avatar");
const buttonSaveNewAvatar = document.querySelector('#save-button-avatar');

// П Е Р Е М Е Н Н Ы Е (добавление карточки) 
const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const buttonClosePopupCard = document.querySelector("#close-button-card");
const formAddCard = document.querySelector("#popup-form-add");
const cardContainer = document.querySelector(".cards"); //ul 
const buttonClosePopupImage = document.querySelector("#close-button-image");
const popupDelete = document.querySelector(".popup_confirm");
const buttonAgree = popupDelete.querySelector("#yes-button");
const buttonClosePopupDelete = document.querySelector("#close-button-confirm");
const buttonAddNewCard = document.querySelector('#add-button-card');

// П Е Р Е М Е Н Н Ы Е (попап картинки) 
const popupImage = popupDescription.querySelector(".popup__image");
const popupCaption = popupDescription.querySelector(".popup__caption");

// Вызоваем валидацию
enableValidation(validationConfig); 

// Прикрепляем слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа РЕДАКТИРОВАНИЯ ПРОФИЛЯ 
buttonOpenPopupProfile.addEventListener("click", function () { 
  clearValidation(formEditProfile, validationConfig);  
  openPopup(popupProfile); 
  nameInput.value = profileName.textContent;  
  jobInput.value = profileDescription.textContent; 
}); 
buttonClosePopupProfile.addEventListener("click", function () { 
    closePopup(popupProfile); 
}); 
// Слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа ДОБАВЛЕНИЯ КАРТОЧКИ 
buttonOpenPopupCard.addEventListener("click", function () { 
    formAddCard.reset(); 
    clearValidation(formAddCard, validationConfig); 
    openPopup(popupCard); 
}); 
buttonClosePopupCard.addEventListener("click", function () { 
    closePopup(popupCard);
});
// Слушатель для ОТКРЫТИЯ попапа с картинкой 
function openPopupImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openPopup(popupDescription);
}
// Слушатель для ЗАКРЫТИЯ попапа с картинкой 
buttonClosePopupImage.addEventListener("click", function () { 
    closePopup(popupDescription); 
}); 
// Обработчик для ЗАКРЫТИЯ попапов по OVERLAY 
allPopups.forEach((popup) => { 
    popup.addEventListener("mousedown", handleOverlayClose); 
}); 
// Слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа СМЕНЫ ФОТОГРАФИИ
buttonOpenPopupAvatar.addEventListener("click", function () { 
  formEditAvatar.reset(); 
  clearValidation(formEditAvatar, validationConfig);
  openPopup(popupAvatar); 
}); 
buttonClosePopupAvatar.addEventListener("click", function () { 
  closePopup(popupAvatar);
});
// Слушатель для ЗАКРЫТИЯ попопа УДАЛЕНИЯ КАРТОЧКИ
buttonClosePopupDelete.addEventListener("click", function () { 
  closePopup(popupDelete);
});

function renderUser(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  avatarElement.style.backgroundImage = `url(${user.avatar})`;
}

// Функция «отправки» формы обновления аватара
function handleFormEditAvatarSubmit(evt) { 
  evt.preventDefault();
  const linkInput = formEditAvatar.querySelector("#link-input");
  const newAvatar = linkInput.value;
  avatarElement.style.backgroundImage = newAvatar;
  buttonSaveNewAvatar.textContent = "Сохранение...";
  editAvatar(newAvatar)
  .then((res) => {
    avatarElement.style.backgroundImage = `url('${res.avatar}')`;
    closePopup(popupAvatar);
  })
  .catch((error) => {
    console.log('Error:', error);
  })
  .finally(() => {
    buttonSaveNewAvatar.textContent = "Сохранить";  
  })
  } 
formEditAvatar.addEventListener("submit", handleFormEditAvatarSubmit); 

// Функция «отправки» формы редактирования профиля 
function handleFormEditSubmit(evt) { 
evt.preventDefault();
const name = nameInput.value;
const about = jobInput.value;
buttonSaveNewInfo.textContent = "Сохранение...";
updateUserInfo(name, about)
.then((res) => {
  profileName.textContent = res.name;
  profileDescription.textContent = res.about;
  closePopup(popupProfile);
})
.catch((error) => {
  console.log('Error:', error);
})
.finally(() => {
  buttonSaveNewInfo.textContent = "Сохранить";
})
} 
formEditProfile.addEventListener("submit", handleFormEditSubmit);

// Функция удаления карточки
function handleDeleteCardSubmit(evt) {
  evt.preventDefault();
  const cardId = popupDelete.dataset.cardId;
  deleteCardApi(cardId)
    .then(() => {
      const card = document.querySelector(`[data-card-id="${cardId}"]`);
      if (card) {
        card.remove();
      }
      closePopup(popupDelete);
    })
    .catch((error) => {
      console.error(error);
    });
}
function handleDeleteCard(card) {
  openPopup(popupDelete);
  popupDelete.dataset.cardId = card.dataset.cardId;
}
buttonAgree.addEventListener("click", handleDeleteCardSubmit);

// Перебираем массив карточек и добавляем их в разметку
function renderCards(cards) {
  cards.forEach((item) => {
    const card = createCard(item, item.link, item.name, handleDeleteCard, likeCard, openPopupImage, userId);
    const cardCounterElement = card.querySelector('.cards__counter');
    cardCounterElement.textContent = item.likes.length;
    cardContainer.appendChild(card);
  });
}

// Функция «отправки» формы добавления новой карточки 
function handleFormAddSubmit(evt) { 
  evt.preventDefault();
  const linkInput = document.querySelector("#link-input"); 
  const titleInput = document.querySelector("#title-input"); 
  buttonAddNewCard.textContent = "Сохранение...";
  createCardApi(titleInput.value, linkInput.value)
  .then((data) => {
    const card = createCard(data, data.link, data.name, handleDeleteCard, likeCard, openPopupImage, userId);
    const cardContainer = document.querySelector(".cards");
    cardContainer.prepend(card);
    closePopup(popupCard);
  })
  .catch((error) => {
    console.log('Error:', error);
  })
  .finally(() => {
    buttonAddNewCard.textContent = "Создать";
  })
}
formAddCard.addEventListener("submit", handleFormAddSubmit); 

// Использование функций getUserInfo, getAllCards
Promise.all([getUserInfo(), getAllCards()])
  .then(([userInfo, cards]) => {
    renderUser(userInfo);
    userId = userInfo._id;
    renderCards(cards); 
  })
  .catch((error) => {
    console.log('Error:', error);
  });
