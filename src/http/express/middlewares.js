const cookies = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes");

async function validateNotLoggedIn(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return next();
  }

  const decoded = decodeUserToken(token);
  if (!decoded) {
    return next();
  }

  const user = await getUserById(decoded.id);
  if (!user) {
    return next();
  }

  return res.redirect("/");
}

async function introspectTokenMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    console.warn("[WARN] User not logged in! Redirecting to login page...");
    return res.redirect("/auth/login");
  }

  const decoded = decodeUserToken(token);
  if (!decoded) {
    res.clearCookie("token");
    console.warn("[WARN] User not logged in! Redirecting to login page...");
    return res.redirect("/auth/login");
  }

  const user = await getUserById(decoded.id);
  if (!user) {
    res.clearCookie("token");
    console.warn(
      `[WARN] Invalid user "${decoded.username}-[${decoded.id}]"! Redirecting to login page...`
    );
    return res.redirect("/auth/login");
  }

  req.user = decoded;

  next();
}

/**
 * @description Initial Middleware to register requester informations
 * @param {Express} app
 */
function registerMiddlewares(app) {
  app.use(cookies());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use((req, res, next) => {
    const when = new Date();
    const path = req.path;
    const method = req.method;
    const ip = req.ip;

    console.log(`[${when.toISOString()}] ${method} ${path} ip=${ip}`);

    next();
  });

  routes(app);

  app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).send("<h1>SOMETHING WENT WRONG!</h1>");
  });
}

module.exports = {
  registerMiddlewares,
  validateNotLoggedIn,
  introspectTokenMiddleware,
};
