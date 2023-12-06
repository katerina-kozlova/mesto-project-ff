import "./index.css";
import { createCard, deleteCard, likeCard, openPopupImage } from "../components/card.js";
import { openPopup, closePopup, handleOverlayClose } from "../components/modal.js";
import { validationConfig, enableValidation, clearValidation } from "../components/validation.js";
import { getUserInfo, updateUserInfo, getAllCards, createCardApi, deleteCardApi, editAvatar } from "../components/api.js";

// П Е Р Е М Е Н Н Ы Е (общее) 
const popupCard = document.querySelector("#popup-card");
const popupProfile = document.querySelector("#popup-profile");
const popupDescription = document.querySelector("#popup-description");
const popupAvatar = document.querySelector("#popup-avatar");
const allPopups = Array.from(document.querySelectorAll(".popup"));
const saveButton = document.querySelector(".popup__save-button");

// П Е Р Е М Е Н Н Ы Е (редактирования профиля) 
const buttonOpenPopupProfile = document.querySelector(".profile__correct-button");
const buttonClosePopupProfile = document.querySelector("#close-button-profile");
const formEditProfile = document.querySelector("#popup-form-edit");
const nameInput = formEditProfile.querySelector("#name-input"); 
const jobInput = formEditProfile.querySelector("#description-input"); 
const profileName = document.querySelector(".profile__name"); 
const profileDescription = document.querySelector(".profile__description");
const avatarElement = document.querySelector(".profile__avatar");

// П Е Р Е М Е Н Н Ы Е (смена фотографии в профиле)
const buttonOpenPopupAvatar = document.querySelector(".profile__update-button");
const buttonClosePopupAvatar = document.querySelector("#close-button-avatar");
const formEditAvatar = document.querySelector("#popup-form-avatar");

// П Е Р Е М Е Н Н Ы Е (добавление карточки) 
const buttonOpenPopupCard = document.querySelector(".profile__add-button");
const buttonClosePopupCard = document.querySelector("#close-button-card");
const formAddCard = document.querySelector("#popup-form-add");
const cardContainer = document.querySelector(".cards"); //ul 
const buttonClosePopupImage = document.querySelector("#close-button-image");

// Вызоваем валидацию
enableValidation(validationConfig); 

// Прикрепляем слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа РЕДАКТИРОВАНИЯ ПРОФИЛЯ 
buttonOpenPopupProfile.addEventListener("click", function () { 
  saveButton.textContent = "Сохранить";
  openPopup(popupProfile); 
  clearValidation(formEditProfile, validationConfig);
  nameInput.value = profileName.textContent;  
  jobInput.value = profileDescription.textContent; 
}); 
buttonClosePopupProfile.addEventListener("click", function () { 
    closePopup(popupProfile); 
}); 
// Слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа ДОБАВЛЕНИЯ КАРТОЧКИ 
buttonOpenPopupCard.addEventListener("click", function () { 
  saveButton.textContent = "Создать";
    openPopup(popupCard); 
}); 
buttonClosePopupCard.addEventListener("click", function () { 
    closePopup(popupCard);
});
// Слушатель для ЗАКРЫТИЯ попапа с картинкой 
buttonClosePopupImage.addEventListener("click", function () { 
    closePopup(popupDescription); 
}); 
// Обработчик для ЗАКРЫТИЯ попапов по OVERLAY 
allPopups.forEach((popup) => { 
    popup.addEventListener("mousedown", handleOverlayClose); 
}); 
// НОВЫЙ ПОПАП
// Слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа СМЕНЫ ФОТОГРАФИИ
buttonOpenPopupAvatar.addEventListener("click", function () { 
  openPopup(popupAvatar); 
}); 
buttonClosePopupAvatar.addEventListener("click", function () { 
  closePopup(popupAvatar);
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
  saveButton.textContent = "Сохранение...";
  editAvatar(newAvatar)
  .then((res) => {
    avatarElement.style.backgroundImage = `url('${res.avatar}')`;
  })
  formEditAvatar.reset(); 
  clearValidation(formEditAvatar, validationConfig); 
  closePopup(popupAvatar);
  } 
formEditAvatar.addEventListener("submit", handleFormEditAvatarSubmit); 

// Функция «отправки» формы редактирования профиля 
function handleFormEditSubmit(evt) { 
evt.preventDefault();
const name = nameInput.value;
const about = jobInput.value;
saveButton.textContent = "Сохранение...";
updateUserInfo(name, about);
profileName.textContent = name;
profileDescription.textContent = about;
formEditProfile.reset(); 
closePopup(popupProfile);
} 
formEditProfile.addEventListener("submit", handleFormEditSubmit);

// Перебираем массив карточек и добавляем их в разметку
function renderCards(cards) {
  cards.forEach((item) => {
    const card = createCard(item, item.link, item.name, deleteCard, likeCard, openPopupImage, item.owner._id);
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
  createCardApi(titleInput.value, linkInput.value); 
  saveButton.textContent = "Сохранение...";
  formAddCard.reset(); 
  clearValidation(formAddCard, validationConfig); 
  closePopup(popupCard);
}
formAddCard.addEventListener("submit", handleFormAddSubmit); 
  
// Использование функций getUserInfo, getAllCards
Promise.all([getUserInfo(), getAllCards()])
  .then((arr) => {
    const userInfo = arr[0];
    const cards = arr[1];
    renderCards(cards);
    renderUser(userInfo);
  })
  .catch((error) => {
    console.log('Error:', error);
  });
  
