describe("Buscando os dados para preenchimento dos selects", () => {
  it("Acessando o site e fazendo o teste inicial", () => {
    cy.visit("http://localhost:3000");

    cy.get('[data-testid="selectMarca"]').click();
    cy.wait(2000);
    cy.contains("Fiat").click();
    cy.get('[data-testid="selectMarca"]').should("contain", "Fiat");
    cy.wait(2000);

    cy.get('[data-testid="selectModelo"]').click();
    cy.wait(2000);
    cy.contains("Toro Freedom 2.4 16V Flex Aut.").click();
    cy.get('[data-testid="selectModelo"]').should(
      "contain",
      "Toro Freedom 2.4 16V Flex Aut."
    );

    cy.get('[data-testid="selectAno"]').click();
    cy.wait(2000);
    cy.contains("2018 Gasolina").click();
    cy.get('[data-testid="selectAno"]').should("contain", "2018 Gasolina");
    cy.wait(2000);

    cy.get('[data-testid="btnBusca"]').click();
  });
});
