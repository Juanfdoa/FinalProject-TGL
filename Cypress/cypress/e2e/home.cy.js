describe('Search student', () => {
  it('should search a student', () => {
    cy.visit('http://localhost:5173/')

    // Buscar el input
    cy.get('[data-cy="input-search"]').type('761')

    // Click en buscar
    cy.get('[data-cy="button-search"]').click()
  })
})