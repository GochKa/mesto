import { Popup } from "../components/Popup.js";

export class PopupWithImag extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    
    this._imageSelector = ".preview-popup__img";
    this._image = this._popup.querySelector(this._imageSelector);

    this._titleSelector = ".preview-popup__title";
    this._title = this._popup.querySelector(this._titleSelector);
  }
  open(text, link){
    this._image.src = link;
    this._title.textContent = text;
    this._image.alt = text;

    super.open();
  }
}
