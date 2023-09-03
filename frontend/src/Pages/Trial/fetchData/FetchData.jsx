import { useState, useEffect } from 'react'

const FetchData = (url) => {

    const [data, setdata] = useState();
    const [loading, setLoding] = useState();
    const [error, setError] = useState();
    useEffect(() => {
        const dataFetch = async () => {
            setLoding(true)
            try {
                const data = await (await fetch(url)).json();
                setdata(data);
            } catch (error) {
                setError(error)
            }
            setLoding(false)
        };

        dataFetch();
    }, [url]);

    const reFetch = async () => {
        setLoding(true)
        try {
            const data = await (await fetch(url)).json();
            setdata(data);

        } catch (error) {
            setError(error)
        }
        setLoding(false)
    };

    return { data, loading, error, reFetch }

}

export default FetchData