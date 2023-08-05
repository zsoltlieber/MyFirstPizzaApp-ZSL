const Header = ({ setRightBlockForm }) => {

    return (
        <div className="navbar">
            <a href="/" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                <button className="btn" value="signin" onClick={(e) => setRightBlockForm(e.target.value)} >SIGN IN</button >
                <button className="btn" value="login" onClick={(e) => setRightBlockForm(e.target.value)}>LOG IN</button >
                <button className="btn" value="about" onClick={(e) => setRightBlockForm(e.target.value)} >ABOUT US</button >
            </div>
        </div>
    )
}

export default Header