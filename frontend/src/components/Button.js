const Button = ({ buttonText, buttonValue, buttonColor, setRightBoxForm }) => {

    function buttonEffect(e) {
        console.log(e.target.value);
        setRightBoxForm=e.target.value
    }

    return (
        <>
            <button className="btn" style={{ backgroundColor: buttonColor, cursor: "pointer" }} onClick={buttonEffect} value={buttonValue}> {buttonText}</button >
        </ >
    )
}

export default Button