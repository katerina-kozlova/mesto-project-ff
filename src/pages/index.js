import "./index.css";
import { createCard } from "../components/card.js";
import { handleFormEditSubmit, handleFormAddSubmit, openPopup, closePopup, handleOverlayClose } from "../components/modal.js";


// П Е Р Е М Е Н Н Ы Е (общее) 
export const popupCard = document.querySelector("#popup-card"); // Попап карточки 
export const popupProfile = document.querySelector("#popup-profile"); // Попап профиля 
export const popupDescription = document.querySelector("#popup-description"); // Попап для просмотра картинки 
export const allPopups = Array.from(document.querySelectorAll(".popup")); 

// П Е Р Е М Е Н Н Ы Е (редактирования профиля) 
export const buttonOpenPopupProfile = document.querySelector(".profile__correct-button"); // Кнопка редактирования профиля 
export const buttonClosePopupProfile = document.querySelector("#close-button-profile"); // Кнопка закрытия редактирования профиля 
export const elementFormEdit = document.querySelector("#popup-form-edit"); // Форма редактирования профиля 
// Находим поля формы редактирования в DOM: 
export const nameInput = elementFormEdit.querySelector("#name-input"); 
export const jobInput = elementFormEdit.querySelector("#description-input"); 
export const profileName = document.querySelector(".profile__name"); 
export const profileDescription = document.querySelector(".profile__description"); 

// П Е Р Е М Е Н Н Ы Е (добавление карточки) 
export const buttonOpenPopupCard = document.querySelector(".profile__add-button"); // Кнопка добавления карточки 
export const buttonClosePopupCard = document.querySelector("#close-button-card"); // Кнопка закрытия попапа добавления карточки 
export const elementFormAdd = document.querySelector("#popup-form-add"); // Форма добавления карточки 
export const cardContainer = document.querySelector(".cards"); //ul 
export const cardTemplate = document.querySelector(".card-template"); // template 
export const buttonClosePopupImage = document.querySelector("#close-button-image"); // Кнопка закрытия попапа добавления карточки 
export const buttonAddCard = document.querySelector("#add-button"); 
export const namePopupImage = document.querySelector(".popup__caption"); 
export const popupImage = document.querySelector(".popup__image"); 
export const inputLink = document.querySelector("#link-input"); 
export const inputName = document.querySelector("#title-input"); 


export const initialCards = [ 
    { 
        name: "Алтай", 
        link: "https://images.unsplash.com/photo-1643281237857-5f14c2b9f3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", 
    }, 
    { 
        name: "Алтай", 
        link: "https://images.unsplash.com/photo-1635499829006-f18084159cd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80", 
    }, 
    { 
        name: "Озеро Рица", 
        link: "https://images.unsplash.com/photo-1631170706315-707ecc9f158b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=436&q=80", 
    }, 
    { 
        name: "Сиамский залив", 
        link: "https://images.unsplash.com/photo-1596463621264-26fa44b7a2bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80", 
    }, 
    { 
        name: "Чёрное море", 
        link: "https://images.unsplash.com/photo-1601033089147-f9d34a7629ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80", 
    }, 
    { 
        name: "Река Катунь", 
        link: "https://images.unsplash.com/photo-1564324738191-7f91304232eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80", 
    }, 
]; 



// Прикрепляем слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа РЕДАКТИРОВАНИЯ ПРОФИЛЯ 
buttonOpenPopupProfile.addEventListener("click", function () { 
    openPopup(popupProfile); 
    nameInput.value = profileName.textContent;  
    jobInput.value = profileDescription.textContent; 
}); 
buttonClosePopupProfile.addEventListener("click", function () { 
    closePopup(popupProfile); 
}); 
// Обработчик «отправки» формы редактирования профиля 
// Прикрепляем обработчик к форме: 
elementFormEdit.addEventListener("submit", handleFormEditSubmit); // он будет следить за событием “submit” - «отправка» 

// Слушатель для ОТКРЫТИЯ И ЗАКРЫТИЯ попопа ДОБАВЛЕНИЯ КАРТОЧКИ 
buttonOpenPopupCard.addEventListener("click", function () { 
    openPopup(popupCard); 
}); 
buttonClosePopupCard.addEventListener("click", function () { 
    closePopup(popupCard); 
});

// Перебираем массив карточек 
initialCards.forEach((item) => { 
    const card = createCard(item.link, item.name); 
    cardContainer.appendChild(card); 
}); 
// Слушатель для ЗАКРЫТИЯ попапа с картинкой 
buttonClosePopupImage.addEventListener("click", function () { 
    closePopup(popupDescription); 
}); 
elementFormAdd.addEventListener("submit", handleFormAddSubmit); 
 
// Обработчик для ЗАКРЫТИЯ попапов по OVERLAY 
allPopups.forEach((popup) => { 
    popup.addEventListener("mousedown", handleOverlayClose); 
}); 
