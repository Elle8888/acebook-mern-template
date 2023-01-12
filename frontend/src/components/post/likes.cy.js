import LikeButton from './Like'

describe("LikeButton", () => {
    it('increments number of likes by 1 when clicked', () =>{
        cy.
    })
})




import Post from './Post'

describe("Post", () => {
  it('renders a post with a message', () => {
    cy.mount(<Post post={{_id: 1, message: "Hello, world"}} />);
    cy.get('[data-cy="post"]').should('contain.text', "Hello, world")
  })
})



