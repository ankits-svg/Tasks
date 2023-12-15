import React from 'react'
import style from './Left.module.css'
import image from "../../assets/logo.png"

const Left = () => {
  return (
    <div className={style.certificate}>
      <div className={style.content}>
        <img src={image} alt="Company Logo" className={style.logo} />
        <div className={style.title}>CERTIFICATE</div>
        <div className={style.certify}>&#8277; &#8277; &#8277; This is to certify &#8277; &#8277; &#8277;</div>
        <div className={style.name}>Ankit Sharma</div>
        <div className={style.underline}></div>
        <div className={style.assessment}>
          has successfully cleared the assessment for the skill
        </div>
        <div className={style.language}>Python Programming</div>
        <div className={style.footer}>
          <div>
            <div className={style.underline1}>24 Oct 2023</div>
            <h4>Date</h4>
          </div>
          <div>
            <div className={style.underline1}>Karun Tadepalli</div>
            <h4>CEO & Co-founder</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Left
