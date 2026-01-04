import {auth} from '../firebase'; 
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react'
import {toast} from "react-toastify"
import {signOut} from 'firebase/auth';


// react-firebase-hooks==> we use this hooks for not every time user need to sign in;
//it will check before the ending cookie or session end the user was there then
//user going to dashboard page without authenticate.

const Header = () => {
  const [user, loading] = useAuthState(auth) 
  const navigate = useNavigate();

   useEffect(() => {
    if(user){
      navigate('/dashboard')
    }
  }, [user, loading])
  
  const logoutFnc = () => {
    try {
      signOut(auth)
      .then(() => {
        toast.success("Logout Successfully")
        navigate("/")
      })
      .catch((error) => {
         toast.error(error.message)

      })
    } catch (error) {
      toast.error(error.message);
    }
  }

  const handleClick = () => {
      alert("logout")
  }

  return (
    <div className='flex items-center justify-between p-4 bg-gray-100'>
      <h1 className='text-4xl font-bold text-red-900'>Fainancly</h1>
      <p onClick={logoutFnc}>Logout</p>
    </div>
  )
}

export default Header