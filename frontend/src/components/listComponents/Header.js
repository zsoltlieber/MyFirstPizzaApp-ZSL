const Header = ({ setRightColumnTypeData, logoutClientSet, setClientLogout, actualClientSet, showOrderListSet }) => {

    return (
        <div className="navbar">
            <a href="/" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                {actualClientSet.clientName !== ""
                    ? <h4>DEAR {actualClientSet.clientName} !</h4>
                    : <></>
                }
            </div>
            <div>
                {actualClientSet.bossStatus === true
                    ?
                    <button className="btn" value="boss" onClick={(e) => setRightColumnTypeData(e.target.value)} >BOSS</button >
                    : <></>}
                {actualClientSet.bossStatus !== true && actualClientSet.staffStatus === true
                    ?
                    <button className="btn" value="staff" onClick={(e) => setRightColumnTypeData(e.target.value)} >STAFF</button >
                    : <></>}
                {actualClientSet.clientName === ""
                    ?
                    <>
                        <button className="btn" value="signin" onClick={(e) => setRightColumnTypeData(e.target.value)} >REGISTER</button >
                        <button className="btn" value="login" onClick={(e) => setRightColumnTypeData(e.target.value)}>LOG IN</button >
                    </>
                    : <></>}
                {actualClientSet.clientName !== ""
                    ?
                    <button className="btn" value="order-form" onClick={(e) => setRightColumnTypeData(e.target.value)}>ORDERING</button >
                    : <></>}
                {showOrderListSet
                    ?
                    <button className="btn" value="order-list" onClick={(e) => setRightColumnTypeData(e.target.value)}>ORDERS</button >
                    : <></>}
                <button className="btn" value="message" onClick={(e) => setRightColumnTypeData(e.target.value)}>MESSAGE</button >
                <button className="btn" value="about" onClick={(e) => setRightColumnTypeData(e.target.value)} >ABOUT</button >
                {!logoutClientSet
                    ?
                    <button className="btn" value="logout" onClick={() => {

                        setTimeout(() => {
                            setRightColumnTypeData("about")
                            setClientLogout(true)
                        }, 1000);
                    }} >LOG OUT</button >
                    : <></>}
            </div>
        </div >
    )
}

export default Header