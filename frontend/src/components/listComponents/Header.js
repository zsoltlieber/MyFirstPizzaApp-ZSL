const Header = ({ setRightBlock }) => {

    return (
        <div className="navbar">
            <a href="/" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                {localStorage.getItem("boss_myapp") === true
                    ?
                    <button className="btn" value="boss" onClick={(e) => setRightBlock(e.target.value)} >BOSS</button >
                    : <></>}
                {localStorage.getItem("staff_myapp") === true
                    ?
                    <button className="btn" value="staff" onClick={(e) => setRightBlock(e.target.value)} >STAFF</button >
                    : <></>}
                <button className="btn" value="signin" onClick={(e) => setRightBlock(e.target.value)} >SIGN IN</button >
                <button className="btn" value="login" onClick={(e) => setRightBlock(e.target.value)}>LOG IN</button >
                <button className="btn" value="order" onClick={(e) => setRightBlock(e.target.value)}>ORDERS</button >
                <button className="btn" value="message" onClick={(e) => setRightBlock(e.target.value)}>MESSAGE</button >
                <button className="btn" value="about" onClick={(e) => setRightBlock(e.target.value)} >ABOUT US</button >
                {localStorage.getItem("userId_myapp") !== null
                    ?
                    <button className="btn" value="logout" onClick={() => {
                        localStorage.removeItem("userName_myapp")
                        localStorage.removeItem("userId_myapp")
                        localStorage.removeItem("staff_myapp")
                        localStorage.removeItem("boss_myapp")
                    }} >LOG OUT</button >
                    : <></>}
            </div>
        </div >
    )
}

export default Header