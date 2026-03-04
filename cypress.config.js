const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer"); //--> Tambahkan ini

module.exports = defineConfig({
  allowCypressEnv: true,
  projectId: "skncad",

  e2e: {
  //--Tambahkan Baris ini ke dalam Kode--
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: true,
      json: true,
    },
   //------------------------------------
    baseUrl: 'https://saucedemo.com',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      allureWriter(on, config); //--> Tambahkan ini
      return config; //--> Tambahkan ini
    },
  },
});
