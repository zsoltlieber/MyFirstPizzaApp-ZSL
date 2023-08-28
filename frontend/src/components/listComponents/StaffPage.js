import { useContext } from "react";
import { MainContext } from "../../mainContext.js";

export const StaffPage = () => {

    const { actualClientData, setRightColumnType } = useContext(MainContext);

    return (
        <div id="staff-page" >
            <h2 >---  STAFF PAGE  ---<br /> Dear {actualClientData.clientName} !</h2>

            <button onClick={()=>setRightColumnType("client-data-handler")}>Client data handler</button>
            <button onClick={() => setRightColumnType("allergens-data-handler")}>Allergens data handler</button>
            <button onClick={() => setRightColumnType("pizza-type-data-handler")}>Pizza type data handler</button>
            <h3>The delete function set isActive - to - false, not truly delete</h3>
        </div>
    )
}

export default StaffPage