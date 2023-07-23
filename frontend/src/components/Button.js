import React from 'react'

const Button = ({ buttonText, buttonId, buttonColor }) => {
    return (
        <>
            <button className="btn" id={buttonId} style={{ backgroundColor: buttonColor }}> { buttonText }</button >
        </ >
    )
}

export default Button