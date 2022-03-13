import { Popup } from "../Class/Popup.js";

export class PopupWithImag extends Popup{
  open(text, link){
    const image = this._popup.querySelector(".preview-popup__img");
    const title = this._popup.querySelector(".preview-popup__title");

    image.src=link;
    title.textContent=text;

    super.open();
  }
}

//preview-popup__img
//preview-popup__title