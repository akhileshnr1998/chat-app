import http from "http";
import SocketService from "./services/socket.service";

async function init() {
  const socketService = new SocketService();

  const httpServer = http.createServer();
  const PORT = process.env.PORT || 8000;

  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Server listening to port: ${PORT}`);
  });

  socketService.initListeners();
}

init();
