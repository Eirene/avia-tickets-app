describe('Form', () => {
  it('When visiting the home page, the form is visible', () => {
    cy.visit('http://localhost:8000/')
    cy.get('[data-cy=mainForm]').should('be.visible')
  })

  it('When typing a value into origin city autocomplete, ' +
    'this autocomplete is visible and has typed value', () => {
    cy.get('[data-cy=autocompleteOrigin]').as('autocompleteOrigin')
    cy.get('@autocompleteOrigin').should('be.visible')
    cy.get('@autocompleteOrigin').type('Москва')
    cy.get('@autocompleteOrigin').should('have.value', 'Москва')
  })

  it('When typing a value into destination city autocomplete, ' +
    'this autocomplete is visible and has typed value', () => {
    cy.get('[data-cy=autocompleteDestination]').as('autocompleteDestination')
    cy.get('@autocompleteDestination').should('be.visible')
    cy.get('@autocompleteDestination').type('Афины')
    cy.get('@autocompleteDestination').should('have.value', 'Афины')
  })

  it('When selecting the currency from the header dropdown ' +
    'it should be changed and visible in the header', () => {
    cy.get('[data-cy=currencySelect]').as('currencySelect')
    cy.get('@currencySelect').select('EUR')
    cy.get('@currencySelect').should('have.value', 'EUR')
  })

})