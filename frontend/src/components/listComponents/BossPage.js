import { useContext } from 'react';
import { MainContext } from '../../mainContext.js';

export const BossPage = () => {

    const { actualClientData, setRightColumnType } = useContext(MainContext);

    return (
        <div id="boss-page" >

            <h2 >---  BOSS PAGE ---<br /> {actualClientData.clientName}! </h2>
            <button onClick={() => setRightColumnType("client-data-handler")}>Client data handler</button>
            <button onClick={() => setRightColumnType("allergens-data-handler")}>Allergens data handler</button>
            <button onClick={() => setRightColumnType("pizza-type-data-handler")}>Pizza type data handler</button>

            <h3>The delete function truly DELETE</h3>
        </div>
    )
}

export default BossPage