import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
const formData = {};

updateForm();

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);



function onFormInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(event) {
    if (form.email.value.length == 0 || form.message.value.length == 0)
      alert("Все поля должны быть заполнены")
  event.preventDefault();
  event.currentTarget.reset();
  console.log(formData);
  localStorage.removeItem(STORAGE_KEY);
  formData.email = "";
  formData.message = "";
}

function updateForm() {
  
  let saveInput = localStorage.getItem(STORAGE_KEY);
  if (saveInput) {
    const { email, message } = JSON.parse(saveInput);
    form.email.value = email;
    form.message.value = message;
    formData.email = email;
    formData.message = message;
    
  }
}