export class CustomError extends Error {
    constructor(message = "", type = "error", ...args) {
      super(message, type, ...args);
      this.message = message;
      this.type= type;
    }
}