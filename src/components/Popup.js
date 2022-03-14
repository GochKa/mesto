export class Popup{
  constructor(popupSelector){
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close")
    this._handleEscClose = this._handleEscClose.bind(this);
    this._popupOpenCLass = "popup_opened";
  }

  open(){
    this._popup.classList.add(this._popupOpenCLass);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close(){
    this._popup.classList.remove(this._popupOpenCLass);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(event){
    if(event.key === "Escape" || event.keyCode === 27){
      this.close()
    }
  }

  setEventListeners(){
    this._popup.addEventListener("click", (event) =>{
      if(event.target.classList.contains(this._popupOpenCLass)){
        this.close()
      }
      if (event.target === this._closeButton){
        this.close();
      }
    })
  }
}