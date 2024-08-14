import makePurchase from "./makePurchase.js";
import getAccessToken from "./getAccessToken.js";
import fetchOffers from "./fetchOffers.js";
import showStep from "./showStep.js";
import updateOfferSelection from "./updateOfferSelection.js";

let currentStep = 1;
let offersData = null;
let accessToken = null;
let msisdn = null;

$(document).ready(function() {
    showStep(currentStep);
    window.nextStep = nextStep;
    window.prevStep = prevStep;
});

window.nextStep = async function() {
    if (currentStep === 1) {
        msisdn = $('#phoneNumber').val();

        if (!msisdn) {
            alert('Please input your phone number.');
            return;
        }



        const username = 'AQIoGIE7aBGUAAGAbAJt9XlNPOAeNsQm';
        const password = 'YGSKCwU2ieEcure5';

        try {
            accessToken = await getAccessToken(username, password);
            console.log('Access Token:', accessToken);
            const offers = await fetchOffers(accessToken, msisdn);
            console.log("Received offers", offers);
            offersData = offers.lineItem.characteristicsValue;
            updateOfferSelection(offersData);
            currentStep++;
            showStep(currentStep);
        } catch (error) {
            console.error('Failed to obtain access token or fetch offers:', error);
        }
    } else if (currentStep === 2) {
        const selectedOffer = $('input[name="dataOffer"]:checked').val();
        if (!selectedOffer) {
            alert('Please select an offer.');
            return;
        }

        currentStep++;
        showStep(currentStep);
    } else if (currentStep === 3) {
        const selectedOffer = $('input[name="dataOffer"]:checked').val();
        console.log('Selected Offer:', selectedOffer); // Log selected offer

        // Find the selected offer data in the offersData array
        const selectedOfferData = offersData.find(offer => offer.offerName === selectedOffer);

        if (!selectedOfferData) {
            alert('Selected offer details not found. Please try again.');
            console.error('Selected offer data not found:', selectedOffer);
            return;
        }

        const paymentMode = $('input[name="paymentMethod"]:checked').val();

        if (!paymentMode) {
            alert('Please select a payment method.');
            return;
        }

        const accountId = selectedOfferData.resourceAccId;
        const price = selectedOfferData.offerPrice;
        const resourceAmount = selectedOfferData.resourceValue;
        const validity = selectedOfferData.offerValidity;

        try {
			const purchaseResponse = await makePurchase(
				accessToken,
				msisdn,
				selectedOfferData.offeringId,
				paymentMode,
				accountId,
				price,
				resourceAmount,
				validity
			);
			console.log('Purchase response:', purchaseResponse);
            $('#confirmationMessage').text(purchaseResponse.header.customerMessage || 'You will receive an SMS confirmation shortly.');
			alert('Kindly wait as we process your request.');
			currentStep++;
			showStep(currentStep);
		} catch (error) {
			alert(`Failed to make purchase: ${error.message}`);
			console.error('Failed to make purchase:', error);
		}
		
    }
};

window.prevStep = function() {
    if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
    }
};
