describe('Testes de API', () => {
    
    it('Deve cadastrar um novo usuário com sucesso', () => {
      const novoUsuario = {
        nome: 'David Silva',
        email: 'David@gmail.com',
        password: 'teste',
        administrador: 'true',
      }
  
      cy.request('POST', 'https://serverest.dev/usuarios', novoUsuario)
        .then((response) => {
          // Verificar se a resposta tem o status 201 (criado)
          expect(response.status).to.eq(201)
  
          // Verificar se a mensagem de sucesso está correta
          expect(response.body.message).to.eq('Cadastro realizado com sucesso')
  
          // Verificar se o ID do usuário foi gerado
          expect(response.body).to.have.property('_id')
        })
    })

    it('Deve cadastrar um novo produto com sucesso', () => {
        const login = {
          email: 'nardo2@gmail.com',
          password: 'senha',
        }
      
        // Login para obter o token
        cy.request('POST', 'https://serverest.dev/login', login).then((loginResponse) => {
          expect(loginResponse.status).to.eq(200); // Verifica se o login foi bem-sucedido
      
          const token = loginResponse.body.authorization; // Pega o token retornado
      
          const novoProduto = {
            nome: 'Monitor NPX',
            preco: '1500',
            descricao: 'Gamer',
            quantidade: '120',
          };
      
          // Cadastrar o produto com o token no cabeçalho
          cy.request({
            method: 'POST',
            url: 'https://serverest.dev/produtos',
            headers: {
              Authorization: token, // Adiciona o token no cabeçalho
            },
            body: novoProduto,
          }).then((response) => {
            // Verificar se a resposta tem o status 201 (criado)
            expect(response.status).to.eq(201)
      
            // Verificar se a mensagem de sucesso está correta
            expect(response.body.message).to.eq('Cadastro realizado com sucesso')
      
            // Verificar se o ID do produto foi gerado
            expect(response.body).to.have.property('_id')
          })
        })
      })

      it('Deve realizar o login e retornar o token', () => {
        let token
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
              email: 'nardo2@gmail.com',
              password: 'senha',
            },
          }).then((response) => {
            // Verifique se o status da resposta é 200
            expect(response.status).to.eq(200)
      
            // Salve o token para uso posterior
            token = response.body.authorization
      
            // Exiba o token no console
            cy.log('Token:', token)
          })
    })
    it('Deve excluir o usuário e o produto cadastrado via API', () => {
      // Fazer login no Sistema
      cy.visit('https://front.serverest.dev/')
      cy.get('#email').type('nardo2@gmail.com')
      cy.get('#password').type('senha')
      cy.get('[data-testid="entrar"]').click()
      // Excluir Usuário
      cy.get('[data-testid="listar-usuarios"]').click()
      cy.get('[class="table table-striped"]')
        .contains('td', 'David@gmail.com') 
        .parent() 
        .find('button') 
        .contains('Excluir')
        .click()
      // Validar se o usuário foi excluído
      cy.get('[data-testid="listar-usuarios"]').click()
      cy.get('[class="table table-striped"]')
        .contains('td', 'David@gmail.com')
        .should('not.exist')
      // Excluir Produto
    cy.get('[data-testid="listar-produtos"]').click()
    cy.get('[class="table table-striped"]')
      .contains('td', 'Monitor NPX') 
      .parent() 
      .find('button') 
      .contains('Excluir')
      .click()
    // Validar se o produto foi excluído
    cy.get('[data-testid="listar-produtos"]').click()
    cy.get('[class="table table-striped"]')
      .contains('td', 'Monitor NPX')
      .should('not.exist')
    })
})


