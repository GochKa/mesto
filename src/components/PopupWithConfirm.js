import {Popup} from './Popup.js';

export class PopupWithConfirm extends Popup{
    constructor(popupSelector){ 
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
      }
  
      setFormSubmitHandler(handler) {
        this.setFormSubmitHandler = handler;
    }
  
      close() {
        super.close();
        this._form.reset()
      }
  
      setEventListeners() {
        super.setEventListeners();
  
        this._form.addEventListener('submit',(evt) => {
          evt.preventDefault();
          this.setFormSubmitHandler();
          this.close();
        })
      }
    }