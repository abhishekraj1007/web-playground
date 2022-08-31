require("dotenv").config();
const WebSocketServer = require("websocket").server;
const http = require("http");
const log = console.log;

const clients = {};

const PORT = 8080;

const server = http.createServer(function (req, res) {
  console.log(`${new Date()} Received request for ${req.url}`);
  res.writeHead(200);
  res.end();
});

server.listen(8080, () => console.log(`Server is listening on ${PORT}`));

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function originIsAllowed(origin) {
  return true;
}

wsServer.on("request", (req) => {
  if (!originIsAllowed(req.origin)) {
    req.reject();
    console.log(`request from ${req.origin} got rejected !!`);
    return;
  }

  const connection = req.accept(null, req.origin);
  connection.on("open", () => console.log("[Connection accepted :)]"));

  connection.on("message", (message) => {
    if (message.type === "utf8") {
      log(`Recieved message: ${message.utf8Data}`);
      connection.sendUTF(
        `FROM SERVER : got your message '${message.utf8Data}'`
      );
    } else if (message.type === "binary") {
      log(`Received binary message of ${message.binaryData.length} bytes`);

      connection.sendBytes(message.binaryData);
    }
  });

  connection.on("close", function (reasonCode, description) {
    console.log(reasonCode, description);
    log(new Date() + " Peer " + connection.remoteAddress + " disconnected.");
  });

  function sendNumber() {
    if (connection.connected) {
      connection.send(`FROM SERVER: ${Math.round(Math.random() * 1000)}`);
      setTimeout(sendNumber, 2000);
    }
  }

  sendNumber();
});
