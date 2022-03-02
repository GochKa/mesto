import {Popup} from "./Popup.js"

class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this._image = this._popupSelector.querySelector(".preview-popup__img");
    this._name = this._popupSelector.querySelector(".preview-popup__title");
  }

  open(name, link){
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._name.textContent = name;
  }

}

export default PopupWithImage