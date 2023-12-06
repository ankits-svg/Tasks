import React, { useState } from 'react'

const Metric = () => {
    const [digit,setDigit]=useState(0)
    const [from,setFrom]=useState("")
    const [to,setTo]=useState("")
    const [ans,setAns]=useState()

    const handleConvert=()=>{
        let obj={
            digit:digit,
            from:from,
            to:to
        }
        fetch('http://localhost:2000/met/',{
            method:"POST",
            body:JSON.stringify(obj),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            console.log(res.msg)
            setAns(res.data)
            setDigit(0)
            setFrom("")
            setTo("")
        }).catch(err=>{
            console.log(err)
        })
    }
  return (
    <div>
        <div>
      Digit:<input type="text" placeholder='Enter the digit' value={digit} onChange={(e)=>setDigit(e.target.value)}/>
      From:<input type="text" placeholder='From' value={from} onChange={(e)=>setFrom(e.target.value)}/>
      To:<input type="text" placeholder='To' value={to} onChange={(e)=>setTo(e.target.value)}/>
      <button onClick={handleConvert}>Convert</button>
    </div>
    <div>{ans}</div>
    </div>
  )
}

export default Metric
