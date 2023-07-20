import { useState } from "react";
import '../Styles/Allergens.css'

function Allergens(params) {

    const [allergens, setAllergens] = useState(["Allergen", "Lactose", "Fructose"]);


    return (

        <>
            <div id="Allergens-container">
                <p>Allergens</p>
                {allergens != null ?
                    <>
                        <ul >
                            {allergens.map((allergen, index) => (
                                <li li key={index} > {allergen}</li>
                            ))}
                        </ul>
                    </>
                    : <>
                        <h1>Null</h1></>
                }
            </div >

        </>
    )
};

export default Allergens;