//Функции кнопок popup'ов
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closePopupOnOverlay);
  document.addEventListener("keydown", closePopupKeyHandler);
};

export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.removeEventListener("mousedown", closePopupOnOverlay);
  document.removeEventListener("keydown", closePopupKeyHandler);
};

export function closePopupOnOverlay(evt){
  if (evt.target === evt.currentTarget){
    closePopup(evt.target);

  }
}

export function closePopupKeyHandler(event){
  if(event.key === "Escape" || event.keyCode === 27){
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
    clearErrorMessage()
  }
}

export function clearErrorMessage(){
  const errorFirts = document.querySelector("#error-first");
  const errorProf = document.querySelector("#error-profession");
  const errorPlace = document.querySelector("#error-place");
  const errorLink = document.querySelector("#error-link");
  const popupRedBorder = document.querySelectorAll(".popup__text");

  errorFirts.textContent= "";  
  errorProf.textContent = "";
  errorPlace.textContent = "";
  errorLink.textContent = "";
  
  popupRedBorder.forEach( (input) =>{
    input.classList.remove("popup__text_type_error");
  })
}


