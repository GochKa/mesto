/*!Окно редактирования профиля*/
const popupOpenButton = document.querySelector(".edit-button");
const popupCloseButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");


function togglePopup() {
    popup.classList.toggle("popup_opened");
}

function closePopupOnOverlayClick(event) {
    if (event.target === event.currentTarget)  {
        popup.classList.remove("popup_opened");
    }
}

function popopCloseOnKey(e){
    if (e.key === "Enter"){
        popup.classList.remove("popup_opened");
    }
}

popupOpenButton.addEventListener("click", togglePopup);
popupCloseButton.addEventListener("click", togglePopup);
popup.addEventListener("click", closePopupOnOverlayClick);
popup.addEventListener("keydown", popopCloseOnKey);

/*!Кнопка сохранения информации профиля*/

//Текст в профиле
let profileName = document.querySelector(".profile__info-title");
let profileJob = document.querySelector(".profile__info-subtitle");

//Форма в Popup'е
let popupForm = document.querySelector(".input-info");

//Поля формы
let popupName = document.querySelector(".popup__text");
let popupJob = document.querySelector(".extra");

function profileChange(evt) {
    evt.preventDefault();

    profileName.textContent = popupName.value;
    profileJob.textContent = popupJob.value;
}

popupForm.addEventListener('submit', profileChange); 

//Копирование данных из профиля в Popup

function popupCopy(){
    let profileNameCopy = document.querySelector(".profile__info-title").textContent;
    let profileJobCopy = document.querySelector(".profile__info-subtitle").textContent;
    
    popupName.value = profileNameCopy;
    popupJob.value = profileJobCopy;
}

popupOpenButton.addEventListener("click", popupCopy)
