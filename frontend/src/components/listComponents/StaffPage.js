export const StaffPage = ({ actualClientData }) => {

    return (
        <div id="staff-page" style={{ color: "white" }}>
            <h2 >---  STAFF PAGE  ---<br /> Dear {actualClientData.clientName} coming soon ! :)</h2>
            
            <h2>Client data handler</h2>
            <h2>Client order handler</h2>
            <h2>Allergens data handler</h2>
            <h2>Pizza type data handler</h2>

            <h3>The delete function set isActive - to - false, not truly delete</h3>
        </div>
    )
}

export default StaffPage