import Feed from './Feed'
import Post from '../post/Post'
const navigate = () => {}

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken")


    cy.intercept('GET', '/posts', (req) => {
      req.reply({
        statusCode: 200,
        body: [
          {
            author: "email@email.com",
            comments: ['63c56b3ef403aa960a2a0c66', '63c56be2c9381597f415cc88'],
            date: "16/01/2023, 15:20:18",
            likes: 1,
            message: "a post",
            _id: "63c56b32f403aa960a2a0c5d",
          },
          {
            author: "email@email.com",
            comments: ['63c56b3ef403aa960a2a0c66', '63c56be2c9381597f415cc88'],
            date: "16/01/2023, 15:20:18",
            likes: 1,
            message: "a post",
            _id: "63c56b32f403aa960a2a0c5d",
          }
        ]
      })
    }
  ).as("getPosts")

  cy.mount(<Feed navigate={navigate}/>)
  cy.mount(<Post />)

    
    cy.wait("@getPosts").then(() =>{
      cy.get('[data-cy="post"]')
      .should('contain.text', "Hello, world")
      .and('contain.text', "Hello again, world")
    })
  })
})
