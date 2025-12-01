import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserNavbar from './components/UI/NavBar/UserNavBar.jsx'
import Home from './components/pages/Home'
import Login from './components/pages/Login.jsx'
import Contact from './components/pages/Contact.jsx'
import { ToastContainer } from 'react-toastify'
import SignUp from './components/pages/SignUp.jsx'

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          backgroundColor: '#fb923c',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(249, 115, 22, 0.25)'
        }}
      />
    </>
  )
}

export default App
