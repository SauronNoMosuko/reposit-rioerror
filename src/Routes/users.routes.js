const { Router } = require("express");

const usersController = require("../Controllers/usersController");

const usersRoutes = Router();

// function MyMiddlewere(request, response, next) {
//   console.log("você passou pelo middlewere");

//   if (!request.body.isAdmin) {
//     return response.json({message: "User unauthorized"});
//   }

//   next();
// }

const UsersController = new usersController();


// app.get("/menssage/:id/:user", (request, response) => {

//   const { id, user } = request.params;

//   response.send(`
//     id da menssagem ${id}.
//     Para o usuário ${user}.
//   `);
// })

// app.get("/users", (request,response) => {
//   const { page, limit } = request.query;

//   response.send(`Página: ${page}. Mostrar: ${limit}`);
// })

// usersRoutes.post("/", MyMiddlewere, UsersController.create) <-- pra uma rota especifica

// usersRoutes.use(MyMiddlewere); // <-- pra todas as rotas

usersRoutes.post("/", UsersController.create);
usersRoutes.put("/:id", UsersController.update);
module.exports = usersRoutes;
