class AppError {
  menssage;
  statusCode;

  constructor(menssage, statusCode = 400) {
    this.menssage = menssage;
    this.statusCode = statusCode;
  }
}

module.exports = AppError