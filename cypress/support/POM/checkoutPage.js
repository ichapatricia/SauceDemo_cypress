class CheckoutPage{

    get checkoutButton(){
        return cy.get('[data-test="checkout"]')
    }

    get firstNameField(){
        return cy.get('#first-name')
    }

    get lastNameField(){
        return cy.get('#last-name')
    }

    get postalCodeField(){
        return cy.get('#postal-code')
    }
    get continueButton(){
        return cy.get('#continue')
    }
    get finishButton(){
        return cy.get('#finish')
    }

    fillCheckoutForm(firstName, lastName,postalCode){
        cy.get('#first-name').clear().type(firstName)
        cy.get('#last-name').clear().type(lastName)
        cy.get('#postal-code').clear().type(postalCode)
    }

    completeCheckout(){
        this.finishButton.click()
    }

    verifyCheckoutSuccess(){
        cy.contains('Thank you for your order!')
        cy.url().should('include','/checkout-complete.html')
    }
}
export default CheckoutPage