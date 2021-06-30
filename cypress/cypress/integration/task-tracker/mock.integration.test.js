/// <reference types="cypress" />

describe('Use mocking strategy to fake an enpoint', () => {

    it('Should present a mocked list of tasks', () => {
        cy.intercept('GET', '/api/tasks', {
            fixture: 'tasks.json'
        });
        cy.visit('/');

        cy.get('app-task-item').contains('h3', 'Mocked data 1').should('be.visible');
    });

    //Override an intercept doesn't work. Please keep it mind.
    it('Should mock add task', () => {
        cy.intercept('GET', '/api/tasks', {}).as('getTasks');
        cy.visit('/');
        cy.wait('@getTasks').its('response.statusCode').should('eq', 200)

        cy.get('app-button[ng-reflect-text=Add]').click();
        cy.get('form').should('exist');

        const task = {
            text: `This is my random task: ${Math.random() * 100}`,
            day: `${Math.ceil(Math.random() * 21)}/${Math.ceil(Math.random() * 12)}/${(Math.ceil(Math.random() * 10)) + 2000}`,
            reminder: false
        };
        cy.intercept('POST', '/api/tasks', {}).as('postTasks');

        cy.get('input[id=text]').type(task.text);
        cy.get('input[id=day]').type(task.day);
        cy.get('input[type=submit]').click();
        
        cy.wait('@postTasks').its('response.statusCode').should('eq', 200)
    });
});