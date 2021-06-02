class Favorites {
  constructor() {
    this.ticketsContainer = document.querySelector(".tickets-sections");
    this.init();
  }

  init() {
    console.log("init favorites");
    this.ticketsContainer.addEventListener("click", e => {
      console.log("click add to favourites");
    });
  }
}

const favorites = new Favorites();
export default favorites;
