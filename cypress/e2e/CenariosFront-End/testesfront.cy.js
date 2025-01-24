describe('Cenários Teste Técnico', () => {
  
  const login = (email, senha) => {
    cy.visit('https://front.serverest.dev/')
    cy.get('#email').type(email)
    cy.get('#password').type(senha)
    cy.get('[data-testid="entrar"]').click()
  };

  beforeEach(() => {
    login('nardo2@gmail.com', 'senha')
  })

  it('Deve permitir cadastrar um novo usuário', () => {
    
    // Cadastrar Usuário
    cy.get('[data-testid="cadastrarUsuarios"]').click()
    cy.get('#nome').type('Manoel Gomes')
    cy.get('#email').type('monoel.gomes@gmail.com')
    cy.get('#password').type('senhacaneta')
    cy.get('[data-testid="cadastrarUsuario"]').click()
    
    // Verificar se o usuário foi cadastrado
    cy.get('[data-testid="listar-usuarios"]').click()
    cy.get('[class="table table-striped"]').contains('monoel.gomes@gmail.com')
  })

  it('Deve permitir cadastrar um novo produto', () => {
    
    // Cadastrar Produto
    cy.get('[data-testid="cadastrarProdutos"]').click()
    cy.get('#nome').type('Caneta')
    cy.get('#price').type('2')
    cy.get('#description').type('Caneta Azul')
    cy.get('#quantity').type('10')
    cy.get('#imagem').selectFile('canetaazul.jpg')
    cy.get('[data-testid="cadastarProdutos"]').click()
    
    // Verificar se o produto foi cadastrado
    cy.get('[data-testid="listar-produtos"]').click()
    cy.get('[class="table table-striped"]').contains('Caneta Azul')
  })

  it('Deve excluir um usuário cadastrado', () => {
    // Excluir Usuário
    cy.get('[data-testid="listar-usuarios"]').click()
    cy.get('[class="table table-striped"]')
      .contains('td', 'monoel.gomes@gmail.com') 
      .parent() 
      .find('button') 
      .contains('Excluir')
      .click()
    // Validar se o usuário foi excluído
    cy.get('[data-testid="listar-usuarios"]').click()
    cy.get('[class="table table-striped"]')
      .contains('td', 'monoel.gomes@gmail.com')
      .should('not.exist')
  })

  it('Deve excluir um produto cadastrado', () => {
    // Excluir Produto
    cy.get('[data-testid="listar-produtos"]').click()
    cy.get('[class="table table-striped"]')
      .contains('td', 'Caneta Azul') 
      .parent() 
      .find('button') 
      .contains('Excluir')
      .click()
    // Validar se o produto foi excluído
    cy.get('[data-testid="listar-produtos"]').click()
    cy.get('[class="table table-striped"]')
      .contains('td', 'Caneta Azul')
      .should('not.exist')
  })

})
