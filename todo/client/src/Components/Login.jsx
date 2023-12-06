import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate=useNavigate()

    const handleSign=()=>{
        let obj={
            email:email,
            password:password
        }
    
        fetch("http://localhost:5000/auth/login",{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            console.log(res)
            if(res.msg==="No such user is present"){
                alert('No such user is present')
            }else if(res.msg==="Login Successfull"){
                
                alert("Login Successfull")
                navigate("/todo")
            }
        }).catch(err=>{
            console.log(err)
        })
      }
  return (
    <div>
      Email:{" "}
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      Password:{" "}
      <input
        type="text"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSign}>
        Login
      </button>
    </div>
  )
}

export default Login
