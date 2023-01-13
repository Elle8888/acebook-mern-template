/* eslint-disable no-unused-expressions */
import SignUpForm from './SignUpForm.js'
const navigate = () => {}

// describe('Signing up', () => {

//   // before(() => {
//   //   // eslint-disable-next-line no-labels
//   //   cy.mount(<SignUpForm navigate={navigate} />)
//   //   cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')
//   // })

//   it('calls the /users endpoint', () => {
//     cy.mount(<SignUpForm navigate={navigate} />)

//     cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')

//     cy.get('#email').type('test@test.com')
//     cy.get('#password').type('12345678Ab*')
//     cy.get('#submit').click()
//     cy.wait('@signUpRequest').then((interception) => {
//       expect(interception.response.body.message).to.eq('OK')
//     })
//   })


//   it('requires a valid email address', () => {
//     cy.mount(<SignUpForm navigate={navigate} />)
//     cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')
//     cy.get('#email').type('test')
//     cy.get('#password').type('12345678Ab*')
//     cy.get('#submit').click()
//     cy.wait('@signUpRequest').then((interception) => {
//       expect(interception.response.body.message).to.eq('Enter a valid email')
//     })
//   })

//   it('requires a password with 8 characters', () => {
//     cy.mount(<SignUpForm navigate={navigate} />)
//     cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')
//     cy.get('#email').type('test@test.com')
//     cy.get('#password').type('Ab*')
//     cy.get('#submit').click()
//     cy.wait('@signUpRequest').then((interception) => {
//       expect(interception.response.body.message).to.eq('Password must be at least 8 characters, with at least one uppercase & lowercase letters, character and number')
//     })
//   })

//   it('requires a password with one uppercase letter', () => {
//     cy.mount(<SignUpForm navigate={navigate} />)
//     cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')
//     cy.get('#email').type('test@test.com')
//     cy.get('#password').type('12345678b*')
//     cy.get('#submit').click()
//     cy.wait('@signUpRequest').then((interception) => {
//       expect(interception.response.body.message).to.eq('Password must be at least 8 characters, with at least one uppercase & lowercase letters, character and number')
//     })
//   })

//   it('requires a password with one lowercase letter', () => {
//     cy.mount(<SignUpForm navigate={navigate} />)
//     cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')
//     cy.get('#email').type('test@test.com')
//     cy.get('#password').type('12345678A*')
//     cy.get('#submit').click()
//     cy.wait('@signUpRequest').then((interception) => {
//       expect(interception.response.body.message).to.eq('Password must be at least 8 characters, with at least one uppercase & lowercase letters, character and number')
//     })
//   })

//   it('requires a password with one special character', () => {
//     cy.mount(<SignUpForm navigate={navigate} />)
//     cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')
//     cy.get('#email').type('test@test.com')
//     cy.get('#password').type('12345678Ab')
//     cy.get('#submit').click()
//     cy.wait('@signUpRequest').then((interception) => {
//       expect(interception.response.body.message).to.eq('Password must be at least 8 characters, with at least one uppercase & lowercase letters, character and number')
//     })
//   })

//   it('requires a password with one number', () => {
//     cy.mount(<SignUpForm navigate={navigate} />)
//     cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')
//     cy.get('#email').type('test@test.com')
//     cy.get('#password').type('Ab*')
//     cy.get('#submit').click()
//     cy.wait('@signUpRequest').then((interception) => {
//       expect(interception.response.body.message).to.eq('Password must be at least 8 characters, with at least one uppercase & lowercase letters, character and number')
//     })
//   })

//   it('redirects to login for successful signup', () => {
//     cy.mount(<SignUpForm navigate={navigate} />)
//     cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')
//     cy.get('#email').type('test@test.com')
//     cy.get('#password').type('Ab*')
//     cy.get('#submit').click()
//     cy.url().should('include', '/posts')
//   })
// })

describe('SignUpForm', () => {
  beforeEach(() => {
    cy.visit('/signup')
    cy.get('#email').as('emailInput')
    cy.get('#password').as('passwordInput')
    cy.get('#submit').as('submitButton')
  })

  it('displays an error message when an invalid email is entered', () => {
    cy.get('@emailInput').type('invalidemail')
    cy.get('@passwordInput').type('validpassword')
    cy.get('@submitButton').click()
    cy.get('.error-msg').contains('Enter a valid email')
  })

  it('displays an error message when an invalid password is entered', () => {
    cy.get('@emailInput').type('valid@email.com')
    cy.get('@passwordInput').type('short')
    cy.get('@submitButton').click()
    cy.get('.error-msg').contains(
      'Password must be at least 8 characters, with at least one uppercase & lowercase letters, character and number',
    )
  })

  it('submits the form and redirects to the login page when valid email and password are entered', () => {
    cy.server()
    cy.route({
      method: 'POST',
      url: '/users',
      status: 201,
      response: {},
    }).as('submitForm')

    cy.get('@emailInput').type('valid@email.com')
    cy.get('@passwordInput').type('validpassword')
    cy.get('@submitButton').click()

    cy.wait('@submitForm')
    cy.url().should('include', '/login')
  })
})
