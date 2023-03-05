require("express-async-errors");

const migrationsRun = require("./DataBase/SQL/Tools")

const AppError = require("./Utils/AppError")

const { request, response } = require("express");

const express = require("express");

const routes = require("./Routes/index.js");  // <-- carrega por padrão o index.js

migrationsRun();

const app = express();
app.use(express.json());

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      menssage: error.menssage
    })
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    menssage: "Internal server error"
  });
})

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is runnig on port ${PORT}`));