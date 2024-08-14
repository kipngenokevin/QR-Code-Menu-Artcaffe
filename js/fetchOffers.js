const fetchOffers = (accessToken, msisdn) => {
    const apiUrl = `https://safaricom-offers.gigastreammedia.net/proxy/v1/dynamic-offers/fetch?msisdn=${msisdn}`;

    return fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken.access_token}`, // Use only the access_token property
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Process the received data
        return data;
    })
    .catch(error => {
        console.error('Error fetching offers:', error);
        throw error;
    });
};

export default fetchOffers;
