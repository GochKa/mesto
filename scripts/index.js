/*!Окно редактирования профиля*/
const popupOpenButton = document.querySelector(".edit-button");
const popupCloseButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

const popupSaveForm = document.querySelector(".input-info");

function togglePopup() {
    popup.classList.toggle("popup_opened");
}

function closePopupOnOverlayClick(event) {
    if (event.target === event.currentTarget)  {
        popup.classList.remove("popup_opened");
    }
}

function popupSaveOnEdit(){
    popup.classList.remove("popup_opened");
}


popupSaveForm.addEventListener("submit", popupSaveOnEdit);

popupOpenButton.addEventListener("click", togglePopup);
popupCloseButton.addEventListener("click", togglePopup);
popup.addEventListener("click", closePopupOnOverlayClick);

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
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;

}


popupOpenButton.addEventListener("click", popupCopy)
