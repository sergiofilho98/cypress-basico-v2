/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    //Exercício extra 1
    it('preenche os campos obrigatórios e envia o formulário', function() {
        const longText = 'sjkdfhkjsadfkjsadhkfjhasdkjfhsakdjhfkjsadhfkjsadhfksajdhfksajdhfkjsahdfkjsadhfkjsadhfkjsadhkfjhsadkfjhsadkjfhasdkjhfksadjhfksajdhfasd'
        cy.get('#firstName').type('Sergio')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('sergiogomesgba@gmail.com')
        cy.get('#open-text-area').type(longText, {delay: 0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    //Exercício extra 2
    it('exibe a mensagem de erro ao submeter o formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Sergio')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('sergiogomesgba2gmailcom')
        cy.get('#open-text-area').type('qualquer coisa')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')

    })
    //Exercício extra 3
    it('campo telefone inválido permance vazio', function() {
        cy.get('#phone').type('abcefgh').should('have.value', '')
    })

    //Exercício extra 4
     it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { 
        cy.get('#firstName').type('Sergio')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('sergiogomesgba@gmail.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('qualquer coisa')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
 
    //Exercício extra 5
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function() {
        cy.get('#firstName').type('Sergio').should('have.value', 'Sergio').clear().should('have.value', '')
        cy.get('#lastName').type('Filho').should('have.value', 'Filho').clear().should('have.value', '')
        cy.get('#email').type('sergiogomesgba@gmail.com').should('have.value', 'sergiogomesgba@gmail.com').clear().should('have.value', '')
        cy.get('#phone').type('83988988618').should('have.value', '83988988618').clear().should('have.value', '')
        cy.get('#phone-checkbox').click().click()
        cy.get('#open-text-area').type('qualquer coisa').should('have.value', 'qualquer coisa').clear().should('have.value', '')
    })

    //Exercício extra 6
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', function() {
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })

     //Exercício extra 7
     it('envia o formuário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    //Aula03

    //Exercício
    it('seleciona um produto (YouTube) por seu texto', function() {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })

    //Exercício Extra 1
    it('seleciona um produto (M entoria) por seu valor', function() {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })

    //Exercício Extra 2
    it('seleciona um produto (Blog) por seu indice', function() {
        cy.get('#product').select(1).should('have.value', 'blog')
    })

    //Aula04

    //Exercício
    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })

     //Exercício Extra
     it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]').should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    //Aula05

    //Exercício
    it('marca ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]').check().should('be.checked')
        .last().uncheck().should('not.be.checked')
    })

    //Exercício Extra
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() { 
        cy.get('input[type="checkbox"][value="phone"]').check()
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.error').should('be.visible')
    })

    //Aula06

    //Exercício
    it('seleciona um arquivo da pasta fixtures', function() { 
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('C:/Users/Sérgio Filho/Desktop/cypress/cypress-basico-v2/cypress/fixtures/example.json')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })
    //Exercício Extra 1
    it('seleciona um arquivo simulando um drag-and-drop', function() { 
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('C:/Users/Sérgio Filho/Desktop/cypress/cypress-basico-v2/cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })    
    })
    //Exercício Extra 2
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() { 
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]').selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    //Aula06

    //Exercício
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() { 
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    //Exercício Extra 1
    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() { 
        cy.get('#privacy a').invoke('removeAttr', 'target').click()
    })
}) 