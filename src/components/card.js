import { openPopup, closePopup } from "./modal.js";
import { deleteCardApi, likeCardPut, likeCardDelete, getUserInfo } from "../components/api.js";

const popupDelete = document.querySelector(".popup_confirm");
const buttonAgree = popupDelete.querySelector("#yes-button");

export function getCardFromTemplate() {
    const cardTemplate = document.querySelector(".card-template");
    return cardTemplate.content.cloneNode(true).querySelector(".cards__element");
}

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
export function handleDeleteCard(card) {
  openPopup(popupDelete);
  popupDelete.dataset.cardId = card.dataset.cardId;
  buttonAgree.addEventListener("click", handleDeleteCardSubmit);
}

function getUserId() {
  return getUserInfo()
    .then((userInfo) => {
      const userId = userInfo._id;
      return userId;
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

export function likeCard(cardId, evt) {  
    const cardElement = evt.target.closest('.cards__element');
    const cardCounterElement = cardElement.querySelector('.cards__counter');
    const likeMethod = evt.target.classList.contains('cards__like_active') ? likeCardDelete : likeCardPut;
    likeMethod(cardId) 
      .then((result) => {
        cardCounterElement.textContent = result.likes.length;
        evt.target.classList.toggle('cards__like_active');
      })
      .catch((error) => {
        console.log('Error:', error);
      })
}

// Добавление карточек из массива и кладем в UL 
export function createCard(data, link, name, handleDeleteCard, likeCard, openPopupImage, cardOwnerId) { 
    const card = getCardFromTemplate();
    const cardImage = card.querySelector(".cards__image");
    const cardTitle = card.querySelector(".cards__title");
    const cardId = data._id;

    card.dataset.cardId = data._id;
    cardImage.src = link; 
    cardTitle.textContent = name; 
    cardImage.alt = name; 
  
    const likeButton = card.querySelector(".cards__like");
    likeButton.addEventListener('click', (evt) => {
      likeCard(cardId, evt); 
    }); 
    if (data.likes.some(like => like._id === cardOwnerId)) {
      likeButton.classList.add('cards__like_active');
    }

    const deleteButton = card.querySelector(".cards__delete");
    getUserId()
    .then((userId) => {
      if (cardOwnerId !== userId) {
        deleteButton.remove();
      } else {
        deleteButton.addEventListener('click', () => {
          handleDeleteCard(card);
        });
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
    
    cardImage.addEventListener("click", function () { 
        openPopupImage(link, name); 
    }); 
    return card; 
} 


