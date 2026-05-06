describe('Login', () => {
  it('should login successfully', () => {
    cy.visit('http://localhost:5173/login')

   // Buscar inputs
    cy.get('[data-cy="input-email"]').type('juanfdoa@hotmail.com')
    cy.get('[data-cy="input-password"]').type('Abc.12345')

    // Click en buscar
    cy.get('[data-cy="button-login"]').click()
  })
})