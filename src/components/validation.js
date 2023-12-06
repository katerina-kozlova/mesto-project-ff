// РАБОТА С ВАЛИДАЦИЕЙ 
export const validationConfig = { 
    formSelector: ".form", 
    inputSelector: ".form__input", 
    submitButtonSelector: ".popup__save-button", 
    inputErrorClass: "form__input_type_error", 
    errorClass: "form__input-error_active", 
  }; 
   
  // Функция, которая добавляет класс с ошибкой 
  const showInputError = (formSelector, inputSelector, errorMessage, settings) => { 
    // Находим элемент ошибки внутри самой функции 
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`); 
    inputSelector.classList.add(settings.inputErrorClass); 
    errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр 
    errorElement.classList.add(settings.errorClass); // Показываем сообщение об ошибке 
  }; 
   
  // Функция, которая удаляет класс с ошибкой 
  const hideInputError = (formSelector, inputSelector, settings) => { 
    // Находим элемент ошибки 
    const errorElement = formSelector.querySelector(`.${inputSelector.id}-error`); 
    inputSelector.classList.remove(settings.inputErrorClass); 
    errorElement.classList.remove(settings.errorClass); // Скрываем сообщение об ошибке 
    errorElement.textContent = ""; // Очистим ошибку 
  }; 
 
  // Функция, которая проверяет валидность поля 
  const isValid = (formSelector, inputSelector, settings) => { 
    if (!inputSelector.validity.valid) { 
        // Если поле не проходит валидацию, покажем ошибку 
        showInputError(formSelector, inputSelector, inputSelector.validationMessage, settings); 
    } else { 
        // Если проходит, скроем 
        hideInputError(formSelector, inputSelector, settings); 
    } 
   // Проверка на регулярное выражение
  const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
  if (!regex.test(inputSelector.value)) {
    if (!inputSelector.type === "url") {
    showInputError(formSelector, inputSelector, "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы", settings);
  }
}
};

  // функция, которая принимает массив полей формы и возвращает true, 
  // если в нём хотя бы одно поле не валидно, и false, если все валидны 
  const hasInvalidInput = (inputList) => { 
    // проходим по этому массиву методом some 
    return inputList.some((inputSelector) => { 
        // Если поле не валидно, колбэк вернёт true 
        // Обход массива прекратится и вся функция 
        // hasInvalidInput вернёт true 
        return !inputSelector.validity.valid; 
    }); 
  }; 
   
  const disableButton = (buttonElement) => { 
    buttonElement.disabled = true; 
  }; 
  const enableButton = (buttonElement) => { 
    buttonElement.disabled = false; 
  }; 
   
  // функция для стилизации кнопки 
  const toggleButtonState = (inputList, buttonElement, settings) => { 
    // Если есть хотя бы один невалидный инпут 
    if (hasInvalidInput(inputList)) { 
        // сделай кнопку неактивной 
        // buttonElement.classList.add('popup__save-button_inactive'); 
        disableButton(buttonElement); 
    } else { 
        // иначе сделай кнопку активной 
        // buttonElement.classList.remove('popup__save-button_inactive'); 
        enableButton(buttonElement); 
    } 
  }; 
   
  // Вызовем функцию isValid 
  const setEventListeners = (formSelector, settings) => { 
    // Находим все поля внутри формы, 
    // сделаем из них массив методом Array.from 
    const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector)); 
    const buttonElement = formSelector.querySelector(settings.submitButtonSelector); 
   
    // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля 
    toggleButtonState(inputList, buttonElement, settings); 
    // Обойдём все элементы полученной коллекции 
    inputList.forEach((inputSelector) => { 
        // каждому полю добавим обработчик события input 
        inputSelector.addEventListener("input", () => { 
            // Внутри колбэка вызовем isValid, 
            // передав ей форму и проверяемый элемент 
            isValid(formSelector, inputSelector, settings); 
            // Вызовем toggleButtonState и передадим ей массив полей и кнопку 
            toggleButtonState(inputList, buttonElement, settings); 
        }); 
    }); 
  }; 

  export const clearValidation = (formSelector, settings) => {
    const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector));
    const buttonElement = formSelector.querySelector(settings.submitButtonSelector);
  
    inputList.forEach((inputSelector) => {
      hideInputError(formSelector, inputSelector, settings);
    });
  
    disableButton(buttonElement);
  };
   
  // Вызываем функцию setEventListeners 
  export const enableValidation = (settings) => { 
    // Найдём все формы с указанным классом в DOM, 
    // сделаем из них массив методом Array.from 
    const formList = Array.from(document.querySelectorAll(settings.formSelector)); 
    // Переберём полученную коллекцию 
    formList.forEach((formSelector) => { 
        formSelector.addEventListener("submit", (evt) => { 
            evt.preventDefault(); 
        }); 
        setEventListeners(formSelector, settings); 
    }); 
  }; 

  