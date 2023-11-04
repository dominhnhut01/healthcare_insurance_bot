import React from 'react';
import withStyles from '@mui/styles/withStyles';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    '& label.Mui-focused': {
      color: theme.palette.text.secondary,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.text.primary,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.text.primary,
      },
    },
    borderRadius: theme.spacing(2),
  },
  icon: {
    color: theme.palette.text.primary,
  },
});

const ChatInput = (props) => {
  const { classes } = props;
  const handleSendMessage = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      fullWidth
      label="Type your message"
      variant="outlined"
      className={classes.root}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SendIcon className={classes.icon} />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default withStyles(styles)(ChatInput);
