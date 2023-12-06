import { handleEscClose, openPopup, closePopup } from "./modal.js";
import { deleteCardApi, likeCardApi } from "../components/api.js";

const popupDescription = document.querySelector("#popup-description");
const popupImage = popupDescription.querySelector(".popup__image");
const popupCaption = popupDescription.querySelector(".popup__caption");
const popupDelete = document.querySelector(".popup_confirm");
const yesButton = popupDelete.querySelector("#yes-button");


export function getCardTemplate() {
    const cardTemplate = document.querySelector(".card-template");
    return cardTemplate.content.cloneNode(true).querySelector(".cards__element");
}

export function deleteCard(cardId, evt) { 
  deleteCardApi(cardId)  
  .then(() => { 
    console.log(evt.target);
    evt.target.closest(".cards__element").remove();
  }) 
} 

export function likeCard(cardId, evt) {  
    const cardElement = evt.target.closest('.cards__element');
    const cardCounterElement = cardElement.querySelector('.cards__counter');
    const currentLikes = parseInt(cardCounterElement.textContent);
    const isLiked = evt.target.classList.contains('cards__like_active');
  
    if (isLiked) {
      likeCardApi(cardId, "DELETE");
      cardCounterElement.textContent = currentLikes - 1;
      evt.target.classList.remove('cards__like_active');
    } else {
      likeCardApi(cardId, "PUT");
      cardCounterElement.textContent = currentLikes + 1;
      evt.target.classList.add('cards__like_active');
      console.log(cardId);
    }
}  
export function openPopupImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    popupDescription.classList.add("popup_opened"); 
    document.addEventListener("keydown", handleEscClose); 
}

// Добавление карточек из массива и кладем в UL 
export function createCard(data, link, name, deleteCard, likeCard, openPopupImage, cardOwnerId) { 
    const card = getCardTemplate();
    const cardImage = card.querySelector(".cards__image");
    const cardTitle = card.querySelector(".cards__title");
    const cardId = data._id;
  
    cardImage.src = link; 
    cardTitle.textContent = name; 
    cardImage.alt = name; 
  
    const deleteButton = card.querySelector(".cards__delete");
    const likeButton = card.querySelector(".cards__like");

    if (data.owner._id !== cardOwnerId) {
      deleteButton.remove()}

    deleteButton.addEventListener('click', () => { 
      openPopup(popupDelete); 
      yesButton.addEventListener("click", (evt) => { 
        evt.preventDefault();
        deleteCard(cardId, evt);
        closePopup(popupDelete); 
      }); 
    }); 
    
    likeButton.addEventListener('click', (evt) => {
        likeCard(cardId, evt); 
    }); 

    cardImage.addEventListener("click", function () { 
        openPopupImage(link, name); 
    }); 
    return card; 
} 


