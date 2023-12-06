import React from 'react'

const TodoList = ({data}) => {
    console.log("list:",data)
  return (
    <div>
    {data.length>0 && data.map(e=>{
        return <div key={e._id}>{e.title}---{e.des}---{e.status===true ? "Pending" : "Completed"}</div>
    })}
    </div>
  )
}

export default TodoList
