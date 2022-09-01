const express = require("express");
const router = require("./routes/misc_routes");
const cluster = require("cluster");
const totalCores = require("os").cpus().length;
const log = console.log;

if (cluster.isMaster) {
  log(`Number of CORES is ${totalCores}`);
  log(`Master ${process.pid} is running`);

  // fork workers/child process
  for (let i = 0; i < totalCores; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    log(`worker ${worker.process.pid} died`, code, signal);
    log("Let's fork another worker!");
    // if any child process dies than create another
    cluster.fork();
  });
} else {
  async function server() {
    console.log(`Worker ${process.pid} started`);
    const app = express();
    const PORT = 4000;
    app.use(router);

    app.listen(PORT, () => {
      console.log(`Server is listening on PORT ${PORT}`,);
    });
  }

  server().catch((error) => {
    process.exit(0);
  });
}
