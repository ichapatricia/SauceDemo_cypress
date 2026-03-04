class InventoryPage{
    
    get inventoryItems(){
        return cy.get('[data-test="inventory-item"]')
    }

    get cartIcon(){
        return cy.get(".shopping_cart_link")

    }

    // Random pick product
    addRandomProduct(totalProduct){

        cy.get('[data-test^="add-to-cart"]').then(($buttons)=>{

            const total = $buttons.length
            const selectedIndexes = []

            if (totalProduct > total) {
                totalProduct = total
            }

            while (selectedIndexes.length < totalProduct){
                const random = Math.floor(Math.random() * total)

                if (!selectedIndexes.includes(random)){
                    selectedIndexes.push(random)
                }
            }

            selectedIndexes.forEach((i) => {
                cy.wrap($buttons[i]).click()
            })

        })
    }

    goToCart(){
        this.cartIcon.click()
    }

}
export default InventoryPage