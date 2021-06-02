import currencyUI from "./currency";

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-sections");
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  renderTickets(tickets) {
    console.log("renderTickets:", tickets);
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";
    const currency = this.getCurrencySymbol();

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgTemplate() {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу билетов не найдено.
    </div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
      <div class="p-2 md:w-1/2 w-full">
        <div class="h-full border-gray-200 border p-4 rounded-lg bg-white">
          <div class="text-gray-500 text-base">
            <img alt="${ticket.airline_logo}" class="w-12 h-12 inline mr-6" 
            src="${ticket.airline_logo}">     
            <span>Рейс № ${ticket.flight_number}</span>  
            <span>${ticket.airline_name}</span>  
          </div>
            <h2 class="my-4 flex text-gray-700 pb-2 border-gray-300 title-font font-medium border-b border-dotted">
              <span class='inline'>
                ${ticket.origin_name}
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                stroke-linejoin="round" class="feather feather-arrow-up-right inline">
                <line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
              <span class='ml-auto'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                stroke-linejoin="round" class="feather feather-arrow-down-right inline">
                <line x1="7" y1="7" x2="17" y2="17"></line><polyline points="17 7 17 17 7 17"></polyline>
              </svg>
                ${ticket.destination_name}
              </span>
            </h2>
            <div class='flex'>
              <div>
                <p class="text-gray-500">${ticket.departure_at}</p>
                <p class="text-gray-500">Пересадок: ${ticket.transfers}</p>
              </div>
              <div class='ml-auto self-start px-4 bg-purple-50 text-purple-900'>${currency}${ticket.price}</div>
            </div>
            <p class='mt-3'>
              <button 
                class='ml-auto flex items-center text-white bg-purple-400 border-0 py-2 px-5 
                focus:outline-none hover:bg-purple-600 rounded text-base'>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span class='ml-3'>Add to Favorites</span>
              </button>
            </p>
        </div>
      </div>
    `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
