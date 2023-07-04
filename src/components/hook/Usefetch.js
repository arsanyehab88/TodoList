import axios from 'axios'
import { useEffect, useState } from 'react'




const useFetch = (url,method,x) => {
    let token = `Bearer ${localStorage.getItem('token')}`
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setloading] = useState(true);

    const fetchData = () => {
        axios[method](url, {headers:{Authorization: token}}, {data: x})
            .then((res) => {
                setResponse(res.data);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setloading(false);
            });
    };

    useEffect(() => {
        fetchData();
    }, [method, url]);

    return { response, error, loading };
}

export default useFetch;