import { motion } from "framer-motion";
import React, { useState } from "react";
import { fadeInOut } from "../animations";
//import {icons} from "react-icons/lib";

const LoginInput = ({
    placeHolder, 
    icon, 
    inputState, 
    inputStateFunc, 
    type, 
    isSignUp}) => {
        const [isFocus, setIsFocus] = useState(false);
  return (
    <motion.div 
      {...fadeInOut}
      className={`flex items-center rounded-lg justify-center gap-4 w-full px-2 py-2 border-2 border-slate-400 ${isFocus ? "bg-blue-100" : "bg-none"}`}>
      {icon}
      <input 
      type={type} 
      placeholder={placeHolder} 
      className="w-full h-full bg-transparent text-black tect-lg font-regular border-none outline-none"
      value={inputState}
      onChange={(e) => inputStateFunc(e.target.value)}
      onFocus={()=> setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  )
}

export default LoginInput;
