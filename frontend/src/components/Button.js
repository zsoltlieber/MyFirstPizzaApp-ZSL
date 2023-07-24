import React from 'react'

const Button = ({ buttonText, buttonId, buttonColor }) => {

    function clickHandler(e) {
        console.log(e.target)
    }

    return (
        <>
            <button className="btn" id={buttonId} style={{ backgroundColor: buttonColor, cursor: "pointer" }} name={buttonId} onClick={clickHandler}> {buttonText}</button >
        </ >
    )
}

export default Button