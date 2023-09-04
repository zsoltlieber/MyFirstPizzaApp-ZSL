import { useContext } from 'react';
import { Context } from "../../context.js"
import { MainContext } from "../../mainContext.js"

export const MessageTable = ({ deleteMessageHandler, updateMessageHandler }) => {

    const { actualClientData } = useContext(MainContext);
    const { messageList, showMessageThanks } = useContext(Context);

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
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        {messageList.map((message, index) => {
                            return (
                                <tbody key={index}>
                                    <tr>
                                        <td><p>{index+1}.) {message.clientName}</p></td>
                                        <td><p style={{ marginTop: "0px", maxWidth: "95%" }}>{message.message}</p></td>
                                        {actualClientData.clientName !== undefined && (actualClientData.clientId === message.clientId || actualClientData.staffStatus === true)
                                            ?
                                            <>
                                                <td >
                                                    <button type="button" id="delete-btn" value={message._id} onClick={(e) => deleteMessageHandler(e.target.value)}>DEL </button>
                                                </td>
                                                <td >
                                                    <button type='button' id="update-btn" value={message._id} onClick={(e) => updateMessageHandler(index, e.target.value)}>UPD</button>
                                                </td>
                                            </>
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