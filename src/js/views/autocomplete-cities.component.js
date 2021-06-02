export const autocompleteInput = ".autocomplete-cities";
const autocompleteContainer = ".autocomplete-container";

export class AutocompleteCitiesComponent {
  inputElement;
  citiesArr;

  constructor(inputElement, cities) {
    this.inputElement = inputElement;
    this.citiesArr = this.createCitiesArr(cities);
    this.init();
  }

  init() {
    this.container = this.inputElement.parentElement.querySelector(autocompleteContainer);

    if (!this.container) {
      const error = `${AutocompleteCitiesComponent.name}: Can't find sibling element "${autocompleteContainer}"`;
      throw new Error(error);
    }

    this.inputElement.addEventListener("input", this.inputListener.bind(this));

    this.container.addEventListener("click", e => {
      this.inputElement.value = e.target.textContent;
      this.closeAllLists();
    });
  }

  inputListener(event) {
    let val = this.inputElement.value;

    this.closeAllLists();
    if (!val) {
      return;
    }

    let fragment = "";

    this.citiesArr.forEach(cityItem => {
      if (cityItem.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        const template = this.renderAutocompleteTemplate(cityItem);
        fragment += template;
      }
    });

    this.showAllLists();
    this.container.innerHTML = fragment;
  }

  closeAllLists() {
    this.container.innerHTML = "";
    this.container.classList.remove("block");
    this.container.classList.add("hidden");
  }

  showAllLists() {
    this.container.classList.remove("hidden");
    this.container.classList.add("block");
  }

  renderAutocompleteTemplate(cityItem) {
    return `<span class="text-gray-700 block px-4 py-2 text-sm 
                          cursor-pointer hover:bg-gray-100 hover:text-purple-900"
                     role="menuitem" tabindex="-1">${cityItem}</span>`;
  }

  createCitiesArr(cities) {
    return Object.keys(cities);
  }

  getValue() {
    return this.inputElement.value;
  }
}
