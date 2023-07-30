//import { useEffect } from "react";

const ModifyData = (data, url) => {
    console.log(data);
    console.log(url);
/*
    useEffect(() => {
        async function updateData() {
            try {
                const request = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }
                const response = await fetch(url, request);
                if (!response.ok) {
                    throw new Error('Data could not be modified!')
                } else {
                 //   await response.json()
                    return true
                }
            } catch (error) {
                console.log(error)
            }
        }
        updateData()
    }, [data, url])
    */
}

export default ModifyData