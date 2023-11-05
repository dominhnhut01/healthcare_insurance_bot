import { useState, useEffect } from 'react';
import withStyles from '@mui/styles/withStyles';
import Container from '@mui/material/Container';
import ChatInput from './chat/ChatInput';
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import { socket } from '../socket';
import ChatContent from './chat/ChatContent';
import icon from '../assets/logo-removebg.png';

const styles = (theme) => ({
  container: {
    marginTop: theme.spacing(4),
    borderRadius: theme.spacing(2),
    height: "50rem",
  },
  chat: {
    height: '50rem',
    overflow: 'auto',
    padding: theme.spacing(3),
  },
  input: {
    paddingLeft: '2rem',
    paddingRight: '2rem',
    paddingBottom: '1rem',
    paddingTop: '1rem',
  },
  icon: {
    width: '3rem',  // Adjust the dimensions to your preference
    height: '3rem',  // Adjust the dimensions to your preference
    marginRight: theme.spacing(1),  // Adds some spacing between the icon and the input
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  }
});

const ChatContainer = (props) => {
  const { classes } = props;
  const [messages, setMessages] = useState([]);

  const inputMessageListener = (newMessage) => {
    sendMessage(newMessage);
  };

  const sendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { messageType: "User", message: message },
      {messageType: "AI", message: "AI is thinking"},
    ]);
    console.log(`Sending message ${message}`)
    socket.emit("message", message);
  };

  const receiveMessage = (message) => {
    setMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages[newMessages.length - 1].message = message;
      return newMessages;
    });
  }

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(`received message: ${message}`);
      receiveMessage(message);
    });
  }, []);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Paper elevation={3}>
        <Grid container direction="column">
          <Grid item className={classes.chat}>
            <ChatContent
              messages={messages}
            />
          </Grid>
          <Grid item className={classes.input}>
            <Grid container alignItems="center">
              <Grid item className={classes.iconContainer}>
                <img src={icon} alt="logo" className={classes.icon} />
              </Grid>
              <Grid item flex={1}>
                <ChatInput inputEventListener={inputMessageListener} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default withStyles(styles)(ChatContainer);
