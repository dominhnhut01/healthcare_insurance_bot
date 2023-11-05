import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

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
  });

  const navigate = useNavigate();

  const handleUpload = async () => {
    const file = acceptedFiles[0];
    setFile(file);
    if (file) {
      try {
        socket.emit("upload", file, (status) => {
          console.log(status.succeed);
        });
        onUpload();
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
      <input type="file" {...getInputProps()} name="file" />
      <p>Drag 'n' drop some files here, or click to select files</p>
      {error && <p>{error}</p>}
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Upload;
