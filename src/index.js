const SERVER_PORT = 8080;

const express = require("express");
const { registerMiddlewares } = require("./http/express/middlewares");

const app = express();

registerMiddlewares(app);

app.listen(SERVER_PORT, () => {
  console.log(`Listening on PORT: ${SERVER_PORT}`);
});
