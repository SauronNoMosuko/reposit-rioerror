  const AppError = require("../Utils/AppError")

  const { hash } = require("bcryptjs")

  const sqliteConnection = require("../DataBase/SQL");
  const { Database } = require("sqlite");
const { application } = require("express");
  
  class usersController {
    
    async create(request, response) {
      const{ Name, Email, Password } = request.body;
      // response.send(`Usuário: ${Name} - Email: ${Email} - Senha: ${Password}`);
      const DataBase = await sqliteConnection();
      const checkUserExists = await DataBase.get("SELECT * FROM users WHERE email = (?)", [Email])

      if(checkUserExists) {
        throw new AppError ("Esse email já está em uso");
      }

      const hashedPassword = await hash(Password, 8);

      await DataBase.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [Name, Email, hashedPassword]
      )

      return response.status(201).json();
   
      /**
       * index = GET para listar varios registros.
       * show = GET exibir um registro especifico.
       * create = POST criar um registro.
       * update = PÚT atualizar um registro.
       * delete = DELETE para remover um registro.
       */
    }

    async update (request, response) {
      const { Name, Email } = request.body;
      const { id } = request.params;

      const DataBase = await sqliteConnection();
      const user = await DataBase.get("SELECT * FROM users WHERE id = (?)", [id]);

      if (!user) {
        throw new AppError("Usuário não encontrado");
      }

      const userWhithUpdatedEmail = await DataBase.get("SELECT * FROM users email = (?)", [Email])

      if(userWhithUpdatedEmail && userWhithUpdatedEmail.id !== id) {
        throw new AppError("Este email já está em uso.")
      }

      user.Name = Name;
      user.Email = Email;

      await DataBase.run(`
        UPDATE users SET
        Name = ?,
        Email = ?,
        updated_at = ?,
        WHERE id = ?`,
        [user.Name, user.Email, new Date(), id]);

        return response.json();
      
    }
  }

  module.exports = usersController