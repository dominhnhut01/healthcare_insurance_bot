import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";
import { KeywordExtractor } from "./QuestionAndAnswer/KeywordExtractor";
import { WeaviateRoute } from "./Weaviate/weaviateRoute";
import { v4 as uuidv4 } from "uuid";
import * as fs from "node:fs/promises";
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
    }
    socket.handshake.auth.sessionID = uuidv4();
    sessionStore.add(socket.handshake.auth.sessionID);
    return next();
  };

  StartListeners = async (socket: Socket) => {
    console.log(`Start session from: ${socket.handshake.auth.sessionID}`);

    socket.on("message", async (message: string) => {
      this.messageListener(message);
      console.log("reach backend");
      await this.messageSender(socket, message);
    });

    socket.on("upload", async (file, callback): Promise<any> => {
      // console.log(file); // <Buffer 25 50 44 ...>

      // save the content to the disk, for example
      const pdfFilePath = `uploads/${socket.handshake.auth.sessionID}.pdf`;
      await fs.writeFile(pdfFilePath, file);

      const pdfHandler = new PdfHandler(pdfFilePath);
      const parseParagraphArray: string[] = await pdfHandler.getParsedContent();

      parseParagraphArray.forEach(async (paragraph) => {
        await this.weaviateRoute.addClassObj(
          socket.handshake.auth.sessionID,
          paragraph
        );
      })

      callback({ succeed: true });
    });

    socket.on("disconnect", async () => {
      const pdfPath = `uploads/${socket.handshake.auth.sessionID}.pdf`;
      if (await Bun.file(pdfPath)) await unlink(pdfPath);
      sessionStore.delete(socket.handshake.auth.sessionID);
      console.info("Disconnect received from: " + socket.id);
    });
  };

  messageListener(message: string) {}
  async messageSender(socket: Socket, message: string): Promise<void> {
    const keywordString = await this.keywordExtractor.extractKeywordFromMessage(
      message
    );
    const uid = socket.handshake.auth.sessionID;
    const test_uid = 'testID1';
    const response = await this.weaviateRoute.generativeQuery(
      test_uid,
      keywordString,
      message
    );
    // console.log(`answer: ${response.data.Get.EOC[0]._additional.generate.singleResult}`)
    //const response = await this.weaviateRoute.getEverything('testID0');
    if (!response || !response.data || !response.data.Get || !response.data.Get.EOC || response.data.Get.EOC.length == 0) {
      socket.emit(
        "message",
        "There is not enough information in the document you provided or the topic is not related!"
      );
    } else {
      socket.emit(
        "message",
        response.data.Get.EOC[0]._additional.generate.singleResult
      );
    }
  }
}
