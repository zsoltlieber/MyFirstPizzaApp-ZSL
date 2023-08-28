import { useContext } from 'react';
import { MainContext } from '../../mainContext.js';

export const BossPage = () => {

    const { actualClientData } = useContext(MainContext);

    return (
        <div id="boss-page" >

            <h2 >---  BOSS PAGE ---<br /> {actualClientData.clientName} coming soon ! :)</h2>
            <h2>Client data handler</h2>
            <h2>Client order handler</h2>
            <h2>Allergens data handler</h2>
            <h2>Pizza type data handler</h2>

            <h3>The delete function truly DELETE</h3>
        </div>
    )
}

export default BossPage