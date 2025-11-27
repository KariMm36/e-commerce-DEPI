import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Error from './Pages/Error.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "animate.css"


function App() {
  return (
    <>
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Error />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
