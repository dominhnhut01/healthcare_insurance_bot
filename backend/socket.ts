import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";
import { KeywordExtractor } from "./QuestionAndAnswer/KeywordExtractor";
import { WeaviateRoute } from "./Weaviate/weaviateRoute";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;
  public keywordExtractor: KeywordExtractor = new KeywordExtractor();
  public weaviateRoute: WeaviateRoute = new WeaviateRoute();

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
    console.log("done loading");

    socket.on("message", async (message: string) => {
        this.messageListener(message);
        await this.messageSender(socket, message);
    })

    socket.on("disconnect", () => {
      console.info("Disconnect received from: " + socket.id);
    });
  };

  messageListener(message: string) {
    console.log(message);
  }
  async messageSender(socket: Socket, message: string): Promise<void> {
    const keywordString = await this.keywordExtractor.extractKeywordFromMessage(message);
    const response = await this.weaviateRoute.generativeQuery(keywordString);
    socket.emit("message", response.data.Get.EOC[0]._additional.generate.singleResult);
  }
}
