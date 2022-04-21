export class FormValidator {
  constructor(config,form) {
    this._config = config
    this._form = form
    this._buttonElement = this._form.querySelector(this._config.submitButtonSelector)
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`)
    inputElement.classList.add(this._config.inputErrorClass)
    errorElement.classList.add(this._config.errorClass)
    errorElement.textContent = inputElement.validationMessage
  }

  _hideInputError = (inputElement) => {
    const spanErrorElement = this.form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorElement);
    spanErrorElement.classList.remove(this._config.spanErrorElement);
    spanErrorElement.textContent = "";
  };

  _toggleButtonState() {
    const formValid = this._form.checkValidity()
    this._buttonElement.classList.toggle(this._config.inactiveButtonClass, !formValid)
    this._buttonElement.disabled = !formValid
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement)
    }
  }
  
  _setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault()
    })
    this._inputList = this._form.querySelectorAll(this._config.inputSelector)
    this._toggleButtonState()
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState()
      })
    })
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    })
    this._toggleButtonState()
  }

  enableValidation() {
    this._setEventListeners()
  }
}
