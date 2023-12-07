// Функция, которая добавляет класс с ошибкой 
const showInputError = (formElement, inputElement, errorMessage, settings) => { 
  // Находим элемент ошибки внутри самой функции 
  const errorElement = formElement .querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.add(settings.inputErrorClass); 
  errorElement.textContent = errorMessage; // Заменим содержимое span с ошибкой на переданный параметр 
  errorElement.classList.add(settings.errorClass); // Показываем сообщение об ошибке 
}; 
   
// Функция, которая удаляет класс с ошибкой 
const hideInputError = (formElement, inputElement, settings) => { 
  // Находим элемент ошибки 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); 
  inputElement.classList.remove(settings.inputErrorClass); 
  errorElement.classList.remove(settings.errorClass); // Скрываем сообщение об ошибке 
  errorElement.textContent = ""; // Очистим ошибку 
}; 
 
// Функция, которая проверяет валидность поля 
const isValid = (formElement, inputElement, settings) => { 
  if (inputElement.validity.patternMismatch) { 
    inputElement.setCustomValidity(inputElement.dataset.errorMessage); 
  } else { 
    inputElement.setCustomValidity(""); 
  } 
  if (!inputElement.validity.valid) { 
    // Если поле не проходит валидацию, покажем ошибку 
    showInputError(formElement, inputElement, inputElement.validationMessage, settings); 
  } else { 
    // Если проходит, скроем 
    hideInputError(formElement, inputElement, settings); 
  } 
};

// функция, которая принимает массив полей формы и возвращает true, 
// если в нём хотя бы одно поле не валидно, и false, если все валидны 
const hasInvalidInput = (inputList) => { 
  // проходим по этому массиву методом some 
  return inputList.some((inputElement) => { 
    // Если поле не валидно, колбэк вернёт true 
    // Обход массива прекратится и вся функция 
    // hasInvalidInput вернёт true 
    return !inputElement.validity.valid; 
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
const setEventListeners = (formElement, settings) => { 
  // Находим все поля внутри формы, 
  // сделаем из них массив методом Array.from 
  const inputList = Array.from(formElement.querySelectorAll(settings.inputElement)); 
  const buttonElement = formElement.querySelector(settings.submitButtonSelector); 
   
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля 
  toggleButtonState(inputList, buttonElement, settings); 
  // Обойдём все элементы полученной коллекции 
  inputList.forEach((inputElement) => { 
    // каждому полю добавим обработчик события input 
    inputElement.addEventListener("input", () => { 
      // Внутри колбэка вызовем isValid, 
      // передав ей форму и проверяемый элемент 
      isValid(formElement, inputElement, settings); 
      // Вызовем toggleButtonState и передадим ей массив полей и кнопку 
      toggleButtonState(inputList, buttonElement, settings); 
    }); 
  }); 
}; 

export const clearValidation = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputElement));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });
  
  disableButton(buttonElement);
};
   
// Вызываем функцию setEventListeners 
export const enableValidation = (settings) => { 
  // Найдём все формы с указанным классом в DOM, 
  // сделаем из них массив методом Array.from 
  const formList = Array.from(document.querySelectorAll(settings.formElement)); 
  // Переберём полученную коллекцию 
  formList.forEach((formElement) => { 
    formElement.addEventListener("submit", (evt) => { 
      evt.preventDefault(); 
    }); 
    setEventListeners(formElement, settings); 
  }); 
}; 

  