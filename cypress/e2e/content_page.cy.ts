describe('The Content Page', () => {
  it('successfully loads', () => {
    cy.visit('/content.html')
  })
  it('Allows you to select the rover name', () => {
    cy.visit('/content.html')
    cy.get('[data-cy="rover-select"]').select('curiosity')
  })
})
