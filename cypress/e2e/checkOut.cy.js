//import NamaClass from ../../support/POM/namaPage.js

import LoginPage from '../support/POM/loginPage'
import InventoryPage from '../support/POM/inventoryPage'
import CheckoutPage from '../support/POM/checkoutPage'

describe('Data Driven - CheckOut Feature', ()=>{
    
    
    let loginData
    let formCo

    const loginPage = new LoginPage()
    const inventoryPage = new InventoryPage()
    const checkoutPage = new CheckoutPage()

    // Load Fixture
    before(() => {
        cy.fixture('user/loginUsers').then((data) =>{
            loginData = data
        })
        cy.fixture('user/form_checkOut').then((data) => {
            formCo = data
        })
    })

    // LOGIN sebagai precondition
    beforeEach(()=>{
        loginPage.visit()
        const { user_name, password } = loginData.validLogin
        loginPage.login(user_name, password)
        loginPage.verifyLoginSuccess()

        const { firstName, lastName, postalCode } = formCo.dataCo
    })

    it('TC_CO_01 - Succesfull Checkout 2 Items',()=>{
        //assertion : (/inventory.html) page
        cy.url().should('include','/inventory.html')

        //Pilih 2 item random
        inventoryPage.addRandomProduct(2)

        inventoryPage.goToCart()
        cy.url().should('include','/cart.html')

        checkoutPage.checkoutButton.click()

        checkoutPage.fillCheckoutForm(
            //isikan data dari fixtures ["ID"]
            formCo.dataCo["firstName"],
            formCo.dataCo["lastName"],
            formCo.dataCo["postalCode"]
        )

        checkoutPage.continueButton.click()

        //Finish
        checkoutPage.finishButton.click()

        //Assertion
        checkoutPage.verifyCheckoutSuccess()
    })
})