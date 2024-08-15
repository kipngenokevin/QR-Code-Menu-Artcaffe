const updateOfferSelection = (offersData) => {
    const offerContainer = $('#offerContainer'); // Make sure there's a container with this ID in your HTML
    offerContainer.empty(); // Clear existing offers

    offersData.forEach((offer, index) => {
        const isChecked = index === 0 ? 'checked' : ''; // Check the first radio button
        const offerHtml = `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="dataOffer" id="${offer.offeringId}" value="${offer.offerName}" ${isChecked}>
                <label class="form-check-label" for="${offer.offeringId}">
                    ${offer.offerName} @ Ksh ${offer.offerPrice}
                </label>
            </div>
        `;
        offerContainer.append(offerHtml);
    });
}

export default updateOfferSelection;
