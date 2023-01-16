describe('Nav bar', () => {
  before(() => {
    cy.signup('user@email.com', '12345678Aa*')
    cy.visit('/login')
    cy.get('#email').type('someone@example.com')
    cy.get('#password').type('password')
    cy.get('#submit').click()
  })

  it("redirects to '/posts'", () => {
    cy.visit('/posts')
    cy.get('#posts-link-nav').click()

    cy.url().should('include', '/posts')
  })

  it("redirects to '/signup'", () => {
    cy.visit('/posts')
    cy.get('#signup-link-nav').click()

    cy.url().should('include', '/signup')
  })

  it("redirects to '/login'", () => {
    cy.visit('/posts')
    cy.get('#login-link-nav').click()

    cy.url().should('include', '/login')
  })
})
