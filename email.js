document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Show loading state
    const submitBtn = document.querySelector('.submit-btn');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
        to_name: 'Teekshala'
    };

    console.log('Form data:', formData);
    console.log('EmailJS initialized:', emailjs);

    // Send email using EmailJS
    // Replace 'YOUR_TEMPLATE_ID' with the actual template ID from your EmailJS dashboard
    emailjs.send('service_elyl29l', 'template_bgelbmk', formData)
        .then(function(response) {
            console.log('EmailJS Response:', response);
            console.log('Status:', response.status);
            console.log('Text:', response.text);
            alert('Message sent successfully!');
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.error('EmailJS Error:', error);
            console.error('Error Status:', error.status);
            console.error('Error Text:', error.text);
            alert('Failed to send message. Error: ' + error.text + '\nPlease try again later or contact me directly at teekshalak4788@gmail.com');
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
});