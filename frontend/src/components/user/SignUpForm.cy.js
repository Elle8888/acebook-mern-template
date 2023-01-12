import SignUpForm from './SignUpForm.js'
const navigate = () => {}

describe('Signing up', () => {
  it('calls the /users endpoint', () => {
    cy.mount(<SignUpForm navigate={navigate} />)

    cy.intercept('POST', '/users', { message: 'OK' }).as('signUpRequest')

    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()
    cy.wait('@signUpRequest').then((interception) => {
      expect(interception.response.body.message).to.eq('OK')
    })
  })
})

// it('requires a valid email address', () => {})

// it('requires a password with 8 characters', () => {})

// it('requires a password with one uppercase letter', () => {})

// it('requires a password with one lowercase letter', () => {})

// it('requires a password with one special character', () => {})

// it('requires a password with one number', () => {})

// it('redirects to login for successful signup', () => {})
