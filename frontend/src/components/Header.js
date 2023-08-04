import Button from "./Button"
const Header = (props) => {

    function loginBoxShow(e) {
        console.log(e.buttonId);
    }

    return (
        <div className="navbar">
            <a href="/" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                <Button buttonText="LOG IN" buttonId="login-btn" onClick={loginBoxShow} />
                <Button buttonText="ABOUT US" buttonId="about" />
            </div>
        </div>
    )
}

export default Header