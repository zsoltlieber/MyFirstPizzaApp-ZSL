import Button from "./Button"
const Header = (props) => {
    return (
        <div className="navbar">
            <a href="/home" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                <a href="http://localhost:8080/api/login">
                    <Button buttonText="LOG_IN" buttonId="login" />
                </a>
                <Button buttonText="ABOUT" buttonId="about" />
            </div>
        </div>
    )
}

export default Header