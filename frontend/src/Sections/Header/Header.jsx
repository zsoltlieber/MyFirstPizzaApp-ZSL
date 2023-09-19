import { useContext } from 'react'
import { MainContext } from '../../mainContext.js'
import { useRightColumnType } from '../../contexts/RightColumnTypeContextProvider.jsx';

const Header = () => {
    const { actualClientData, setActualClientData } = useContext(MainContext);
    const rightColumnTypeHandler = useRightColumnType();

    return (
        <>
            <div>{/* 
                <h1> <a href="/" id="home" >HOME</a> </h1> */}
                <h1> HOME </h1>
            </div>

            <h1>THE BEST PIZZA Co.</h1>

            <div>
                {actualClientData.clientName !== undefined && actualClientData.clientName !== ""
                    ?
                    <h2>HELLO {actualClientData.clientName}</h2>
                    :
                    <h3>IF YOU WANT TO ORDER<br /> YOU MUST BE LOGED IN!</h3>}
            </div>
            <div id='header-btn-box'>
                <div>

                    {actualClientData.bossStatus === true
                        ?
                        <button className="btn" value="boss" onClick={(e) => rightColumnTypeHandler.setRightColumnType(e.target.value)} >BOSS</button >
                        : <></>}
                    {actualClientData.bossStatus !== true && actualClientData.staffStatus === true
                        ?
                        <button className="btn" value="staff" onClick={(e) => rightColumnTypeHandler.setRightColumnType(e.target.value)} >STAFF</button >
                        : <></>}

                </div>
                {actualClientData.clientName === undefined || actualClientData.clientName === ""
                    ?
                    <>
                        <button className="btn" value="signin" onClick={(e) => rightColumnTypeHandler.setRightColumnType(e.target.value)} >REGISTER</button >
                        <button className="btn" value="login" onClick={(e) => rightColumnTypeHandler.setRightColumnType(e.target.value)}>LOG IN</button >
                    </>
                    : <></>}
                {actualClientData.clientName !== undefined && actualClientData.clientName !== ""
                    ?
                    <button className="btn" value="order-form" onClick={(e) => rightColumnTypeHandler.setRightColumnType(e.target.value)}>ORDER</button >
                    : <></>}
                <button className="btn" value="message" onClick={(e) => rightColumnTypeHandler.setRightColumnType(e.target.value)}>MESSAGE</button >
                <button className="btn" value="about" onClick={(e) => rightColumnTypeHandler.setRightColumnType(e.target.value)} >ABOUT</button >
                {actualClientData.clientName !== undefined && actualClientData.clientName !== ""
                    ?
                    <button className="btn" value="logout" onClick={() => {

                        setTimeout(() => {
                            rightColumnTypeHandler.setRightColumnType("about")
                            setActualClientData({ clientName: "" });
                        }, 1000);
                    }} >LOG OUT</button >
                    : <></>}
            </div>
        </ >
    )
}

export default Header