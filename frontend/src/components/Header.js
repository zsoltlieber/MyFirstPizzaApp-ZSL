import Button from "./Button"
const Header = (props) => {
    return (
        <div className="navbar">
            <a href="/home" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                <Button buttonText="LOG IN" buttonId="login" />
                <Button buttonText="ORDER" buttonId="order" />
                <Button buttonText="CONTACT" buttonId="contact" />
                <Button buttonText="ABOUT" buttonId="about" />
            </div>
        </div>
    )
}

export default Header