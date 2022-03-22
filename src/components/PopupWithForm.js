import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleSubmit){
    super(popupSelector);
    
    this._form = this._popup.querySelector(".popup__form");
    this._inputs =[... this._form.querySelectorAll(".popup__text")]
    this._handleSubmit = handleSubmit
    this._saveButtons = document.querySelectorAll(".popup__add");
  }

  _getInputValues(){
    const values ={};
    this._inputs.forEach((input) =>{
      values[input.name] = input.value;
    })
    return values;
  } 

  changeSubmitHandler(newSubmitHandler){
    this._handleSubmit = newSubmitHandler;
  }

  renderLoading(loading) {
    if (loading) {
        Array.from(this._saveButtons).forEach((submit) => {
            submit.textContent = "Сохранение...";
        })
    } else {
        Array.from(this._saveButtons).forEach((submit) => {
            submit.textContent = "Сохранить";
        })
    }
  }


  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener("submit",(event)=> {
      event.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
  }

  close(){
    super.close()
    this._form.reset();
  }
}