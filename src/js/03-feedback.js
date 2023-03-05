import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const saveState = () => {
  const state = {
    email: emailInput.value,
    message: messageInput.value
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(state));
};

const loadState = () => {
  const state = JSON.parse(localStorage.getItem('feedback-form-state'));
  if (state) {
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
};

const throttleSaveState = throttle(saveState, 500);

form.addEventListener('input', () => {
  throttleSaveState();
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const state = {
    email: emailInput.value,
    message: messageInput.value
  };
  if (!emailInput.value || !messageInput.value) {
    window.alert("Всі поля повинні бути заповнені");
    return;
  }

  console.log(state);
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
});

loadState();
