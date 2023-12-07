import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const navigate=useNavigate()

  const handleSign=()=>{
    let obj={
        email:email,
        password:password,
        company:company
    }

    if(obj.email!=="" && obj.password!=="" && obj.company!==""){
      fetch("http://localhost:5000/auth/signup",{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(res=>{
        // console.log(res)
        alert("Registeration Successfull")
        navigate("/login")
    }).catch(err=>{
        console.log(err)
    })
    }else{
      alert("Please fill the detail for signup")
    }
  }
  return (
    <>
    <h1>Register Here</h1>
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
      Company Name:{" "}
      <input
        type="text"
        placeholder="Enter your company name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <button onClick={handleSign}>
        SignUp
      </button>
    </div>
    </>
  );
};

export default Signup;
