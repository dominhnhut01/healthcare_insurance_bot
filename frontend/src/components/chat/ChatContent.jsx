import React from "react";
import withStyles from "@mui/styles/withStyles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

const styles = (theme) => ({
  paperAI: {
    background: theme.palette.text.secondary,
    padding: theme.spacing(2),
    borderRadius: '0.75rem 0.75rem 0.75rem 0',
    alignSelf: 'flex-start',
    maxWidth: '25rem',
  },
  paperUser: {
    background: theme.palette.text.primary,
    padding: theme.spacing(2),
    alignSelf:'flex-end',
    borderRadius: '0.75rem 0.75rem 0 0.75rem',
    maxWidth: '25rem',
  },
  AITypography: {
    paddingLeft: theme.spacing(1),
  },
  userTypography: {
    paddingRight: theme.spacing(1),
  },
});

const ChatContent = (props) => {
  const { classes, messages } = props;

  return (
    <Grid container direction="column" spacing={2}>
      {messages.map(({ messageType, message }, index) => (
        <Grid item key={index} alignSelf={messageType === "AI" ? "flex-start" : "flex-end"}>
          {messageType === "AI" ? (
            <Paper className={classes.paperAI} elevation={3}>
              <Typography variant="body1" className={classes.AITypography}>
                {message === "AI is thinking" ? <CircularProgress color="inherit" size={20} style={{ marginRight: '0.5rem', marginTop: '0.25rem'}}/> : message}
              </Typography>
            </Paper>
          ) : (
            <Paper className={classes.paperUser} elevation={3}>
              <Typography variant="body1" className={classes.userTypography}>
                {message}
              </Typography>
            </Paper>
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ChatContent);
