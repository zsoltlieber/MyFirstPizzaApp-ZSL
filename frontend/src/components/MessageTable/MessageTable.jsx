import { useMessageContext } from '../../contexts/MessageContextProvider.jsx';
import { useClientContext } from "../../contexts/ClientContextProvider.jsx";

export const MessageTable = () => {

    const { actualClientData } = useClientContext();
    const { messageList, updateMessage, deleteMessage } = useMessageContext();

    return (
        <>
            < div id='message-list' >
                <p style={{ textAlign: "center", fontSize: "20px", marginTop: "0" }} >MESSAGE LIST</p>

                <table id="message-list-table">
                    <thead>
                        <tr>
                            <th>NAME</th>
                            <th>MESSAGE</th>
                            {actualClientData.clientName
                                ?
                                <>
                                    <th></th>
                                    <th></th>
                                </>
                                : null
                            }
                        </tr>
                    </thead>
                    {messageList.map((messageItem, index) => {
                        return (
                            <tbody key={index}>
                                <tr key={index}>
                                    <td><p>{index + 1}.) {messageItem.clientName}</p></td>
                                    <td><p style={{ marginTop: "0px", maxWidth: "95%" }}>{messageItem.message}</p></td>
                                    {actualClientData.clientName && (actualClientData.clientId === messageItem.clientId || actualClientData.staffStatus === true)
                                        ?
                                        <td >
                                            <button type="text" id="delete-btn" value={messageItem._id} onClick={(e) => deleteMessage(e.target.value)}>DEL </button>
                                        </td>
                                        : <td ></td>}
                                    {actualClientData.clientName
                                        ?
                                        <td>
                                            <button type='button' id="update-btn" value={messageItem._id} onClick={(e) => updateMessage(index, e.target.value)}>UPD</button>
                                        </td>
                                        : null
                                    }
                                </tr>
                            </tbody>
                        )
                    })}
                </table >
            </div >
        </ >
    )
}

export default MessageTable