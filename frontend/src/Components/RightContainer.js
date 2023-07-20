import Login from './Login';
import Messages from './Messages';
import Orders from './Orders';
import '../Styles/RightContainer.css';

function RightContainer() {

    return (
        <div id="Right-container">
            <Orders />
            <Login />
            <Messages />
        </div>
    )
}

export default RightContainer;