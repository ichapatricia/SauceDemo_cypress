describe('Basic Selector & Actions - Sauce Dem0',() =>{

    //1. Visit Page
    describe('1. Visit Page',()=>{
        it('SHould visit the page',()=>{
            cy.visit('https://www.saucedemo.com/')
            cy.url().should('include','saucedemo.com')
        })

        it('should visit the inventory page (after login)',()=>{
            cy.visit('https://www.saucedemo.com/')
            cy.get('[name="user-name"]').type('standart_user')
            cy.get('[name="password"]').type('secret_sauce')
            cy.get('[name="login-button"]').click()
            // cy.location('pathname').should('eq','/inventory.html')
        })

        it('should visit the card page (after login)',()=>{
            cy.visit('https://www.saucedemo.com/')
            cy.get('#user-name').type('standard_user')
            cy.get('#password').type('secret_sauce')
            cy.get('#login-button').click()
            cy.get('.shopping_cart_link').click()
            cy.url().should('eq','https://www.saucedemo.com/cart.html')
        })

    })

    //2. Cy.get mengambil element

    describe('Basic Selector & Actions - Sauce Demo', () => {

        beforeEach(() => {
                cy.visit('https://www.saucedemo.com/');
        })

        it('get element by ID -> #user-name', () => {
                cy.get('#user-name').should('exist');
        })

        it('get element by Class -> .login_container', () => {
                cy.get('.login_container').should('be.visible');
        })

        it('get element by Tag -> input', () => {
                cy.get('input').should('exist');
        })

        it('get element by Attribute -> input[type="password"]', () => {
                cy.get('[type="password"]').should('exist');
        })

        it('get element by Combined selector -> input#user-name', () => {
                cy.get('input#user-name').should('exist');
        })
            
        it('get element by Text -> cy.contains', () => {
                cy.contains('Swag Labs').should('be.visible');
                cy.contains('Login').should('exist');
        })
            
            
    })

    // 3. Type Text - Mengetik Input Field
    describe('3. Type Text - Mengetik di Input Field', () => {
        beforeEach(() => {
                cy.visit('https://www.saucedemo.com/');
        })


        it('Should type username into username field', () => {
                cy.get('#user-name').type('standard_user')
                .should('have.value', 'standard_user');
        })

        it('Should type password into password field', () => {
                cy.get('#password').type('secret_sauce')
                .should('have.value', 'secret_sauce');
        })

        it('Should clear field and retype username', () => {
            cy.get('#user-name').clear()
            .type('standard_user')
            .should('have.value', 'standard_user');
        })

         it('Should clear field and retype password', () => {
            cy.get('#password').clear()
            .type('secret_sauce')
            .should('have.value', 'secret_sauce');
        })
    })

    //4.  CLICK
    describe('4. Click - Klik Element', () => {
        it('should click login button to login', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html')
        })
    })
    // ═══════════════════════════════════════════════
    // 5. ASSERTIONS (.should)
    // ═══════════════════════════════════════════════
    describe('5. Assertions - Validasi Element', () => {
        beforeEach(() => {
        cy.visit('https://www.saucedemo.com/')
        })

        it('should verify element EXISTS', () => {
        cy.get('.login_container').should('exist')
        })

        it('should verify element IS VISIBLE', () => {
        cy.get('.login_container').should('be.visible')
        })

        it('should verify element HAS ATTRIBUTE', () => {
        cy.get('#user-name').should('have.attr', 'placeholder', 'Username')
        })

        it('should verify element count (HAVE LENGTH)', () => {
        cy.get('input').should('have.length.greaterThan', 1)
        })

        it('should verify page TITLE', () => {
        cy.title().should('contain', 'Swag Labs')
        })

        it('should verify URL contains specific path', () => {
        cy.url().should('include', 'saucedemo.com')
        })
    })

    // ═══════════════════════════════════════════════
    // 6. WAIT (cy.wait)
    // ═══════════════════════════════════════════════
    describe('6. Wait - Menunggu', () => {
        it('should wait 2 seconds before checking the page', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.wait(2000) // Tunggu 2 detik
        cy.get('.login_container').should('be.visible')
        })

        it('should wait between actions', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.wait(1000) // Tunggu 1 detik
        cy.get('#password').type('secret_sauce')
        cy.wait(1000) // Tunggu 1 detik
        cy.get('#user-name').should('have.value', 'standard_user')
        cy.get('#password').should('have.value', 'secret_sauce')
        })

        it('should wait after clicking login', () => {
        cy.visit('https://www.saucedemo.com/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.wait(2000) // Tunggu halaman selesai load
        cy.url().should('include', '/inventory.html')
        cy.get('.title').should('contain.text', 'Products')
        })
    })

})