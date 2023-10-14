const { getConnection } = require("./index");

async function start() {
  const db = await getConnection();

  // User Table
  try {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id       INTEGER PRIMARY KEY,
            username TEXT NOT NULL,
            email    TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `);
    await db.exec("CREATE UNIQUE INDEX users_username ON users(username)");
    await db.exec("CREATE UNIQUE INDEX users_email ON users(email)");
  } catch (err) {
    if(err?.message?.startsWith("SQLITE_ERROR: index users_username already exists")){
        console.log("Database already exists!!");
    }
  }
}
(async function () {
  await start();
})();
