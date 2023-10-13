const express = require("express");

const { loginUser } = require("../../../../user");
const { frontPath } = require("../../../../path");

const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log(frontPath + "login.html");
  res.send(
    `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Jansen, Casa comigo?</title>
    </head>
    <body>
      <form action="http://localhost:8080/auth/login" method="post" >
        <h1>Login</h1>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" /><br /><br />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" /><br /><br />
        <input type="submit" value="Submit" />
      </form>
    </body>
  </html>
  `
  );
  next();
});

router.post("/", async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const token = await loginUser(username, password);
    res.cookie("token", token);
    return res.redirect("/");
  } catch (err) {
    console.log(err.message)
    res.send(
      `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Jansen, Casa comigo?</title>
    </head>
    <body>
      <form action="http://localhost:8080/auth/login" method="post" >
        <h1>Login</h1>
        <p>Login falhou, tente novamente</p>
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" /><br /><br />
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" /><br /><br />
        <input type="submit" value="Submit" />
      </form>
    </body>
  </html>
  `
    );
    next();
  }
});

module.exports = router;
