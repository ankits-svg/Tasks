import React, { useState } from 'react'

const TodoList = ({data},getdata) => {
    console.log("list:",data)
    
    const [toggle,setToggle]=useState(null)


    const handleToggle=(id)=>{
        console.log(id)

        fetch(`http://localhost:5000/app/update/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            console.log(res.Data.status)
            // setData(res.Data)
            setToggle(!res.Data.status)
        }).catch(err=>{
            console.log(err)
        })
      }

      const handleRemove=(id)=>{
        console.log(id)
        fetch(`http://localhost:5000/app/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            console.log(res.Data)
            getdata(data)
            // setData(res.Data)
            // setToggle(!res.Data.status)
        }).catch(err=>{
            console.log(err)
        })
      }

  return (
    <div>
    {data.length>0 && data.map(e=>{
        return <div key={e._id}>
            <div>
            {e.title}---{e.des}
            <button onClick={()=>handleToggle(e._id)}>
            {e.status===toggle ? "Pending" : "Completed"}
            </button>
            <button onClick={()=>handleRemove(e._id)}>Remove</button>
            </div>
        </div>
    })}
    </div>
  )
}

export default TodoList
