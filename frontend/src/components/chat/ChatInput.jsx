import { useState } from "react";
import withStyles from "@mui/styles/withStyles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    "& input": {
      color: "#FFF",
    },
    "& label.Mui-focused": {
      color: theme.palette.text.secondary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.text.primary,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.primary,
      },
      "&.Mui-focused fieldsets": {
        borderColor: theme.palette.text.primary,
      },
    },
    borderRadius: theme.spacing(2),
  },
  icon: {
    color: theme.palette.text.primary,
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
    event.preventDefault();
    props.inputEventListener(message);
  };

  return (
    <form onSubmit={handleSendMessage}>
      <TextField
        fullWidth
        label="Type your message"
        variant="outlined"
        className={props.classes.root}
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        InputProps={{
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
