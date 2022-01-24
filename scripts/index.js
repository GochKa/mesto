const initialCards = [{
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


const postBlockTemp = document.querySelector("#post-temp").content;

initialCards.forEach(function (info) {
  const postItemTemp = postBlockTemp.querySelector(".post-list__item").cloneNode(true);
  const postList = document.querySelector(".post-list");

  postItemTemp.querySelector(".post-list__photo").src = info.link;
  postItemTemp.querySelector(".post-list__title").textContent = info.name;
  postItemTemp.querySelector(".post-list__title").alt = info.name;

  postList.prepend(postItemTemp);
})

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

const postLike = document.querySelectorAll(".post-list__like");
const postLikeArray = Array.from(postLike);
postLikeArray.forEach((item) => {
  item.addEventListener("click", function (event) {
    const eventTarget = event.target;
    eventTarget.classList.toggle("post-list__like_active");
  })
})

const deletePostButton = document.querySelectorAll(".delete");
const deletePostButtonArray = Array.from(deletePostButton);
deletePostButtonArray.forEach((item) => {
  item.addEventListener("click", function (evt) {
    const evtTar = evt.target.closest(".post-list__item");
    evtTar.remove();
  })
})


//Форма добавления новых карточек
const addForm = document.querySelector(".img");
const imgLink = popupImg.querySelector(".link");
const nameNewPlace = popupImg.querySelector(".nameplace");
const postList = document.querySelector(".post-list");



function addNewPlace(event) {
  event.preventDefault();
  let copyPostTemp = postBlockTemp.querySelector(".post-list__item").cloneNode(true);
  let formNameInfo = document.querySelector(".nameplace");
  let formLinkInfo = document.querySelector(".link");

  let postLikeTemp = copyPostTemp.querySelectorAll(".post-list__like");
  let postDelTemp = copyPostTemp.querySelectorAll(".delete");

  let postImgTemp = copyPostTemp.querySelectorAll(".post-list__photo");

  formLinkInfo = imgLink.value;
  formNameInfo = nameNewPlace.value;


  copyPostTemp.querySelector(".post-list__photo").src = formLinkInfo;
  copyPostTemp.querySelector(".post-list__title").textContent = formNameInfo;

  postList.prepend(copyPostTemp);

  popupImg.classList.remove("popup-img_opened")

  imgLink.value = "";
  nameNewPlace.value = "";


  postLikeTemp.forEach((item) => {
    item.addEventListener("click", function (event) {
      const eventTarget = event.target;
      eventTarget.classList.toggle("post-list__like_active");
    })
  })

  postDelTemp.forEach((item) => {
    item.addEventListener("click", function (evt) {
      const evtTar = evt.target.closest(".post-list__item");
      evtTar.remove();
    })
  })

  postImgTemp.forEach((event) => {
    event.addEventListener("click", function (evt) {
      popupZoom.classList.add("popup-zoom_opened");
      popupZoomImg.src = evt.target.src;
      popupZoomTitle.textContent = postListTitle.textContent;
    })
  })
}

addForm.addEventListener("submit", addNewPlace);



//Открытие zoom'а
const popupZoom = document.querySelector(".popup-zoom");
const postImg = document.querySelectorAll(".post-list__photo");
const postListTitle = document.querySelector(".post-list__title")
const popupZoomImg = document.querySelector(".popup-zoom__img");
const popupZoomTitle = document.querySelector(".popup-zoom__title");
const closePopupZoomButtom = document.querySelector(".popup-zoom__close");


function closePopupZoom() {
  popupZoom.classList.remove("popup-zoom_opened");
}
closePopupZoomButtom.addEventListener("click", closePopupZoom);

postImg.forEach((event) => {
  event.addEventListener("click", function (item) {
    popupZoom.classList.add("popup-zoom_opened");
    popupZoomImg.src = item.target.src;
    popupZoomTitle.textContent = postListTitle.textContent;
  })
})