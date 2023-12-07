import React, { useState } from 'react'
import "./TodoList.css"

const TodoList = ({data,getdata}) => {
    // console.log("list:",data)
    
    const [toggle,setToggle]=useState(false)
    const [pending,setPending]=useState(0)
    const [comp,setComp]=useState(0)
    // const [status,setStatus]=useState("")

    const handleToggle=(id,status)=>{
        // console.log(id)

        fetch(`http://localhost:5000/app/update/${id}`,{
            method:"PATCH",
            body:JSON.stringify({status:!status}),
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            // console.log(res.Data.status)
            // setStatus(res.Data.status)
            getdata(data)
            
            // setToggle(!toggle)
        }).catch(err=>{
            console.log(err)
        })
      }

      const handleRemove=(id)=>{
        // console.log(id)
        fetch(`http://localhost:5000/app/delete/${id}`,{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            }
        }).then(res=>res.json()).then(res=>{
            // console.log(res.Data)
            // window.location.reload()
            getdata(data)
            // setData(res.Data)
            // setToggle(!res.Data.status)
        }).catch(err=>{
            console.log(err)
        })
      }

      const handleEdit=(id,e)=>{
        // console.log(e)
        const newtitle=window.prompt("Edit Your Title")
        const newdes=window.prompt("Edit Your Description")

        const obj={
            title:newtitle,
            des:newdes
        }

        // console.log(obj)

        fetch(`http://localhost:5000/app/update/${id}`,{
            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(obj)
        }).then(res=>res.json()).then(res=>{
            // console.log(res)
            alert(res.msg)
            getdata(data)
        }).catch(err=>{
            console.log(err)
        })
      }


  return (
    <div>
    {data.length>0 && data.map(e=>{
        return <div key={e._id} className={e.status ? 'completed' : ''}>
            <div>
            {e.title}---{e.des}
            <button onClick={()=>handleToggle(e._id,e.status)}>
            {e.status===toggle ? "Pending" : "Completed"}
            </button>
            <button onClick={()=>handleEdit(e._id,e)}>Edit</button>
            <button onClick={()=>handleRemove(e._id)}>Remove</button>
            </div>
        </div>
    })}
    </div>
  )
}

export default TodoList
