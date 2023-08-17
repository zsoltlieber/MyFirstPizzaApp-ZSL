const Header = ({ setRightBlock, actualClientSet, setActualClientData }) => {

    return (
        <div className="navbar">
            <a href="/" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                {actualClientSet.bossStatus === true
                    ?
                    <button className="btn" value="boss" onClick={(e) => setRightBlock(e.target.value)} >BOSS</button >
                    : <></>}
                {actualClientSet.bossStatus !== true && actualClientSet.staffStatus === true
                    ?
                    <button className="btn" value="staff" onClick={(e) => setRightBlock(e.target.value)} >STAFF</button >
                    : <></>}
                {actualClientSet.clientName === ""
                    ?
                    <>
                        <button className="btn" value="signin" onClick={(e) => setRightBlock(e.target.value)} >SIGN IN</button >
                        <button className="btn" value="login" onClick={(e) => setRightBlock(e.target.value)}>LOG IN</button >
                    </>
                    : <></>}
                <button className="btn" value="order" onClick={(e) => setRightBlock(e.target.value)}>ORDERS</button >
                <button className="btn" value="message" onClick={(e) => setRightBlock(e.target.value)}>MESSAGE</button >
                <button className="btn" value="about" onClick={(e) => setRightBlock(e.target.value)} >ABOUT</button >
                {actualClientSet.clientName !== ""
                    ?
                    <button className="btn" value="logout" onClick={() => {
                        const actualClient = {
                            clientName: "",
                            clientId: "",
                            staffStatus: false,
                            bossStatus: false
                        }
                        setTimeout(() => {
                            setRightBlock("about")
                        }, 2000);
                        setActualClientData(actualClient)
                    }} >LOG OUT</button >
                    : <></>}
            </div>
        </div >
    )
}

export default Header