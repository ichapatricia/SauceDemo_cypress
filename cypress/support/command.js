Cypress.Commands.add("loginSession", (username, password) => {
  cy.session([username, password], () => {

    // visit halaman login dulu
    cy.visit(Cypress.env("CYPRESS_CMS_URL") + "/login");

    // jalankan method dari POM
    PageLogin.LoginPage();

    // pastikan login berhasil (ganti sesuai halaman setelah login)
    cy.url().should("include", "/dashboard");

  });
});