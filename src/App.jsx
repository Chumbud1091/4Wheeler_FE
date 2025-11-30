import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserNavbar from './components/UI/NavBar/UserNavBar.jsx'
import Home from './components/pages/Home'
import Login from './components/pages/Login.jsx'

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/' element = {<Home/>}/>
        <Route path='/' element = {<Home/>}/>
      </Routes>
    </>
  )
}

export default App
