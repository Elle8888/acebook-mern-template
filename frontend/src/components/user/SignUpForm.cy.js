/* eslint-disable no-unused-expressions */
import SignUpForm from './SignUpForm.js'
const navigate = () => {}

describe('Signing up', () => {

  beforeEach(() => {
    // eslint-disable-next-line no-labels
    cy.mount(<SignUpForm navigate={navigate} />)
    cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')
  })

  it('calls the /users endpoint for valid signup', () => {
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('12345678Ab*')
    cy.get('#submit').click()
    cy.wait('@signUpRequest').then((interception) => {
      expect(interception.response.body.message).to.eq('OK')
    })
  })

  it('requires a valid email address', () => {
    cy.get('#email').type('test')
    cy.get('#password').type('12345678Ab*')
    cy.get('#submit').click()
    cy.wait(1000)
    cy.get('@signUpRequest').should('not.exist')
  })

  it('requires a password with 8 characters', () => {
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('Ab*')
    cy.get('#submit').click()
    cy.wait(1000)
    cy.get('@signUpRequest').should('not.exist')
  })

  it('requires a password with one uppercase letter', () => {
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('12345678b*')
    cy.get('#submit').click()
    cy.wait(10000)
    cy.get('@signUpRequest').should('not.exist')
  })

  it('requires a password with one lowercase letter', () => {
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('12345678A*')
    cy.get('#submit').click()
    cy.wait(1000)
    cy.get('@signUpRequest').should('not.exist')
  })

  it('requires a password with one special character', () => {
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('12345678Ab')
    cy.get('#submit').click()
    cy.wait(1000)
    cy.get('@signUpRequest').should('not.exist')
  })

  it('requires a password with one number', () => {
    cy.get('#email').type('test@test.com')
    cy.get('#password').type('Ab*')
    cy.get('#submit').click()
    cy.wait(1000)
    cy.get('@signUpRequest').should('not.exist')
  })
})