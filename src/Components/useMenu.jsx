import { useState, useEffect } from "react";

function useMenu(url) {
    const [data, setMeals] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMenuItems();

        async function getMenuItems() {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error: Status ${response.status}`);
                }
                const data = await response.json();

                setMeals(data);
                setError(null);
            } catch (err) {
                console.log(err)
                setError(err.message);
            } finally {
                setLoading(false)
            }

        }
    }, [])

    return { data, error, loading };
}

export default useMenu