import React, { useState, useEffect } from 'react';
import withStyles from '@mui/styles/withStyles';
import Container from '@mui/material/Container';
import ChatInput from './chat/ChatInput';
import Grid from '@mui/material/Grid';
import { socket } from '../Socket';
import ChatContent from './chat/ChatContent';
import { BACKGROUND_SECONDARY_COLOR } from '../shared/Constants';

const styles = (theme) => ({
  container: {
    background: BACKGROUND_SECONDARY_COLOR,
    marginTop: theme.spacing(4),
    borderRadius: theme.spacing(2),
    height: '50rem',
  },
  chat: {
    height: '45rem',
    overflow: 'auto',
    padding: theme.spacing(1.5),
  },
});

const ChatContainer = (props) => {
  const { classes } = props;
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("message", () => {
      console.log('received message');
    });
  }, [socket]);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid container direction="column">
        <Grid item className={classes.chat}>
          <ChatContent />
        </Grid>
        <Grid item>
          <ChatInput />
        </Grid>
      </Grid>
    </Container>
  );
};

export default withStyles(styles)(ChatContainer);
