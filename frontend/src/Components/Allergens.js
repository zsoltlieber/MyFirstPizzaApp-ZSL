import { useState } from "react";
import '../Styles/Allergens.css'

function Allergens(params) {

    const [allergens, setAllergens] = useState("Allergen");


    return (
        <>
            <div id="Allergens-container">
                {allergens != null ?
                    <>
                        <h1>
                            Allergens
                        </h1>
                    </>
                    
                    : <>
                        <h1>
                            Null
                            </h1></>
            }
            </div>

        </>
    )
};

export default Allergens;