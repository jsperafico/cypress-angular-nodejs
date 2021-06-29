/// <reference types="cypress" />

describe('Common Features being tested', () => {
    beforeEach(() => cy.visit('http://localhost:8080/'));

    it('Home page opened', () => {
        cy.contains('Task Tracker');
        cy.get('app-tasks').should('exist');
        cy.get('app-task-item');
    });

    it('Open Add/Close form', () => {
        cy.get('app-button[ng-reflect-text=Add]').click();
        cy.get('form').should('exist');
        cy.get('app-button[ng-reflect-text=Close]').click();
        cy.get('form').should('not.exist');
    });

    it('Open about page', () => {
        cy.contains('About').click();
        cy.url().should('include', '/about');
    });
});