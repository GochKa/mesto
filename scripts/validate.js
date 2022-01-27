function submitForm(event){
    event.preventDefault();

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


function validateInput(form, input, classes){
    const errorContainer = form.querySelector(`#error-${input.id}`);
    console.log(input.validationMessage)
    
    if (input.validity.valid){
        hideError(input, errorContainer, classes)
    } else {
        showError(input, errorContainer, classes)
    }
}


function enableValidation({formSelector, inputSelector , ...rest}){
    const forms = document.querySelectorAll(formSelector)
    console.log(forms);

    forms .forEach( (form) => {
        form.addEventListener("submit", submitForm)
        const inputs = form.querySelectorAll(inputSelector);
        console.log(inputs);

        inputs.forEach((input) => {
            input.addEventListener("input" , () =>{
                validateInput(form, input, rest);
            })
        })
    })
} 

enableValidation({
    formSelector: '.input-info',
    inputSelector : '.popup__text',
    errorSelector: ".error-message",
    errorVisibleClass: "error-message_visible",
    inputErrorClass: "popup__text_type_error",
  });