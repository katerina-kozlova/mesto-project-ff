import { openPopup } from "../components/modal.js";
import { popupDescription, cardTemplate, popupImage, namePopupImage } from "../pages/index.js";


// Добавление карточек из массива и кладем в UL 
export function createCard(link, name) { 
    const cardClone = cardTemplate.content.cloneNode(true); 
    const card = cardClone.querySelector(".cards__element"); 
    const cardImage = cardClone.querySelector(".cards__image"); 
    const cardTitle = cardClone.querySelector(".cards__title"); 
 
    cardImage.src = link; 
    cardTitle.textContent = name; 
    cardImage.alt = name; 
 
    const deleteButton = card.querySelector(".cards__delete"); // Находим кнопку удаления карточек 
    const likeButton = card.querySelector(".cards__like"); // Находим кнопку лайка 
    const namePopupImage = document.querySelector(".popup__caption"); 
    const srcPopupImage = document.querySelector(".popup__image"); 
    const altPopupImage = document.querySelector(".popup__image"); 
     
    // Функция и слушатель для удаления карточки 
    function deleteCard() { 
        deleteButton.parentElement.remove(); 
    } 
    deleteButton.addEventListener("click", deleteCard); 
    // Функция и слушатель для лайка карточки 
    function likeCard() { 
        likeButton.classList.toggle("cards__like_active"); 
    } 
    likeButton.addEventListener("click", likeCard); 
    // Слушатель для ОТКРЫТИЯ попапа с картинкой 
    cardImage.addEventListener("click", () => { 
        srcPopupImage.src = link; 
        namePopupImage.textContent = name; 
        altPopupImage.alt = name; 
        openPopup(popupDescription);  
    });  
     
    return card; 
} 
