describe("Nav bar", () => {
    it("redirects to '/signup'", () => {
      cy.visit("/");
      cy.get("#signup-link-nav").click();
  
      cy.url().should("include", "/signup");
    });
  
    it("redirects to '/login'", () => {
        cy.visit("/");
        cy.get("#login-link-nav").click();
    
        cy.url().should("include", "/login");
      });

    it("redirects to '/signup'", () => {
        cy.visit("/");
        cy.get("#posts-link-nav").click();
    
        cy.url().should("include", "/signup");
    });

      // needs login testing
  });