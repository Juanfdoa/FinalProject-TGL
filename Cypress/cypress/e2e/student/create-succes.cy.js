import { faker } from '@faker-js/faker'

describe('Create Student', () => {
  beforeEach(() => {
    cy.login('juanfdoa@hotmail.com','Abc.12345')
    cy.visit('http://localhost:5173/students')
  })

  it('Should Create student', () => {
    cy.get('[data-cy="button-add-student"]').click()

    cy.get('[data-cy="student-name"]').type(faker.person.firstName())
    cy.get('[data-cy="student-lastname"]').type(faker.person.lastName())
    cy.get('[data-cy="student-document"]').type(faker.number.int({ min: 1000000, max: 99999999 }).toString())
    cy.get('[data-cy="student-phone"]').type(
      faker.number.int({ min: 3000000000, max: 3999999999 }).toString()
    )

    cy.get('[data-cy="button-save-student"]').click()
    cy.contains('El estudiante ha sido agregado correctamente').should('exist')
  })

})