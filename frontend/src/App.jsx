import { useState } from 'react'
import { useRoutes, useNavigate } from 'react-router-dom'

import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Upload from './pages/Upload.jsx'
// import Display from './pages/Display.jsx'

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
    // {
    //   path: '/display',
    //   element: file ? <Display file = {file} /> : null,
    // }
  ])

  return (
    <>
      {element}
    </>
  )
}

export default App