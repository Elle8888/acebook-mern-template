import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })
  it('toggles the comments display', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world", comments: ['one', 'two']}} />);
    cy.get('[data-cy="toggle-btn"]').click()
    cy.get('[data-cy="post"]').should('contain.text', "two")
    cy.get('[data-cy="toggle-btn"]').click()
    cy.get('[data-cy="post"]').should('not.contain.text', "two")
  })
})
