const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];





/*!Окно редактирования профиля*/
const popupOpenButton = document.querySelector(".edit-button");
const popupCloseButton = document.querySelector(".popup__close");
const popup = document.querySelector(".popup");

const popupSaveForm = document.querySelector(".input-info");

function togglePopup() {
    popup.classList.toggle("popup_opened");
}

function closePopupOnOverlayClick(event) {
    if (event.target === event.currentTarget) {
        popup.classList.remove("popup_opened");
    }
}

function popupSaveOnEdit() {
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

function popupCopy() {
    popupName.value = profileName.textContent;
    popupJob.value = profileJob.textContent;

}


popupOpenButton.addEventListener("click", popupCopy)



//Окно добавления нового места

const popupImg = document.querySelector(".popup-img");
const popupImgOpenBottun = document.querySelector(".add-bottun");
const popupImgCLoseButton = document.querySelector(".blocked");

function popupImgToggle() {
    popupImg.classList.toggle("popup-img_opened");
}


popupImgOpenBottun.addEventListener("click", popupImgToggle);
popupImgCLoseButton.addEventListener("click", popupImgToggle);


//Кнопка лайка

const postLike = document.querySelectorAll(".post-list__like")

postLike.forEach( (item) => {
    item.addEventListener("click", function(event){
        const eventTarget = event.target;
        eventTarget.classList.toggle("post-list__like_active");
    })
})


//const postBlock = document.querySelector(".post-list__item").cloneNode(true);
//console.log(postBlock);

//const postList = document.querySelector(".post-list");
//console.log(postList);

//postList.append(postBlock);

const deletePostButton = document.querySelectorAll(".delete");
console.log(deletePostButton)

deletePostButton.forEach( (item) => {
    item.addEventListener("click", function(evt){
        const evtTar = evt.target.closest(".post-list__item"); 
        evtTar.remove();
    })
})

