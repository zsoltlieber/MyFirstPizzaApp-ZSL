import { useContext } from 'react'
import { MainContext } from './../../mainContext.js'

const Header = () => {
    const { actualClientData, setActualClientData, setRightColumnType } = useContext(MainContext);

    return (
        <div className="navbar">
            <a href="/" id="home" >HOME</a>
            <div>
                THE BEST PIZZA Co.
            </div>
            <div>
                {actualClientData !== undefined && actualClientData.clientName !== ""
                    ?
                    <span>HELLO {actualClientData.clientName}</span>
                    : <></>}
            </div>
            <div>
                {actualClientData.bossStatus === true
                    ?
                    <button className="btn" value="boss" onClick={(e) => setRightColumnType(e.target.value)} >BOSS</button >
                    : <></>}
                {actualClientData.bossStatus !== true && actualClientData.staffStatus === true
                    ?
                    <button className="btn" value="staff" onClick={(e) => setRightColumnType(e.target.value)} >STAFF</button >
                    : <></>}
                {actualClientData.clientName === ""
                    ?
                    <>
                        <button className="btn" value="signin" onClick={(e) => setRightColumnType(e.target.value)} >REGISTER</button >
                        <button className="btn" value="login" onClick={(e) => setRightColumnType(e.target.value)}>LOG IN</button >
                    </>
                    : <></>}
                {actualClientData.clientName !== ""
                    ?
                    <button className="btn" value="order-form" onClick={(e) => setRightColumnType(e.target.value)}>ORDERING</button >
                    : <></>}
                <button className="btn" value="message" onClick={(e) => setRightColumnType(e.target.value)}>MESSAGE</button >
                <button className="btn" value="about" onClick={(e) => setRightColumnType(e.target.value)} >ABOUT</button >
                {actualClientData.clientName !== ""
                    ?
                    <button className="btn" value="logout" onClick={() => {

                        const emptyClient = {
                            clientName: "",
                            clientId: "",
                            staffStatus: false,
                            bossStatus: false
                        }

                        setTimeout(() => {
                            setRightColumnType("about")
                            setActualClientData(emptyClient)
                        }, 1000);
                    }} >LOG OUT</button >
                    : <></>}
            </div>
        </div >
    )
}

export default Header