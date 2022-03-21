export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;

    this._inputSet = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
    this._buttonElm = this._form.querySelector(this._settings.activeButtonClass);

  }

  _hasInvalidInput(){
    return this._inputSet.some((inputElement) =>{
      return !inputElement.checkValidity();
    })
  };

  _disableSubmitButton (){
    const {inactiveButtonClass} = this._settings
    this._buttonElm.classList.add(inactiveButtonClass);
    this._buttonElm.disabled = true;

  };

  _enableSubmitButton () {
    const {inactiveButtonClass} = this._settings
    this._buttonElm.classList.remove(inactiveButtonClass);
    this._buttonElm.disabled = false;
  };

  _toggleButton(){
    if (this._hasInvalidInput()){
      this._disableSubmitButton();
    } else{
      this._enableSubmitButton();
    }

  }

  _showError(input, errorText) {
    const {errorVisibleClass, inputErrorClass} = this._settings;
    const errorElm = this._form.querySelector(`#error-${input.id}`);
    input.classList.add(inputErrorClass);
    errorElm.classList.add(errorVisibleClass);
    errorElm.textContent = errorText;
    
  }

  _hideError(input) {
    const errorElement = this._form.querySelector(`#error-${input.id}`);
    const {errorVisibleClass, inputErrorClass} = this._settings;
    input.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorVisibleClass);
    errorElement.textContent = "";
  }


  _checkInputValidity(inputElement) {
    if (!inputElement.checkValidity()) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  };

  _setEventListener() {
    this._inputSet.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButton();
      });
    });
  };

  resetValidation(){
    this._toggleButton();

    this._inputSet.forEach((inputElement) =>{
      this._hideError(inputElement);
    })
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      
    });
    this._setEventListener();
    this._toggleButton();
    
  }

}


