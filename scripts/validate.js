function submitForm(){

}


function showError(input, errorContainer, {inputErrorClass, errorVisibleClass}){
  input.classList.add(inputErrorClass);
  errorContainer.classList.add(errorVisibleClass);
  errorContainer.textContent = input.validationMessage;
}

function hideError(input, errorContainer, {inputErrorClass, errorVisibleClass}){
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorVisibleClass);
  errorContainer.textContent = "";
}

function toggleButton(form, { activeButtonClass, inactiveButtonClass, inputSelector }){
  const button = form.querySelector(activeButtonClass);
  const isFormValidity = form.checkValidity();


  if (isFormValidity){
    button.classList.remove(inactiveButtonClass);
    button.removeAttribute("disabled");
  } else{
    button.classList.add(inactiveButtonClass);
    button.setAttribute("disabled", "true");
  }
}


function validateInput(form, input, classes){
  const errorContainer = form.querySelector(`#error-${input.id}`);  
  if (input.validity.valid){
    hideError(input, errorContainer, classes);
        
  } else {
    showError(input, errorContainer, classes)
  }
    toggleButton(form, classes);
}


function enableValidation({formSelector, inputSelector , ...rest}){
  const forms = document.querySelectorAll(formSelector)


  forms .forEach( (form) => {
    form.addEventListener("submit", submitForm)
    const inputs = form.querySelectorAll(inputSelector);


    inputs.forEach((input) => {
        input.addEventListener("input" , () =>{
        validateInput(form, input, rest);
        })
    })

    toggleButton(form, rest);

    })
} 



enableValidation({
  formSelector: ".input-info",
  inputSelector : ".popup__text",
  errorSelector: ".error-message",
  errorVisibleClass: "error-message_visible",
  inputErrorClass: "popup__text_type_error",
  inactiveButtonClass : "popup__add_disabled",
  activeButtonClass : ".popup__add"
});