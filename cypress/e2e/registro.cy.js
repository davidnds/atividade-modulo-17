/// <reference types="cypress" />

describe('Catalogo de livros do HUB de Leitura', () => {

    beforeEach(() => {
        cy.visit('register.html')
        cy.setCookie('jwt_education_shown', 'true')
    });

    it('Deve realizar registro de conta com sucesso - usando cy.intercept', () => {
        const email = `teste${Date.now()}@teste.com`
        cy.intercept('POST', '**/register').as('register')
        cy.get('#name').type('Usuario teste')
        cy.get('#email').type(email)
        cy.get('#phone').type('(12) 34567-8910')
        cy.get('#password').type('teste123')
        cy.get('#confirm-password').type('teste123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.wait('@register').then((interception) => {
            expect(interception.response.statusCode).to.eq(201)
            expect(interception.request.body.email).to.eq(email)
            expect(interception.request.body).to.include({
                name: 'Usuario teste',
            })

        })
    })

    it('erro registro com email já cadastrado - usando cy.intercept', () => {
        const email = `teste${Date.now()}@teste.com`
        cy.intercept('POST', '**/register', {
            statusCode: 400,
            body: {
                error: 'Email já cadastrado'
            }
        }).as('registerFail')
        cy.get('#name').type('Usuario teste')
        cy.get('#email').type(email)
        cy.get('#phone').type('(12) 34567-8910')
        cy.get('#password').type('teste123')
        cy.get('#confirm-password').type('teste123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()
        cy.wait('@registerFail')
        cy.contains('Email já cadastrado')
    })

    it('Deve registrar um usuário - usando AppAction', () => {
        cy.registrarUsuario().then((email) => {
            cy.log(email)
        })
    })
});

