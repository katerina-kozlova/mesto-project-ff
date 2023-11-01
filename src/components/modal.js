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
export function handleEscClose(evt) { 
    if (evt.key === "Escape") { 
        const popupOpened = document.querySelector('.popup_opened'); 
        closePopup(popupOpened); 
    } 
} 
// Функция для ЗАКРЫТИЯ ВСЕХ ПОПАПОВ по OVERLAY 
export function handleOverlayClose(evt) { 
    if (evt.target === evt.currentTarget) { 
        const popupOpened = document.querySelector('.popup_opened'); 
        closePopup(popupOpened); 
    } 
} 


