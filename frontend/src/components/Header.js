import Button from "./Button"
const Header = (props) => {
    return (
        <div className="navbar">
            <a href="/home" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>

                <Button buttonText="SIGN IN" buttonId="register-btn" />
                <Button buttonText="LOG IN" buttonId="login-btn" />
                <Button buttonText="ABOUT US" buttonId="about" />
            </div>
        </div>
    )
}

export default Header