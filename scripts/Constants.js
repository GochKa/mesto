export const formValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text",
  errorSelector: ".error-message",
  errorVisibleClass: "error-message_visible",
  inputErrorClass: "popup__text_type_error",
  inactiveButtonClass: "popup__add_disabled",
  activeButtonClass: ".popup__add"
};


export const initialCards = [{
  name: 'Река Ли, Китай',
  link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_0c55afbdfda1cfd00bea35e96b4dfb25.jpg'
},
{
  name: 'Горы Тяньцзи, Китай',
  link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_f436509ef066bf8709a18b4249482acc.jpg'
},
{
  name: 'Долина Йосемити, США',
  link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_59c3c2e868a84654118af91efc201229.jpg'
},
{
  name: 'Мачу-Пикчу, Перу',
  link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_4f7f27067bc0f9250078b361014720f6.jpg'
},
{
  name: 'Шондонг, Вьетнам',
  link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_abf27fe402a0a23d562d45fc0b637142.jpg'
},
{
  name: 'Гейрангер-фьорд, Норвегия',
  link: 'https://cameralabs.org/media/camera/aprel/23aprel/23_44622a18dda9f72bee0e798a9fcc9f5c.jpg'
}
];


export const postBlockTemp = document.querySelector("#post-temp").content;
export const postList = document.querySelector(".post-list");
export const popupPreview = document.querySelector(".preview-popup");
export const popupPreviewImg = document.querySelector(".preview-popup__img");
export const popupPreviewTitle = document.querySelector(".preview-popup__title");


//Константы для popup'ов
export const popupProfile = document.querySelector(".profile-popup");
export const popupAdd = document.querySelector(".add-popup");

//Кнопки открытия popup'ов
export const popupProfileOpenButton = document.querySelector(".edit-button");
export const popupAddNewPlaceButton = document.querySelector(".add-bottun");

//Кнопки закрытия popup'ов
export const popupCloseButton = document.querySelector(".popup__close");
export const popupAddCloseButton = document.querySelector(".close-add-form")
export const popupPreviewCLoseButton = document.querySelector(".button-close-preview-popup");

export const cardTemplateSelector = "#post-temp";


//Формы 
export const editForm = document.querySelector(".popup__form-profile");
export const addCardForm = document.querySelector(".popup__form-add-card");


//Текст в профиле
export const profileName = document.querySelector(".profile__info-title");
export const profileJob = document.querySelector(".profile__info-subtitle");

//Поля формы
export const popupProfileName = document.querySelector(".popup__text");
export const popupProfileJob = document.querySelector(".profession");

//Форма добавления новой карточки
export const addForm = document.querySelector(".form-add-card");

//Поля формы добавления 
export const addFormName = document.querySelector(".name-place");
export const addFormLink = document.querySelector(".link");

//Кнопка в форме добавления карточки
export const addNewPostButton = document.querySelector(".button-add-card");