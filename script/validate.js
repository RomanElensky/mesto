const validationList = {
    formElement: '.popup__input-container',
    inputElement: '.popup__input',
    fieldsetElement: '.popup__fieldset',
    buttonElemnt: 'popup__submit-button',
    inputErrorElement: 'popup__input_type_error',
    spanErrorElement: 'popup__input_type_span-error'
}

const showInputError = (formElement, inputElement, errorMessage, element) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(element.inputErrorElement);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(element.errorElement);
};

const hideInputError = (formElement, inputElement, element) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(element.inputErrorElement);
    errorElement.classList.remove(element.errorElement);
    errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, element) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, element);
    } else {
      hideInputError(formElement, inputElement, element);
    }
};

const setEventListeners = (formElement, element) => {
    const inputList = Array.from(formElement.querySelectorAll(element.inputElement));
    const buttonElement = formElement.querySelector("."+element.buttonElement);
  
    toggleButtonState(inputList, buttonElement,element);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement,element);
  
        toggleButtonState(inputList, buttonElement,element);
      });
    });
};

const enableValidation = (element) => {
    const formList = Array.from(document.querySelectorAll(element.formElement));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      const fieldsetElement = Array.from(
        formElement.querySelectorAll(element.fieldsetElement)
      );
  
      fieldsetElement.forEach((fieldsetElement) => { 
        setEventListeners(fieldsetElement, element);
      });
    });
};

enableValidation(validationList);

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement,element) {
  
    if (hasInvalidInput(inputList, element)) {
      buttonElement.classList.add("popup__submit-button_disabled");
      buttonElement.setAttribute("disabled", true);
    } else {
      buttonElement.classList.remove("popup__submit-button_disabled");
      buttonElement.removeAttribute("disabled", true);
    }
}
