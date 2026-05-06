describe('Create Student', () => {
  beforeEach(() => {
    cy.login('juanfdoa@hotmail.com','Abc.12345')
    cy.visit('http://localhost:5173/students')
  })

  it('should show error when name is empty', () => {
    cy.get('[data-cy="button-add-student"]').click()

    cy.get('[data-cy="student-lastname"]').type('Test')
    cy.get('[data-cy="student-document"]').type('1234')
    cy.get('[data-cy="student-phone"]').type('3113123107')

    cy.get('[data-cy="button-save-student"]').click()

    cy.contains('El nombre es obligatorio').should('exist')
  })

  it('should show error when lastname is empty', () => {
    cy.get('[data-cy="button-add-student"]').click()

    cy.get('[data-cy="student-name"]').type('Juan')
    cy.get('[data-cy="student-document"]').type('1234')
    cy.get('[data-cy="student-phone"]').type('3113123107')

    cy.get('[data-cy="button-save-student"]').click()

    cy.contains('El apellido es obligatorio').should('exist')
  })

  it('should show error when document is empty', () => {
    cy.get('[data-cy="button-add-student"]').click()

    cy.get('[data-cy="student-name"]').type('Juan')
    cy.get('[data-cy="student-lastname"]').type('Test')
    cy.get('[data-cy="student-phone"]').type('3113123107')

    cy.get('[data-cy="button-save-student"]').click()

    cy.contains('El documento es obligatorio').should('exist')
  })

  it('should show error when phone is empty', () => {
    cy.get('[data-cy="button-add-student"]').click()

    cy.get('[data-cy="student-name"]').type('Juan')
    cy.get('[data-cy="student-lastname"]').type('Test')
    cy.get('[data-cy="student-document"]').type('1234')

    cy.get('[data-cy="button-save-student"]').click()

    cy.contains('El teléfono es obligatorio').should('exist')
  })

  it('should show error when document has letters', () => {
    cy.get('[data-cy="button-add-student"]').click()

    cy.get('[data-cy="student-name"]').type('Juan')
    cy.get('[data-cy="student-lastname"]').type('Test')
    cy.get('[data-cy="student-document"]').type('ABC123')
    cy.get('[data-cy="student-phone"]').type('3113123107')

    cy.get('[data-cy="button-save-student"]').click()

    cy.contains('Solo números').should('exist')
  })

it('should show error when phone is invalid format', () => {
  cy.get('[data-cy="button-add-student"]').click()

  cy.get('[data-cy="student-name"]').type('Juan')
  cy.get('[data-cy="student-lastname"]').type('Test')
  cy.get('[data-cy="student-document"]').type('123456')
  cy.get('[data-cy="student-phone"]').type('ABC12')

  cy.get('[data-cy="button-save-student"]').click()

  cy.contains('Teléfono inválido').should('exist')
})

})