import React, { useState } from 'react'
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import {doc, getDoc, setDoc} from "firebase/firestore"; // ✅ Added imports
import {toast} from "react-toastify"
import {auth, db} from '../firebase' // ✅ Added db import

const CustomInput = ({label, state, setState, placeholder, type = "text"}) => {
  return (
    <div className="mb-5">
      <p className="text-gray-600 text-xs mb-1.5">{label}</p>
      <input 
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder}
        className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent text-gray-700 placeholder-gray-400 text-sm"
      />
    </div>
  )
}

const SignupSignin = () => {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [isLogin, setIsLogin] = useState(false)
  const [loading, setLoading] = useState(false);

  
  const singinWithEmail = () => {
    setLoading(true);
    if(fields.email !== "" && fields.password !== ""){
      signInWithEmailAndPassword(auth, fields.email, fields.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User logged in:", user);
          toast.success("Logged in successfully!");
          setLoading(false);
          // ✅ REMOVED createDoc(user) - not needed during login
          setFields({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          })
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.error("Login error:", errorMessage);
          toast.error("Failed to login: " + errorMessage);
          setLoading(false);
        });
    } else {
      toast.error("Please fill all fields");
      setLoading(false)
    }
  }

  const signupWithEmail = () => {
    setLoading(true);
    
    if(fields.name !== "" && fields.email !== "" && fields.password !== "" && fields.confirmPassword !== ""){
      
      // Check if passwords match
      if(fields.password !== fields.confirmPassword){
        toast.error("Passwords do not match!");
        setLoading(false);
        return;
      }

      createUserWithEmailAndPassword(auth, fields.email, fields.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log("User created:", user);
          toast.success("User Created Successfully!");
          setLoading(false);
          
          createDoc(user); // ✅ Create doc only during signup
          
          setFields({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error:", errorCode, errorMessage);
          toast.error("Failed to create user: " + errorMessage);
          setLoading(false);
        });

    } else {
      toast.error("Please fill all fields");
      setLoading(false);
    }
  }

  const createDoc = async(user) => {
    if(!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if(!userData.exists()){
      try {
        await setDoc(doc(db, "users", user.uid),{
          name: fields.name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(), // ✅ Fixed typo: cretedAt -> createdAt
        })
        toast.success("Doc created!");
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      toast.error("Doc already exists");
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-10 w-full max-w-md mx-auto">
        <div className="bg-blue-500 text-white text-center py-2.5 px-6 rounded-lg mb-8">
          <h1 className="text-lg font-semibold">
            {isLogin ? 'Sign In to Financely.' : 'Sign Up on Financely.'}
          </h1>
        </div>

        <div className="space-y-1">
          {!isLogin && (
            <CustomInput 
              label="Full Name" 
              state={fields.name} 
              setState={(value) => setFields(prev => ({...prev, name: value}))}
              placeholder="John Doe"
            />
          )}

          <CustomInput 
            label="Email" 
            state={fields.email} 
            setState={(value) => setFields(prev => ({...prev, email: value}))}
            placeholder="JohnDoe@gmail.com"
            type="email"
          />

          <CustomInput 
            label="Password" 
            state={fields.password} 
            setState={(value) => setFields(prev => ({...prev, password: value}))}
            placeholder="Example123"
            type="password"
          />

          {!isLogin && (
            <CustomInput 
              label="Confirm Password" 
              state={fields.confirmPassword} 
              setState={(value) => setFields(prev => ({...prev, confirmPassword: value}))}
              placeholder="Example123"
              type="password"
            />
          )}
        </div>

        <button 
          disabled={loading}
          onClick={isLogin ? singinWithEmail : signupWithEmail}
          className="w-full mt-6 py-3 px-6 bg-white text-blue-500 border border-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading 
            ? "Loading..." 
            : (isLogin
              ? 'Sign In with Email and Password' 
             : 'Sign Up with Email and Password'
            )
          }
        </button>

        <div className="text-center my-4">
          <span className="text-gray-400 text-xs">or</span>
        </div>

        <button 
          disabled={loading}
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
         {loading 
          ? "Loading..." 
          : (isLogin 
             ? 'Sign In with Google' 
             : 'Sign Up with Google'
          )
         }
        </button>

        <p className="text-center text-gray-500 text-xs mt-5">
          {isLogin ? "Don't Have An Account Already? " : "Or Have An Account Already? "}
          <span 
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 cursor-pointer hover:underline font-medium"
          >
            Click Here
          </span>
        </p>
      </div>
    </div>
  )
}

export default SignupSignin