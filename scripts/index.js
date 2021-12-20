/*!Окно редактирования профиля*/
const popupOpenButton = document.querySelector(".edit-button");
const popupCloseButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");




function togglePopup() {
    popup.classList.toggle("popup_opened");
}

function closePopupOnOverlayClick(event) {
    if (event.target === event.currentTarget) {
        popup.classList.remove("popup_opened");
    }

}

popupOpenButton.addEventListener("click", togglePopup);
popupCloseButton.addEventListener("click", togglePopup);
popup.addEventListener("click", closePopupOnOverlayClick);


/*!Кнопка сохранения информации профиля*/

//Текст в профиле
let ProfileName = document.querySelector(".profile__info-title");
let ProfileJob = document.querySelector(".profile__info-subtitle");

//Форма в Popup'е
let popupForm = document.querySelector(".input-info");

//Поля формы
let popupName = document.querySelector(".popup__text");
let popupJob = document.querySelector(".extra");

function profileChange(evt) {
    evt.preventDefault();

    popupName.getAttribute("value");
    popupJob.getAttribute("value");

    let ProfileName = document.querySelector(".profile__info-title");
    let ProfileJob = document.querySelector(".profile__info-subtitle");

    ProfileName.textContent = (popupName.value);
    ProfileJob.textContent = (popupJob.value);
}

popupForm.addEventListener('submit', profileChange); 