import React from 'react'
import style from './Right.module.css'

const Right = () => {
  return (
    <div className={style.certificate}>
      <div className={style.content}>
        {/* ... (previous content) */}

        {/* Share Section */}
        <div className={style.sharesection}>
          <p>Share this certificate</p>
          <button>Facebook</button>
          <button>Twitter</button>
          <button>LinkedIn</button>
        </div>

        {/* Copy Link Section */}
        <div className={style.copylinksection}>
          <input type="text" value="Certificate Link" readOnly />
          <button>Copy Link</button>
        </div>

        {/* Title Section */}
        <div className={style.titlesection}>Certificate of Achievement</div>

        {/* Body Section */}
        <div className={style.bodysection}>
          <p>
            This is to certify that Ankit Sharma has successfully cleared the assessment for the skill in Python Programming.
          </p>
          {/* Additional body content goes here */}
        </div>

        {/* ... (previous content) */}
      </div>
    </div>
  )
}

export default Right
