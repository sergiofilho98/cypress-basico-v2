Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Sergio')
    cy.get('#lastName').type('Filho')
    cy.get('#email').type('sergiogomesgba@gmail.com')
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()
})