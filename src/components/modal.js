import { createCard } from "../components/card.js";
import { profileName, profileDescription, cardContainer, elementFormAdd, popupProfile, nameInput, jobInput, popupCard, allPopups } from "../pages/index.js";

// Ф У Н К Ц И И 
// Функция «отправки» формы редактирования профиля 
export function handleFormEditSubmit(evt) { 
    evt.preventDefault(); 
    // Эта строчка отменяет стандартную отправку формы. 
    // Так мы можем определить свою логику отправки. 
    profileName.textContent = nameInput.value; 
    profileDescription.textContent = jobInput.value; 
    // Получаем значение полей jobInput и nameInput из свойства value, 
    // Выберираем элементы, куда должны быть вставлены значения полей 
    // Вставляем новые значения с помощью textContent 
    closePopup(popupProfile); 
} 

// Функция добалвения новой карточки 
function addCard(link, name) { 
    const card = createCard(link, name); 
    cardContainer.prepend(card); 
} 
// Функция «отправки» формы добавления новой карточки 
export function handleFormAddSubmit(evt) { 
    evt.preventDefault(); 
    const link = document.querySelector("#link-input"); 
    const name = document.querySelector("#title-input"); 
    addCard(link.value, name.value); 
    elementFormAdd.reset(); 
    closePopup(popupCard);
} 

// Функция для ОТКРЫТИЯ ВСЕХ ПОПАПОВ 
export function openPopup(popupElement) { 
    popupElement.classList.add("popup_opened"); 
    // Обработчик для ЗАКРЫТИЯ попапов по клавише ESC 
    document.addEventListener("keydown", handleEscClose); 
} 
// Функция для ЗАКРЫТИЯ ВСЕХ ПОПАПОВ 
export function closePopup(popupElement) { 
    popupElement.classList.remove("popup_opened"); 
    document.removeEventListener("keydown", handleEscClose); 
} 
// Функция для ЗАКРЫТИЯ ВСЕХ ПОПАПОВ по клавише ESC 
function handleEscClose(evt) { 
    if (evt.key === "Escape") { 
        allPopups.forEach(closePopup); 
    } 
} 
// Функция для ЗАКРЫТИЯ ВСЕХ ПОПАПОВ по OVERLAY 
export function handleOverlayClose(evt) { 
    if (evt.target === evt.currentTarget) { 
        allPopups.forEach(closePopup); 
    } 
} 


