export class FormValidator {

  constructor(config,form) {
    this._config = config
    this._form = form
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector)
  }

  _hideInputError = (inputElement) => {
    const spanErrorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorElement);
    spanErrorElement.classList.remove(this._config.spanErrorElement);
    spanErrorElement.textContent = "";
  };

  _checkInputValidity = (formElement, inputElement, element) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, element);
    } else {
      this._hideInputError(formElement, inputElement, element);
    };

  _setEventListeners = (formElement, element) => {
    const inputList = Array.from(formElement.querySelectorAll(element.inputElement));
    const buttonElement = formElement.querySelector("."+element.buttonElemnt);

    this._toggleButtonState(inputList, buttonElement,element);

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        this._checkInputValidity(formElement, inputElement,element);
        this._toggleButtonState(inputList, buttonElement,element);
      });
    });
  };

   _enableValidation = (element) => {
     const formList = Array.from(document.querySelectorAll(element.formElement));
     this._formList.forEach((formElement) => {
       formElement.addEventListener("submit", function (evt) {
         evt.preventDefault();
        });
        const fieldsetElement = Array.from(
          formElement.querySelectorAll(element.fieldsetElement)
          );

          this._fieldsetElement.forEach((fieldsetElement) => { 
      setEventListeners(fieldsetElement, element);
    });
  });
  };

  enableValidation(validationList);

  _hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
 }

  _toggleButtonState(inputList, buttonElement,element) {
    if (hasInvalidInput(inputList, element)) {
    buttonElement.classList.add("popup__submit-button_disabled");
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove("popup__submit-button_disabled");
    buttonElement.removeAttribute("disabled", true);
  }
  }
}
