/// <reference types="cypress"/>

describe('Task lifecycle validateion', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.contains('Task Tracker');

        cy.get('app-button[ng-reflect-text=Add]').click();
        cy.get('form').should('exist');
    })

    it('Should: add, edit and remove', () => {
        const taskId = Math.random() * 100;
        const inputed = `This is my random task: ${taskId}`;

        cy.get('input[id=text]').type(inputed);
        cy.get('input[id=day]').type(`${Math.ceil(Math.random() * 21)}/${Math.ceil(Math.random() * 12)}/${(Math.ceil(Math.random() * 10)) + 2000}`);
        cy.get('input[type=submit]').click();

        cy.get('app-task-item').contains('h3', inputed).should('be.visible');
        cy.get('app-task-item h3').contains(`${taskId}`).dblclick();
        cy.get('app-task-item div.reminder').contains('h3', inputed).should('be.visible');

        cy.get('app-task-item').contains('h3', inputed).find('fa-icon').click();
        cy.get('app-task-item h3').should('not.contain', `${taskId}`);
    })
});