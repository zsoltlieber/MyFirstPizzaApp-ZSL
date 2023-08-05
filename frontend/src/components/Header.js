import Button from "./Button.js"
const Header = () => {

    return (
        <div className="navbar">
            <a href="/" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                <Button buttonText="LOG IN" buttonValue="login" value="login" />
                <Button buttonText="ABOUT US" buttonValue="about" value="about-us" />
            </div>
        </div>
    )
}

export default Header