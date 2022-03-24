import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup{
    constructor(popupSelector){ 
        super(popupSelector);
        this.button = this._popup.querySelector(".button-confirm-deleat");
      }
  
      setFormSubmitHandler(handler) {
        this._setFormSubmitHandler = handler;
    }
  
      close() {
        super.close();
      }
  
      setEventListeners() {
        super.setEventListeners();
        this.button.addEventListener('click',() => {     
          this._setFormSubmitHandler();
        })
      }
    }