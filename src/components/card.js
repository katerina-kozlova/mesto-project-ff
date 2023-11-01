import { handleEscClose } from "./modal.js";

const popupDescription = document.querySelector("#popup-description");
const popupImage = popupDescription.querySelector(".popup__image");
const popupCaption = popupDescription.querySelector(".popup__caption");

function getCardTemplate() {
    const cardTemplate = document.querySelector(".card-template");
    return cardTemplate.content.cloneNode(true).querySelector(".cards__element");
}
export function deleteCard(evt) {  
    const card = evt.target.closest(".cards__element");
    card.remove();
}  
export function likeCard(evt) {  
    evt.target.classList.toggle("cards__like_active");
}  
export function openPopupImage(link, name) {
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;

    popupDescription.classList.add("popup_opened"); 
    document.addEventListener("keydown", handleEscClose); 
}

// Добавление карточек из массива и кладем в UL 
export function createCard(link, name, deleteCard, likeCard, openPopupImage) { 
    const card = getCardTemplate();
    const cardImage = card.querySelector(".cards__image");
    const cardTitle = card.querySelector(".cards__title"); 
 
    cardImage.src = link; 
    cardTitle.textContent = name; 
    cardImage.alt = name; 
  
    const deleteButton = card.querySelector(".cards__delete"); // Находим кнопку удаления карточек 
    const likeButton = card.querySelector(".cards__like"); // Находим кнопку лайка 
    
    deleteButton.addEventListener("click", deleteCard);  
    likeButton.addEventListener("click", likeCard);  

    cardImage.addEventListener("click", function () { 
        openPopupImage(link, name); 
    }); 
     
    return card; 
} 


