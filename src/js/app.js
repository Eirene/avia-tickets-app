import locations from "./store/locations";
import favorites from "./store/favorites";
import formUI from "./views/form";
import ticketsUI from "./views/tickets";
import currencyUI from "./views/currency";
import { autocompleteInput, AutocompleteCitiesComponent } from "./views/autocomplete-cities.component";

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

    console.log("Form:", origin, destination, depart, returnDate);
    await locations.fetchTickets({
      origin,
      destination,
      depart,
      returnDate,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);
  }
});
