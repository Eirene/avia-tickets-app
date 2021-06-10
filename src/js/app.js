import locations from "./store/locations";
import favorites from "./store/favorites";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import { autocompleteInput, AutocompleteCitiesComponent } from "./views/autocomplete-cities.component";

//Login
import UILogin from "./config/ui-login.config";
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/formLogin';
import { login } from './services/auth.service';
import { notify } from './views/notifications';

locations.init().then(res => {
  // console.log(res);
  // console.log(locations);
  // console.log(locations.getCitiesByCountryCode('PE'));
});

document.addEventListener("DOMContentLoaded", e => {
  // Events
  void initApp();

  const form = formUI.form;
  form.addEventListener("submit", e => {
    e.preventDefault();
    onFormSubmit();
  });

  const { formLogin, inputEmailLogin, inputPasswordLogin } = UILogin;
  const inputsLogin = [inputEmailLogin, inputPasswordLogin];
  formLogin.addEventListener("submit", e => {
    e.preventDefault();
    onFormLoginSubmit();
  });
  inputsLogin.forEach(el => el.addEventListener('focus', () => removeInputError(el)));



  async function initApp() {
    await locations.init();
    await favorites.init();
    const cities = locations.shortCities;
    document.querySelectorAll(autocompleteInput).forEach(inputElement => {
      new AutocompleteCitiesComponent(inputElement, cities);
    });
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart = formUI.departDateValue.slice(0, 7);
    const returnDate = formUI.returnDateValue.slice(0, 7);
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart,
      returnDate,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }

  async function onFormLoginSubmit() {
    const isValidFormLogin = inputsLogin.every(el => {
      const isValidInputLogin = validate(el);
      if (!isValidInputLogin) {
        showInputError(el);
      }
      return isValidInputLogin;
    });

    if (!isValidFormLogin) return;

    try {
      await login(inputEmailLogin.value, inputPasswordLogin.value);
      formLogin.reset();
      notify({ msg: 'Login success', className: 'bg-green-300 text-green-900', timeout: 3000 });
    } catch (err) {
      notify({ msg: 'Login failed', className: 'bg-red-300 text-red-900', timeout: 3000 });
    }
  }
});
