<h1>Task Organizer API</h1>
<p>Criado por Josimar Souza</p>

<h2>Preparando o ambiente</h2>

<p>Para rodar essa API você terá que ter o banco de dados <code>MongoDB</code> instalado e rodando na sua máquina, bem como o <code>git</code> e o <code>node</code>.</p>

<p>Após clonar o projeto usando o comando <code>git clone</code> navegue até a pasta do projeto e rode o comando <code>npm install</code> para instalar todas as dependências.</p>

<p>Você também precisará criar um arquivo <code>.env</code> com as variáveis listadas abaixo.</p>

<pre>
  PORT | porta em que a API irá rodar.
  MONGO_URL | url de acesso ao MongoDB.
  MONGO_DB_NAME | Nome do banco de dados.
  MONGO_USER_COLLECTION | Nome da coleção de usuários.
  MONGO_TASK_COLLECTION | Nome da coleção de tarefas.
  PASSWORD_INCRYPT_SECRET | Chave para a criptografia de senhas.
  JWT_SECRET | Chave para a autenticação de usuários.
</pre>

<p>Exemplo de uma variável no arquivo .env | <code>PORT=3000</code></p>

<h2>ENDPOINTS</h2>

----

<h3><code>POST</code>: /users</h3>
<p>Registra um novo usuário.</p>
<p>Possivéis respostas.</p>

----

<p><code>201</code>: Created</p>
<p>Exemplo:</p>
<pre>
  {
    "user": {
      "_id": "620d6ce922c23133dff4eb19",
      "username": "Camila",
      "email": "camila547@gmail.com"
    }
  }
</pre>

<p><code>409</code>: Conflict</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "User already registered"
  }
</pre>

<p><code>500</code>: Internal server error</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Internal server error"
  }
</pre>

----

<h3><code>POST</code>: /users/login</h3>
<p>Realiza o login de um usuário.</p>
<p>Possivéis respostas.</p>

----

<p><code>200</code>: OK</p>
<p>Exemplo:</p>
<pre>
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYyMGMyMTBlNGNkOWJiZTg5YzMyNzViNCIsInVzZXJuYW1lIjoiU2hhcnAiLCJlbWFpbCI6ImNvbnRhY3Quam9zaW1hcnNvdXphQGdtYWlsLmNvbSJ9LCJpYXQiOjE2NDUwNDc1ODcsImV4cCI6MTY0NTA1MTE4N30.do-VPXod_CQ1cBmyXjAr0U-ahZ4vIxSggOLXt_L6l3Y"
  }
</pre>

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "invalid \"email\" or \"password\""
  }
</pre>

<p><code>500</code>: Internal server error</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Internal server error"
  }
</pre>

----

<h3><code>POST</code>: /tasks</h3>
<p>Cria uma nova tarefa.</p>
<p><strong>É necessário estar logado para realizar essa requisição, enviando uma <code>token</code> nos headers dessa requisição com a chave <code>authorization</code></strong></p>
<p>Possivéis respostas.</p>

----

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "token not found"
  }
</pre>

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Invalid token"
  }
</pre>

<p><code>201</code>: Created</p>
<p>Exemplo:</p>
<pre>
  {
    "task": {
      "_id": "620d710c22c23133dff4eb1a",
      "title": "Task 3",
      "description": "Primeira task do dia",
      "status": "Em andamento",
      "userId": "620c21e1ef66f6c38048b289"
    }
  }
</pre>

<p><code>400</code>: Bad Request</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "\"title\" is required"
  }
</pre>

<p><code>400</code>: Bad Request</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "\"description\" is required"
  }
</pre>

<p><code>400</code>: Bad Request</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "\"status\" is required"
  }
</pre>

<p><code>500</code>: Internal server error</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Internal server error"
  }
</pre>

----

<h3><code>DELETE</code>: /tasks/:id</h3>
<p>Deleta uma tarefa identificada pelo seu id.</p>
<p><strong>É necessário estar logado para realizar essa requisição, enviando uma <code>token</code> nos headers dessa requisição com a chave <code>authorization</code></strong></p>
<p>Possivéis respostas.</p>

----

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "token not found"
  }
</pre>

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Invalid token"
  }
</pre>

<p><code>404</code>: Not Found</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Task not found"
  }
</pre>

<p><code>200</code>: OK</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Task successfully deleted"
  }
</pre>

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Cannot delete another user's task"
  }
</pre>

<p><code>500</code>: Internal server error</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Internal server error"
  }
</pre>

----

<h3><code>PUT</code>: /tasks/:id</h3>
<p>Atualiza uma tarefa identificada pelo seu id</p>
<p><strong>É necessário estar logado para realizar essa requisição, enviando uma <code>token</code> nos headers dessa requisição com a chave <code>authorization</code></strong></p>
<p>Possivéis respostas</p>

----

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "token not found"
  }
</pre>

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Invalid token"
  }
</pre>

<p><code>200</code>: OK</p>
<p>Exemplo:</p>
<pre>
  {
    "task": {
      "_id": "620d5d876890edd5eab75815",
      "title": "Task 3",
      "description": "Primeira task do dia",
      "status": "Em andamento"
    }
  }
</pre>

<p><code>400</code>: Bad Request</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "\"title\" is required"
  }
</pre>

<p><code>400</code>: Bad Request</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "\"description\" is required"
  }
</pre>

<p><code>400</code>: Bad Request</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "\"status\" is required"
  }
</pre>

<p><code>404</code>: Not Found</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Task not found"
  }
</pre>

<p><code>500</code>: Internal server error</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Internal server error"
  }
</pre>

----

<h3><code>GET</code>: /tasks</h3>
<p>Retorna todas as tarefas de um usuário</p>
<p><strong>É necessário estar logado para realizar essa requisição, enviando uma <code>token</code> nos headers dessa requisição com a chave <code>authorization</code></strong></p>
<p>Possivéis respostas</p>

----

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "token not found"
  }
</pre>

<p><code>401</code>: Unauthorized</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Invalid token"
  }
</pre>

<p><code>200</code>: OK</p>
<p>Exemplo:</p>
<pre>
  {
    "tasks": [
      {
        "_id": "620d5d876890edd5eab75815",
        "title": "Task 3",
        "description": "Primeira task do dia",
        "status": "Em andamento",
        "userId": "620c21e1ef66f6c38048b289"
      },
      {
        "_id": "620d710c22c23133dff4eb1a",
        "title": "Task 4",
        "description": "Segunda task do dia",
        "status": "Em andamento",
        "userId": "620c21e1ef66f6c38048b289"
      }
    ]
  }
</pre>

<p><code>500</code>: Internal server error</p>
<p>Exemplo:</p>
<pre>
  {
    "message": "Internal server error"
  }
</pre>

----

<h2>Contatos</h2>
<p>Email: <strong>contact.josimarsouza@gmail.com</strong</p>
<p>Linkedin: <a href="https://www.linkedin.com/in/josimar-souza-brito/" target="_blank">Josimar Souza</a></p>
