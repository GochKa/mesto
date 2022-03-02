export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  open() {
    this._popupSelector.classList.add("popup_opened")
  }

  close() {
    this._popupSelector.classList.remove("popup_opened")
    
  }

  _closePopupKeyHandler(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      const classClosing = document.querySelector(".popup_opened");
      closePopup(classClosing);
      clearErrorMessage()
      
    }
  }

  _closePopupOnOverlay(evt){
    if (evt.target === evt.currentTarget){
      evt.target.classList.remove("popup_opened");
      clearErrorMessage()
    }
  }

  setEventListener(){
    this._popupSelector.querySelector(".popup__close").addEventListener("click", () =>{
      this._popupSelector.close();
      
    })
    this._popupSelector.addEventListener("keydown", () =>{
      this._closePopupKeyHandler();
      
    })
    this._popupSelector.addEventListener("mousedown", () =>{
      this._closePopupOnOverlay();
    })
  }
}
