import { useRightColumnType } from "../../contexts/RightColumnTypeContextProvider";

export const StaffPage = () => {

    const { setRightColumnType } = useRightColumnType();
    
    return (
        <div id="staff-page" >
            <h2 >---  STAFF PAGE  ---</h2>
            <div>
                <button className='handler-btn' onClick={() => setRightColumnType("client-handler")}>Client data handler</button>
            </div>
            <div>
                <button className='handler-btn' onClick={() => setRightColumnType("allergen-handler")}>Allergens data handler</button>
            </div>
            <div>
                <button className='handler-btn' onClick={() => setRightColumnType("pizza-type-handler")}>Pizza type data handler</button>
            </div>
            <h3>The delete function set isActive - to - false, not truly delete</h3>
        </div>
    )
}

export default StaffPage