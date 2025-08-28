document.getElementById('contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const statusDiv = document.getElementById('statusMessage');

    try {
        const response = await fetch('https://email-worker.manueldiaz-prof.workers.dev/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (response.ok) {
            statusDiv.textContent = '¡Correo enviado con éxito!';
            statusDiv.className = 'mt-3 text-center text-success';
            form.reset();
        } else {
            const errorData = await response.json();
            console.log(errorData);
            
            throw new Error(errorData.error || 'Ocurrió un error al enviar el correo.');
        }
    } catch (error) {
        statusDiv.textContent = `Error: ${error.message}`;
        statusDiv.className = 'mt-3 text-center text-danger';
    }
});