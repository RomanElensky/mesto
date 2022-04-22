export class FormValidator {
  constructor(formElement, formPopup) {
    this._formPopup = formPopup;
    this._errorClass = formElement.errorClass;
    this._formSelector = formElement.formSelector;
    this._inputSelector = formElement.inputSelector;
    this._inactiveButtonClass = formElement.inactiveButtonClass;
    this._submitButtonSelector = formElement.submitButtonSelector;
    this._inputErrorClass = formElement.inputErrorClass;
    this._buttonElement = this._formPopup.querySelector(this._submitButtonSelector)
    this._inputFormActive = Array.from(this._formPopup.querySelectorAll(this._inputSelector));
  }

  _showInputError(inputElement) {
    const errorElement = this._formPopup.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.vvalidationMessage;
  }

  _hideInputError = (inputElement) => {
    const spanErrorElement = this._formPopup.querySelector(`.${inputElement.id}-error`);
    spanErrorElement.classList.remove(this._errorClass);
  };

  _activationButtonSave() {
    this._buttonElement.removeAttribute('disabled');
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  _deactivateButtonSave() {
    this._buttonElement.setAttribute('disabled', true);
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  _checkInput() {
    return this._inputFormActive.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  _toggleButtonState() {
    const formValid = this._checkInput();
    if (!formValid) {
      this._activationButtonSave();
    } else {
      this._deactivateButtonSave();
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      this._showInputError(inputElement);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      this._hideInputError(inputElement);
    }
    this._toggleButtonState();
  }
  
  _setEventListeners(inputElement) {
    inputElement.addEventListener('input', () => {
      this._checkInputValidity(inputElement);
    });
  }

  resetValidation() {
    this._inputFormActive.forEach(inputElement => {
      inputElement.classList.remove(this._inputErrorClass);
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
  }

  enableValidation() {
    this._inputFormActive.forEach(inputElement => {
      this._setEventListeners(inputElement);
    });
  }
}
