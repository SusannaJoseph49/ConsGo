import React, {useState} from "react";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {motion} from "framer-motion";
import { buttonClick } from "../animations";
import {useNavigate} from "react-router-dom";

import {
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword
} from "firebase/auth";
import {app} from "../config/firebase.config";
import { validateUserJWTToken } from "../api";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_password] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();

  const loginWithGoogle = async () =>{
    await signInWithPopup(firebaseAuth, provider).then(userCred => {
      firebaseAuth.onAuthStateChanged((cred) =>{
        if(cred){
          cred.getIdToken().then((token)=>{
            validateUserJWTToken(token).then(data => {
              console.log(data);
            });
            navigate("/", {replace : true});
          });
        }
      });
    });
  };
  
  const signUpWithEmailPass = async () =>{
    if(userEmail ==="" || password==="" || confirm_password===""){
      //alert mess
    }else{
      if(password===confirm_password){
        setUserEmail("");
        setConfirm_password("");
        setPassword("");
        await createUserWithEmailAndPassword (
          firebaseAuth, 
          userEmail, 
          password
        ).then( (userCred) =>{
          firebaseAuth.onAuthStateChanged((cred) =>{
            if(cred){
              cred.getIdToken().then((token)=>{
                validateUserJWTToken(token).then((data) => {
                  console.log(data);
                });
                navigate("/", {replace : true});
              });
            }
          });
        });
      }else{
  //alert mess
      }
    }
  };

  const signInWithEmailPass = async () =>{
    if( userEmail !=="" && password!=="") {
      await signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if(cred){
              cred.getIdToken().then((token) =>{
                validateUserJWTToken(token).then((data) => {
                  console.log(data);
                });
                navigate("/", {replace : true});
              });
            }
          });
        }
      );
    } else {

    }
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex justify-center items-center">
     {/*content box*/}
     <div className="rounded-xl flex flex-col items-center bg-slate-100 w-[46%] h-[80%] p-6 pt-8">
      <p className="text-3xl font-medium">
        {isSignUp ? "Create an account" : "Log in to existing account"}
      </p>
      <p className="pt-4">
        Enter your details below
      </p>
       {/*input section*/}
       <div className="w-full flex flex-col items-center justify-center gap-6 px-4 pt-16 md:px-12 py-4">
        <LoginInput 
        placeHolder={"Enter Email"} 
        icon={<FaEnvelope className="text-xl text-slate-500"/>} 
        inputState={userEmail} 
        inputStateFunc={setUserEmail} 
        type="email" 
        isSignUp={isSignUp}
        />
        <LoginInput 
        placeHolder={"Enter Password"} 
        icon={<FaLock className="text-xl text-slate-500"/>} 
        inputState={password} 
        inputStateFunc={setPassword} 
        type="password" 
        isSignUp={isSignUp}
        />
        {isSignUp && (
          <LoginInput 
          placeHolder={"Re-enter Password"} 
          icon={<FaEnvelope className="text-xl text-slate-500"/>} 
          inputState={confirm_password} 
          inputStateFunc={setConfirm_password} 
          type="password" 
          isSignUp={isSignUp}
          />
        )}
        {/*Submit button*/}
        
        {isSignUp ? (
        <motion.button 
        {...buttonClick} 
        className="w-full px-4 py-2 rounded-md cursor-pointer bg-blue-400 text-white text-xl capitalize hover:bg-blue-500 transition-all duration-150"
        onClick={signUpWithEmailPass}
        >
          Create Account
        </motion.button>
        ) : (
        <motion.button 
        {...buttonClick} 
        onClick={signInWithEmailPass}
        className="w-full px-4 py-2 rounded-md cursor-pointer bg-blue-400 text-white text-xl capitalize hover:bg-blue-500 transition-all duration-150">
          Log in
        </motion.button>
        )}
        <motion.div 
        {...buttonClick}
        className="flex items-center cursor-pointer rounded-lg justify-center gap-4 w-full py-2 border-2 border-slate-400"
        onClick={loginWithGoogle}
        >
        <FcGoogle className="text-3xl"/>
        <p className="capitalize text-base text-headingColor">
          Sign Up with Google
        </p>
        </motion.div>
        
        {!isSignUp ? (
          <p>
          New here?&nbsp; &nbsp;
          <motion.button 
          className="underline cursor-pointer" {...buttonClick}
          onClick={() => setIsSignUp(true)}
          >
            Sign Up
          </motion.button>
          </p>
         ) : (
         <p>
          Already have an account?&nbsp; &nbsp;
          <motion.button 
          className="underline cursor-pointer" {...buttonClick}
          onClick={() => setIsSignUp(false)}
          >
            Log in
          </motion.button>
         </p>
        )}
       </div>
        

       
     </div>
    </div>
  )
}

export default Login;
