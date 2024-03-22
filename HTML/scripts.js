// ... (din eksisterende JavaScript-kode)

function sendEmail() {
    var contactForm = document.getElementById("contactForm");
    var contactEmail = document.getElementById("contactEmail").value;
    var contactMessage = document.getElementById("contactMessage").value;

    // Erstatt med din e-mailadresse eller implementer den ønskede logik
    var emailAddress = 'madschurchill@gmail.com';

    // Implementer logik til at sende en e-mail, f.eks. ved hjælp af et mailto-link
    window.location.href = `mailto:${emailAddress}?subject=Support Anmodning&body=${encodeURIComponent("E-mail: " + contactEmail + "\nBesked: " + contactMessage)}`;
}

function sendSMS() {
    var smsForm = document.getElementById("smsForm");
    var smsPhoneNumber = document.getElementById("smsPhoneNumber").value;
    var smsMessage = document.getElementById("smsMessage").value;

    // Erstatt med dine Twilio-oplysninger
    var accountSid = 'AC778ddbd235ed466a5087a067f726edb9';
    var authToken = '14f6fedeeb2f743200e24e3b7d5fa514';
    var phoneNumber = '+12014256428';

    // Brug Twilio's REST API til at sende SMS
    fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`)
        },
        body: new URLSearchParams({
            To: smsPhoneNumber,
            From: phoneNumber,
            Body: smsMessage
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('SMS sendt:', data);
        alert('SMS sendt!');
    })
    .catch(error => {
        console.error('Fejl ved afsendelse af SMS:', error);
        alert('Fejl ved afsendelse af SMS.');
    });
}

// ... (din eksisterende JavaScript-kode)
