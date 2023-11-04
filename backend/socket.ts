import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  /** Master list of all connected rooms */

  constructor(server: HttpServer) {
    ServerSocket.instance = this;
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });

    this.io.on("connect", this.StartListeners);
  }


  StartListeners = async (socket: Socket) => {
    console.info("Message received from " + socket.id);
    console.log("done loading")


    socket.on("message", async (message: string) => {
        this.messageListener(message);
        this.messageSender(socket, message);
    })

    socket.on("disconnect", () => {
      console.info("Disconnect received from: " + socket.id);
      socket.emit("disconnect")
    });
  };

  messageListener(message: string) {
    console.log(message);
  }
  messageSender(socket: Socket, message: string) {
    socket.emit("message", message);
  }
}
