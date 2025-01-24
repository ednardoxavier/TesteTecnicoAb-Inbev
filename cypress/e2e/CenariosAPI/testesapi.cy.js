describe('Testes de API', () => {
    
    it('Deve cadastrar um novo usuário com sucesso', () => {
      const novoUsuario = {
        nome: 'Orlando Silva Teste',
        email: 'orlandoT@gmail.com',
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
            nome: 'Mouse NPX',
            preco: '150',
            descricao: 'Gamer',
            quantidade: '95',
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
              email: 'orlando@gmail.com',
              password: 'teste',
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
})


