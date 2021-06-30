/// <reference types="cypress" />

describe('Should validate if backend is returning correctly', () => {
    beforeEach(() => cy.visit('/'));

    it('Validate list of tasks was populated', () => {
        cy.get('app-task-item').should('be.visible');
    });
});