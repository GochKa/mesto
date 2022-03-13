import { Popup } from "../Class/Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleSubmit){
    super(popupSelector);
    
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmit = handleSubmit
  }

  _getInputValues(){
    const inputs =[... this._form.querySelectorAll(".popup__text")];
    const values ={};
    inputs.forEach((input) =>{
      values[input.name] = input.value;
    })
    return values;
  } 

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener("submit",()=> {
      this._handleSubmit(this._getInputValues());
    })
  }

  close(){
    super.close()
    this._form.reset();
  }
}