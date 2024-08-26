import { Server } from "socket.io";
import Redis from "ioredis";

const publisher = new Redis({
  host: "localhost",
  port: 6379,
});

const subscriber = new Redis({
  host: "localhost",
  port: 6379,
});

class SocketService {
  private server: Server;
  constructor() {
    console.log("Initialise Socket Service");
    this.server = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });

    subscriber.subscribe("MESSAGES");
  }

  get io() {
    return this.server;
  }

  initListeners() {
    const server = this.server;

    server.on("connection", (socket) => {
      console.log(`New socket connected`, socket.id);
      socket.on("event:message", async ({ message }: { message: string }) => {
        console.log("New message delivered: ", message);

        await publisher.publish("MESSAGES", JSON.stringify({ message }));
      });
    });

    subscriber.on("message", (channel, message) => {
      if (channel === "MESSAGES") {
        server.emit("message", message);
      }
    });

    console.log("Initialised Socket Listeners");
  }
}

export default SocketService;
