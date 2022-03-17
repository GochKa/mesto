import { Popup } from "../components/Popup.js";

export class PopupWithForm extends Popup{
  constructor(popupSelector, handleSubmit){
    super(popupSelector);
    
    this._form = this._popup.querySelector(".popup__form");
    this._inputs =[... this._form.querySelectorAll(".popup__text")]
    this._handleSubmit = handleSubmit
  }

  _getInputValues(){
    const values ={};
    this._inputs.forEach((input) =>{
      values[input.name] = input.value;
    })
    return values;
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