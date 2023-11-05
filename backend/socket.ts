import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";
import { KeywordExtractor } from "./QuestionAndAnswer/KeywordExtractor";
import { WeaviateRoute } from "./Weaviate/weaviateRoute";
import { v4 as uuidv4 } from "uuid";
import { writeFile } from "fs";
import { unlink } from "node:fs/promises";
import { PdfHandler } from "./UploadPDF/PdfHandler";

const sessionStore = new Set<string>();
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

    this.io.use(this.handleSession);

    this.io.on("connect", this.StartListeners);
  }

  handleSession = (socket: Socket, next: any) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      // find existing session
      const session = sessionStore.has(sessionID);
      if (session) {
        socket.handshake.auth.sessionID = sessionID;
        return next();
      }
      socket.handshake.auth.sessionID = uuidv4();
    }
  };

  StartListeners = async (socket: Socket) => {
    console.info("Message received from " + socket.id);
    console.log("done loading");

    socket.on("message", async (message: string) => {
      this.messageListener(message);
      await this.messageSender(socket, message);
    });

    socket.on("upload", async (file, callback) => {
      // console.log(file); // <Buffer 25 50 44 ...>

      // save the content to the disk, for example
      const pdfFilePath = `uploads/${socket.handshake.auth.sessionID}.pdf`;
      await writeFile(pdfFilePath, file, (err) => {
        callback({ message: err ? "failure" : "success" });
      });

      const pdfHandler = new PdfHandler(pdfFilePath);
      const parseParagraphArray: string[] = await pdfHandler.getParsedContent();
    });

    socket.on("disconnect", async () => {
      await unlink(`uploads/${socket.handshake.auth.sessionID}.pdf`);
      console.info("Disconnect received from: " + socket.id);
    });
  };

  messageListener(message: string) {
    console.log(message);
  }
  async messageSender(socket: Socket, message: string): Promise<void> {
    const keywordString = await this.keywordExtractor.extractKeywordFromMessage(
      message
    );
    const response = await this.weaviateRoute.generativeQuery(keywordString);
    socket.emit(
      "message",
      response.data.Get.EOC[0]._additional.generate.singleResult
    );
  }
}
