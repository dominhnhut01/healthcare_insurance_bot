import React from "react";
import withStyles from "@mui/styles/withStyles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const styles = (theme) => ({
  paperAI: {
    background: theme.palette.background.default,
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
  },
  paperUser: {
    background: "blue",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    textAlign: 'right',
  },
  AITypography: {
    paddingLeft: theme.spacing(2),
  },
  userTypography: {
    paddingLeft: theme.spacing(2),
  },
});

const ChatContent = (props) => {
  return (
    <Grid item>
      {props.messageType === "AI" ? (
        <Paper className={props.classes.paperAI} elevation={2}>
          <Typography variant="body1" className={props.classes.AITypography}>
            {props.message}
          </Typography>
        </Paper>
      ) : (
        <Paper className={props.classes.paperUser} elevation={2}>
          <Typography variant="body1" className={props.classes.userTypography}>
            {props.message}
          </Typography>
        </Paper>
      )}
    </Grid>
  );
};

export default withStyles(styles)(ChatContent);
