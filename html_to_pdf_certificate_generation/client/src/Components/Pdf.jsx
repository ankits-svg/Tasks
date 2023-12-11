import React from 'react'
import Left from './Left/Left.jsx'
import Right from './Right/Right.jsx'

const Pdf = () => {
  return (
    <div style={{ border:"1px solid red",display: 'flex', width: '90%', margin: '20px auto',gap:"10px" }}>
      {/* Left Box (70%) */}
      <div style={{ border:"1px solid black", flex: '60%', backgroundColor: 'lightblue', padding: '20px' }}>
        <Left/>
      </div>

      {/* Right Box (30%) */}
      <div style={{border:"1px solid blue", flex: '30%', backgroundColor: 'lightgreen', padding: '20px' }}>
        <Right/>
      </div>
    </div>
  )
}

export default Pdf
