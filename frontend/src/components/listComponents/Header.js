import { useState, useEffect } from "react"

const Header = ({ setRightBlock, setUserRoll, actualUserRoll }) => {

    const [buttonShow, setButtonShow] = useState();

    const logout = () => {
        localStorage.removeItem("userName_myapp")
        localStorage.removeItem("userId_myapp")
        localStorage.removeItem("staff_myapp")
        localStorage.removeItem("boss_myapp")
        setUserRoll("");
    }

    useEffect(() => {
        setButtonShow(actualUserRoll);
    }, [actualUserRoll]);

    return (
        <div className="navbar">
            <a href="/" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                {buttonShow === "boss"
                    ?
                    <button className="btn" value="boss" onClick={(e) => setRightBlock(e.target.value)} >BOSS</button >
                    : <></>}
                {buttonShow === "staff"
                    ?
                    <button className="btn" value="staff" onClick={(e) => setRightBlock(e.target.value)} >STAFF</button >
                    : <></>}
                {buttonShow === ""
                    ?
                    <>
                        <button className="btn" value="signin" onClick={(e) => setRightBlock(e.target.value)} >SIGN IN</button >
                        <button className="btn" value="login" onClick={(e) => setRightBlock(e.target.value)}>LOG IN</button >
                    </>
                    : <></>}
                <button className="btn" value="order" onClick={(e) => setRightBlock(e.target.value)}>ORDERS</button >
                <button className="btn" value="message" onClick={(e) => setRightBlock(e.target.value)}>MESSAGE</button >
                <button className="btn" value="about" onClick={(e) => setRightBlock(e.target.value)} >ABOUT US</button >
                {buttonShow !== ""
                    ?
                    <button className="btn" value="logout" onClick={logout} >LOG OUT</button >
                    : <></>}
            </div>
        </div >
    )
}

export default Header