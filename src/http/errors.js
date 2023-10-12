class GeneralError extends Error {
  constructor(error) {
    super(error);

    this.name = "General";
    this.message = "Something went wrong!";
    this.httpStatusCode = 500;
  }
}

module.exports = { GeneralError };
