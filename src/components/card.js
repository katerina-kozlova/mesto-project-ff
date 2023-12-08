import { likeCardPut, likeCardDelete } from "../components/api.js";

export function getCardFromTemplate() {
    const cardTemplate = document.querySelector(".card-template");
    return cardTemplate.content.cloneNode(true).querySelector(".cards__element");
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
export function createCard(data, link, name, handleDeleteCard, likeCard, openPopupImage, userId) { 
    const card = getCardFromTemplate();
    const cardImage = card.querySelector(".cards__image");
    const cardTitle = card.querySelector(".cards__title");
    const cardId = data._id;
    const cardOwnerId = data.owner._id;

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
    if (cardOwnerId !== userId) { 
      deleteButton.remove(); 
    } else { 
      deleteButton.addEventListener('click', () => { 
        handleDeleteCard(card); 
      }); 
    } 
    
    cardImage.addEventListener("click", function () { 
        openPopupImage(link, name); 
    }); 
    return card; 
} 


