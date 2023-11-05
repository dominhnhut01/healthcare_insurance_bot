import { useState } from "react";
import { useRoutes, useNavigate } from "react-router-dom";
import Upload from "./pages/Upload.jsx";
import ChatContainer from "./components/ChatContainer";
import LandingPage from "./pages/LandingPage.jsx";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import Backdrop from "@mui/material/Backdrop";

function App() {
  // file Object
  const [file, setFile] = useState(null);
  // open state for dialog
  const [open, setOpen] = useState(true); // Controls whether the upload dialog is open

  const navigate = useNavigate();

  const handleUpload = (uploadFileUrl) => {
    setFile(uploadFileUrl);
    console.log(uploadFileUrl);
    setOpen(false);
    alert("File uploaded successfully");
    // navigate('/display')
  };

  const handleClose = () => {
    alert("File upload cancelled. Please upload a file.");
  };

  const element = useRoutes([
    {
      path: '/',
      element: <LandingPage />,
    },
    {
      path: '/chat',
      element: (
        !open ? <ChatContainer />
        :
        (
          <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Upload your EOC Document to start</DialogTitle>
              <DialogContent>
                <Upload onUpload={handleUpload} />
              </DialogContent>
            </Dialog>
          </Backdrop>
        )
      ),
    }
  ]);


  return (
    <>
      {element}
    </>
  );
}

export default App;
