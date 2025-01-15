describe('Hello World Test', () => {
    it('should display hello world', () => {
        cy.visit('http://localhost:3001'); // Adjust the URL as needed
        cy.contains('Hello World'); // Adjust the text as needed
    });
});