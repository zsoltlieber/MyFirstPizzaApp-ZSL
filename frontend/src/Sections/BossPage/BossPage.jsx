import { useRightColumnType } from '../../contexts/RightColumnTypeContextProvider';

export const BossPage = () => {

    const { setRightColumnType } = useRightColumnType();

    return (
        <div id="boss-page" >
            <h2 >---  BOSS PAGE ---<br /></h2>
            <div>
                <button className='handler-btn' onClick={() => setRightColumnType("client-handler")}>Client data handler</button>
            </div>
            <div>
                <button className='handler-btn' onClick={() => setRightColumnType("allergen-handler")}>Allergens data handler</button>
            </div>
            <div>
                <button className='handler-btn' onClick={() => setRightColumnType("pizza-type-handler")}>Pizza type data handler</button>
            </div>
            <h3>The delete function truly DELETE</h3>
        </div>
    )
}

export default BossPage