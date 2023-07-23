import Button from "./Button"
const Header = (props) => {
    return (
        <div className="navbar">
            <div id="home" >HOME</div>
            <div>
                THE BEST PIZZA Co. {props.title}
            </div>
            <div>
                <Button buttonText="LOG IN" buttonId="login" />
                <button className="btn" id="order">ORDER</button>
                <button className="btn" id="contact">CONTACT</button>
                <button className="btn" id="about">ABOUT</button>
            
            </div>
        </div>
    )
}

export default Header