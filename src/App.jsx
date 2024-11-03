import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import Contact from './pages/Contact'
import Header from './static/Header'
import Footer from './static/Footer'
import './App.css'

function App() {

  return (
    <>

    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/aboutpage' element={<AboutPage/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      <Footer/>
    </BrowserRouter>
        
    </>
  )
}

export default App
