// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (email, senha, sucesso = true) => {
    cy.visit('login.html')
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('#login-btn').click()

    if (sucesso) {
        cy.url().should('include', 'dashboard')
    }
})

Cypress.Commands.add('loginErro', (email, senha) => {
    cy.visit('login.html')
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('#login-btn').click()
})

Cypress.Commands.add('registrarUsuario', () => {
    const email = `teste_${Date.now()}@teste.com`
    cy.request('POST', '/register', {
        name: 'Usuario teste',
        email: email,
        phone: '(12) 34567-8910',
        password: 'teste123'
    }).then((response) => {
        expect(response.status).to.eq(200)
        return email
    })
})

