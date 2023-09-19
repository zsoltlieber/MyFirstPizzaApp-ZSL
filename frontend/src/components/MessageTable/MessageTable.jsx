import { useContext } from 'react';
import { MainContext } from "../../mainContext.js"
import { useMessageContext } from '../../contexts/MessageContextProvider.jsx';

export const MessageTable = ({ deleteMessageHandler, updateMessageHandler }) => {

    const { actualClientData } = useContext(MainContext);
    const { messageList, showMessageThanks } = useMessageContext()
    
    return (
        <>
            {messageList.length > 0 && !showMessageThanks
                ?
                < div id='message-list' >
                    <p style={{ textAlign: "center", fontSize: "20px", marginTop: "0" }} >MESSAGE LIST</p>

                    <table id="message-list-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>MESSAGE</th>
                                {actualClientData.clientName !== undefined
                                    ?
                                    <>
                                        <th></th>
                                        <th></th>
                                    </>
                                    : <></>}
                            </tr>
                        </thead>
                        {messageList.map((messageItem, index) => {
                            return (
                                <tbody key={index}>
                                    <tr key={index}>
                                        <td><p>{index + 1}.) {messageItem.clientName}</p></td>
                                        <td><p style={{ marginTop: "0px", maxWidth: "95%" }}>{messageItem.message}</p></td>
                                        {actualClientData.clientName !== undefined && (actualClientData.clientId === messageItem.clientId || actualClientData.staffStatus === true)
                                            ?
                                            <td >
                                                <button type="text" id="delete-btn" value={messageItem._id} onClick={(e) => deleteMessageHandler(e.target.value)}>DEL </button>
                                            </td>
                                            : <td ></td>}
                                        {actualClientData.clientName !== undefined
                                            ?
                                            <td>
                                                <button type='button' id="update-btn" value={messageItem._id} onClick={(e) => updateMessageHandler(index, e.target.value)}>UPD</button>
                                            </td>
                                            : <></>}
                                    </tr>
                                </tbody>
                            )
                        })}
                    </table >
                </div >
                : <></>}
        </ >
    )
}

export default MessageTable