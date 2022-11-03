import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

const App = () => {
  

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () =>{
    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname="/login"
    })
  }

  return (
    <>
    
    <Router>

            {/* NAVBAR DETAILS HERE */}

        <Navbar bg="light" expand="lg" className='my-navbar'>
          <Container>
            <Navbar.Brand href="/">Timmy's Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Link className='nav-link' style={{color:'green'}} to="/">Home</Link>      
                {!isAuth ? (
          <Link className='nav-link' style={{color:'green'}} to="/login"> Login </Link>
        ) : (
          <>
            <Link className='nav-link' to="/createpost" style={{color:'green'}}> Create-a-Post </Link>
            <button className='nav-link btn-logout' onClick={signUserOut}> Log Out</button>
          </>
        )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

            {/* MAIN SITE DETAILS OVER HERE */}

      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>}/>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth} />}/>
      </Routes>
    </Router>
    </>
    
      
      
  )
}

export default App