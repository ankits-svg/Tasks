import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";

const Todo = () => {
    const [data,setData]=useState([])
  const [title, setTitle] = useState("");
  const [des,setDes]=useState("")
  
  

  const getdata=()=>{
    fetch("http://localhost:5000/app/read").then(res=>res.json()).then(res=>{
        // console.log(res)
        setData(res.Data)
    }).catch(err=>{
        console.log(err)
    })
  }
  useEffect(()=>{
    getdata()
  },[])
  const handleAddtask=()=>{
    // console.log(title)
    const obj={
        title:title,
        des:des,
        status:false
    }
    if(obj.title!=="" && obj.des!==""){
        fetch("http://localhost:5000/app/add",{
        body:JSON.stringify(obj),
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>res.json()).then(res=>{
        // console.log(res)
        setData(res.Data)
        getdata(data)
        setTitle('')
        setDes('')
    }).catch(err=>{
        console.log(err)
    })
    
    }else{
        alert('Add your task first then submit it')
    }
  }
  return (
    <>
    <h1>Todo Applications</h1>
    <>
    <div>
      Title:<input
        type="text"
        placeholder="Enter the task here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      Description:<input
        type="text"
        placeholder="Enter the description here"
        value={des}
        onChange={(e) => setDes(e.target.value)}
        required
      />
      <button onClick={handleAddtask}>Add Task</button>
    </div>
    <TodoList data={data} getdata={getdata}/>
    </>
    </>
  );
};

export default Todo;
