const fetchData = async (url) => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.log("Fetch failed with status", response.status);
            return;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error fetching data:", error.message);
        return [];
    }
};

export default fetchData;
