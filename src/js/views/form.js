class FormUI {
  constructor() {
    this.$form = document.forms["locationControls"];
    this.origin = this.$form.elements["origin"];
    this.destination = this.$form.elements["destination"];
    this.depart = this.$form.elements["depart"];
    this.returnDate = this.$form.elements["returnDate"];
  }

  get form() {
    return this.$form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    // return this.depart.toString();
    return this.depart.value;
  }

  get returnDateValue() {
    // return this.returnDate.toString();
    return this.returnDate.value;
  }
}

const formUI = new FormUI();

export default formUI;
