import React from 'react'

const TextRow = ({ style, title, field, logo }) => {
    return (
        <div className="bio-row">
            <p className={style ? style : ''}><span>{title}</span> : &nbsp;  
                {logo ? (
                    <img src={`/images/companyLogo/${logo}`} style={{ height: '100px' }} alt="helo" />
                ) :
                     field} </p>
        </div>
    )
}

export default TextRow