import { useState } from "react";
import { useDropzone } from "react-dropzone";
// import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import { Button } from "@mui/material";

const Upload = ({ onUpload }) => {
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: "application/pdf",
    onDropRejected: () =>
      setError(
        "File upload failed. Please make sure you are uploading a PDF file."
      ),
    onDropAccepted: () => setError(null),
    noClick: true,  // Prevents the input element from being clicked when the dropzone is clicked
    noKeyboard: true,  // Prevents the input element from being activated when the dropzone is focused
  });

  const handleUpload = async () => {
    const file = acceptedFiles[0];
    setFile(file);
    if (file) {
      try {
        socket.emit("upload", file, (status) => {
          console.log(status.succeed);
        });
        onUpload(file);
      } catch (error) {
        console.error("There was an error uploading the file:", error);
      }
    } else {
      setError("No file selected");
    }
  };

  return (
    <div {...getRootProps()}>
      {/* <input {...getInputProps()} /> */}
      <input type="file" {...getInputProps()} name="file" style={{ display: 'block' }}/>
      {/* Prevents the input from being clicked */}
      <p>Drag 'n' drop some files here, or click to select files</p>
      {error && <p>{error}</p>}
      <Button variant="contained" color="primary" onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default Upload;
