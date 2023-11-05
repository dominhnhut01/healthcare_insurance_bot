import { useState } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import Upload from './pages/Upload.jsx'
// import Display from './pages/Display.jsx'
import ChatContainer from './components/ChatContainer';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog'
import Backdrop from '@mui/material/Backdrop';

// import './App.css'

function App() {
  // file Object
  const [file, setFile] = useState(null)
  // open state for dialog
  const [open, setOpen] = useState(true)  // Controls whether the upload dialog is open

  const navigate = useNavigate()

  const handleUpload = (uploadFileUrl) => {
    setFile(uploadFileUrl)
    console.log(uploadFileUrl)
    setOpen((prev) => !prev)
    alert('File uploaded successfully')
    // navigate('/display')
  }

  const handleClose = () => {
    setOpen(false)
  }

  let element = useRoutes([
    {
      path: '/',
      // element: <Upload onUpload={handleUpload} />,
      element: (
        <>
          {file ? <ChatContainer /> : null}
          <Backdrop open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Upload a File</DialogTitle>
              <DialogContent>
                <Upload onUpload={handleUpload} />
              </DialogContent>
            </Dialog>
          </Backdrop>
        </>
      ),
    },
    // {
    //   path: '/chat',
    //   element: <ChatContainer />,
    // }
  ])

  return (
    <>
      {element}
    </>
  );
}

export default App;
