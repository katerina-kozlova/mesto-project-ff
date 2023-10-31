import { handleEscClose } from "../components/modal.js";
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

function getCardTemplate() {
    const cardTemplate = document.querySelector(".card-template");
    return cardTemplate.content.cloneNode(true).querySelector(".cards__element");
}
export function deleteCard() {  
    const card = this.closest(".cards__element");
    card.remove(); 
}  
export function likeCard() {  
    this.classList.toggle("cards__like_active");
}  
export function openPopupImage(link, name) {
    const popupDescription = document.querySelector("#popup-description");
    const popupImage = popupDescription.querySelector(".popup__image");
    const popupCaption = popupDescription.querySelector(".popup__caption");

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


