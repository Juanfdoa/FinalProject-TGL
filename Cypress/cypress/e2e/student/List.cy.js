describe('Student List', () => {
  beforeEach(() => {
    cy.login('juanfdoa@hotmail.com','Abc.12345')
    cy.visit('http://localhost:5173/students')
  })

  it('should read students', () => {
    cy.get('[data-cy="student-row"]').should('have.length.greaterThan', 0)
  })

})
