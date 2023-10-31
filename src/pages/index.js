import "./index.css";
import { createCard, initialCards, deleteCard, likeCard, openPopupImage } from "../utils/card.js";
import { openPopup, closePopup, handleOverlayClose } from "../components/modal.js";

// П Е Р Е М Е Н Н Ы Е (общее) 
const popupCard = document.querySelector("#popup-card"); // Попап карточки 
const popupProfile = document.querySelector("#popup-profile"); // Попап профиля 
const popupDescription = document.querySelector("#popup-description"); // Попап для просмотра картинки 
const allPopups = Array.from(document.querySelectorAll(".popup")); 

// П Е Р Е М Е Н Н Ы Е (редактирования профиля) 
const buttonOpenPopupProfile = document.querySelector(".profile__correct-button"); // Кнопка редактирования профиля 
const buttonClosePopupProfile = document.querySelector("#close-button-profile"); // Кнопка закрытия редактирования профиля 
const formEditProfile = document.querySelector("#popup-form-edit"); // Форма редактирования профиля 
// Находим поля формы редактирования в DOM: 
const nameInput = formEditProfile.querySelector("#name-input"); 
const jobInput = formEditProfile.querySelector("#description-input"); 
const profileName = document.querySelector(".profile__name"); 
const profileDescription = document.querySelector(".profile__description"); 

// П Е Р Е М Е Н Н Ы Е (добавление карточки) 
const buttonOpenPopupCard = document.querySelector(".profile__add-button"); // Кнопка добавления карточки 
const buttonClosePopupCard = document.querySelector("#close-button-card"); // Кнопка закрытия попапа добавления карточки 
const formAddCard = document.querySelector("#popup-form-add"); // Форма добавления карточки 
const cardContainer = document.querySelector(".cards"); //ul 
const buttonClosePopupImage = document.querySelector("#close-button-image"); // Кнопка закрытия попапа добавления карточки 

// Функция «отправки» формы редактирования профиля 
function handleFormEditSubmit(evt) { 
    evt.preventDefault(); 
    profileName.textContent = nameInput.value; 
    profileDescription.textContent = jobInput.value; 
    closePopup(popupProfile); 
} 
// Обработчик «отправки» формы редактирования профиля 
formEditProfile.addEventListener("submit", handleFormEditSubmit); // он будет следить за событием “submit” - «отправка» 
// Прикрепляем слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа РЕДАКТИРОВАНИЯ ПРОФИЛЯ 
buttonOpenPopupProfile.addEventListener("click", function () { 
    openPopup(popupProfile); 
    nameInput.value = profileName.textContent;  
    jobInput.value = profileDescription.textContent; 
}); 
buttonClosePopupProfile.addEventListener("click", function () { 
    closePopup(popupProfile); 
}); 

// Слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа ДОБАВЛЕНИЯ КАРТОЧКИ 
buttonOpenPopupCard.addEventListener("click", function () { 
    openPopup(popupCard); 
}); 
buttonClosePopupCard.addEventListener("click", function () { 
    closePopup(popupCard); 
});
 // Функция добалвения новой карточки 
function addCard(link, name) { 
    const card = createCard(link, name, deleteCard, likeCard, openPopupImage); 
    cardContainer.prepend(card); 
} 
// Функция «отправки» формы добавления новой карточки 
function handleFormAddSubmit(evt) { 
    evt.preventDefault(); 
    const link = document.querySelector("#link-input"); 
    const name = document.querySelector("#title-input"); 
    addCard(link.value, name.value); 
    formAddCard.reset(); 
    closePopup(popupCard);
} 
// Перебираем массив карточек 
initialCards.forEach((item) => { 
    const card = createCard(item.link, item.name, deleteCard, likeCard, openPopupImage); 
    cardContainer.appendChild(card); 
}); 

// Слушатель для ЗАКРЫТИЯ попапа с картинкой 
buttonClosePopupImage.addEventListener("click", function () { 
    closePopup(popupDescription); 
}); 
formAddCard.addEventListener("submit", handleFormAddSubmit); 

// Обработчик для ЗАКРЫТИЯ попапов по OVERLAY 
allPopups.forEach((popup) => { 
    popup.addEventListener("mousedown", handleOverlayClose); 
}); 




