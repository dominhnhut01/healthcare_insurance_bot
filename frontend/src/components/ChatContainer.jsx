import { useState, useEffect } from "react";
import withStyles from "@mui/styles/withStyles";
import Container from "@mui/material/Container";
import ChatInput from "./chat/ChatInput";
import Grid from "@mui/material/Grid";
import { socket } from "../socket";
import ChatContent from "./chat/ChatContent";
import { BACKGROUND_SECONDARY_COLOR } from "../shared/Constants";

const styles = (theme) => ({
  container: {
    background: BACKGROUND_SECONDARY_COLOR,
    marginTop: theme.spacing(4),
    borderRadius: theme.spacing(2),
    height: "50rem",
  },
  chat: {
    height: "45rem",
    overflow: "auto",
    padding: theme.spacing(1.5),
  },
});

const ChatContainer = (props) => {
  const { classes } = props;
  const [messages, setMessages] = useState([]); //[{messageType: "AI" | "User", message: string}]

  function inputMessageListener(newMessage) {
    sendMessage(newMessage);
  }

  function sendMessage(message) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { messageType: "User", message: message },
    ]);
    socket.emit("message", message);
  }

  function receiveMessage(message) {
    setMessages((prevMessages) => [
      ...prevMessages,
      { messageType: "AI", message: message },
    ]);
  }

  useEffect(() => {
    socket.on("message", async (message) => {
      console.log(`received message: ${message}`);
      receiveMessage(message);
    });
  }, []);


  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container direction="column">
        <Grid item className={classes.chat}>
          <Grid container direction="column" spacing={2}>
            {messages.map((message, index) => (
              <ChatContent
                messageType={message.messageType}
                message={message.message}
                key={index}
              />
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <ChatInput inputEventListener={inputMessageListener} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(ChatContainer);
