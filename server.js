require('dotenv').config();
const express = require("express");
const miscRouter = require("./src/routes/misc_routes");
// const userRouter = require("./src/routes/user-routes");

async function server() {
  const app = express();
  app.use(express.json());
  const PORT = process.env.PORT || 4000;
  // require("./src/config/db");
  app.use(miscRouter);
  // app.use(userRouter);

  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
  });
}

server().catch((error) => {
  process.exit(0);
});