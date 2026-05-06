describe('Student Delete', () => {
  beforeEach(() => {
    cy.login('juanfdoa@hotmail.com','Abc.12345')
    cy.visit('http://localhost:5173/students')
  })

  it('should delete one student', () => {
    cy.get('[data-cy="student-row"]')
      .should('have.length.greaterThan', 0)

    // guardamos cantidad inicial
    cy.get('[data-cy="student-row"]').then(rows => {
        const initialCount = rows.length

        cy.get(':nth-child(1) > .MuiAccordionSummary-root > .MuiAccordionSummary-content').click()  //Abrir primer accordion

        // clic en el primer delete de una fila
        cy.get('[data-cy="student-row"]').first().find('[data-cy="button-delete-student"]').click()

        // confirmar si hay modal
        cy.contains('Sí, eliminar').click()

        cy.contains('El estudiante ha sido eliminado').should('exist')
        cy.get('[data-cy="student-row"]').should('have.length', initialCount - 1)
      })
  })
})