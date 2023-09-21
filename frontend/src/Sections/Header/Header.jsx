import { useRightColumnType } from '../../contexts/RightColumnTypeContextProvider.jsx';
import { useClientContext } from "../../contexts/ClientContextProvider.jsx";

const Header = () => {
    const { setRightColumnType } = useRightColumnType();
    const { actualClientData, setActualClientData } = useClientContext();

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
                        <button className="btn" value="boss" onClick={(e) => setRightColumnType(e.target.value)} >BOSS</button >
                        : null
                    }
                    {actualClientData.bossStatus !== true && actualClientData.staffStatus === true
                        ?
                        <button className="btn" value="staff" onClick={(e) => setRightColumnType(e.target.value)} >STAFF</button >
                        : null
                    }

                </div>
                {actualClientData.clientName === undefined || actualClientData.clientName === ""
                    ?
                    <>
                        <button className="btn" value="signin" onClick={(e) => setRightColumnType(e.target.value)} >REGISTER</button >
                        <button className="btn" value="login" onClick={(e) => setRightColumnType(e.target.value)}>LOG IN</button >
                    </>
                    : null
                }
                {actualClientData.clientName !== undefined && actualClientData.clientName !== ""
                    ?
                    <button className="btn" value="order-form" onClick={(e) => setRightColumnType(e.target.value)}>ORDER</button >
                    : null
                }
                <button className="btn" value="message" onClick={(e) => setRightColumnType(e.target.value)}>MESSAGE</button >
                <button className="btn" value="about" onClick={(e) => setRightColumnType(e.target.value)} >ABOUT</button >
                {actualClientData.clientName !== undefined && actualClientData.clientName !== ""
                    ?
                    <button className="btn" value="logout" onClick={() => {

                        setTimeout(() => {
                            setRightColumnType("about")
                            setActualClientData([]);
                        }, 1000);
                    }} >LOG OUT</button >
                    : null
                }
            </div>
        </ >
    )
}

export default Header