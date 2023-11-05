import React from "react";
import withStyles from "@mui/styles/withStyles";
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const styles = (theme) => ({
  paper: {
    background: theme.palette.background.default,
    padding: theme.spacing(2),
    borderRadius:theme.spacing(2),
  },
});

const ChatContent = (props) => {
  const { classes } = props;

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Paper className={classes.paper} elevation={2}>
          <Typography variant="body1">
            Siu
          </Typography>
        </Paper>
      </Grid>
      <Grid item>
        <Typography variant="body1">
          Chatting
        </Typography>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ChatContent);
