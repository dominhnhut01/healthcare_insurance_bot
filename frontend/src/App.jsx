import { useState } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'
import Upload from './pages/Upload.jsx'
// import Display from './pages/Display.jsx'
import ChatContainer from './components/ChatContainer';

import './App.css'

function App() {
  const [file, setFile] = useState(null)
  const navigate = useNavigate()

  const handleUpload = (uploadFileUrl) => {
    setFile(uploadFileUrl)
    navigate('/display')
  }

  let element = useRoutes([
    {
      path: '/',
      element: <Upload onUpload={handleUpload} />,
    },
    {
      path: '/chat',
      element: <ChatContainer />,
    }
  ])

  return (
    <>
      {element}
    </>
  );
}

export default App;
