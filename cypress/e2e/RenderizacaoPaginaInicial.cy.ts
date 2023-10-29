describe("Acessando página inicial", () => {
  it("Acessando o site e fazendo o teste inicial", () => {
    cy.viewport(1920, 1080);
    cy.visit("http://localhost:3000");
  });
});
