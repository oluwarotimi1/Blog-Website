import React from 'react'
import { auth, provider } from '../firebaseConfig'
import {signInWithPopup} from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import '../styles/login.css'

const Login = ({setIsAuth}) => {

  const navigate = useNavigate();

  const signInWithGoogle =()=>{
    signInWithPopup(auth, provider).then((result)=>{
      localStorage.setItem("isAuth", true)
      setIsAuth(true)
      navigate("/")
    })
  }
  return (
    <div className='d-flex justify-content-center align-items-center'
    style={{minHeight:'100vh'}}>
    <div className='w-100'
              style={{maxWidth:'300px'}}>
      <div className='login'>

        <div className='text-center'>
          <h2>Sign In With Google to Continue</h2>
          <button onClick={signInWithGoogle} className='btn btn-login'><FcGoogle style={{margin:'0 10px', fontSize:" 2rem"}} />Sign in with Google</button>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Login