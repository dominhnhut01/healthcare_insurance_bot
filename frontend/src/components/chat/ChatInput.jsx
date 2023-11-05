import { useState } from "react";
import withStyles from "@mui/styles/withStyles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

const styles = (theme) => ({
  root: {
    backgroundColor: '#F0F2F5',
    "& input": {
      color: theme.palette.text.secondary,
    },
    "& label": {
      color: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: 'none',
      },
    },
    borderRadius: theme.spacing(5),
    paddingLeft: theme.spacing(1),
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  iconButton: {
    "&:hover, &:active": {
      color: "#FFF", // Change 'white' to your desired hover and click color
    },
  },
});

const ChatInput = (props) => {
  const [message, setMessage] = useState("");
  const handleSendMessage = (event) => {
    if (message.length > 0) {
      event.preventDefault();
      props.inputEventListener(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSendMessage}>
      <TextField
        fullWidth
        placeholder="Type your message ..."
        variant="outlined"
        className={props.classes.root}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" className={props.classes.iconButton}>
                <SendIcon className={props.classes.icon} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
};

export default withStyles(styles)(ChatInput);
