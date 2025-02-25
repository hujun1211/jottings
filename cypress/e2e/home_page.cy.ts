describe('The Home Page', () => {
  const baseUrl = Cypress.env('NEXT_PUBLIC_SITE_URL')
  it('successfully loads', () => {
    cy.visit('/') // change URL to match your dev URL
    cy.log('baseUrl:', baseUrl)
  })
})
