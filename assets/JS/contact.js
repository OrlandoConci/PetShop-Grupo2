const $btnSend = document.getElementById('btn-send');

$btnSend.addEventListener('click', (e) => {
    const name = document.querySelector('input[name="name"]').value.trim();


    if (!name) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos del formulario.'
        });
    } else {
        Swal.fire('Mensaje enviado');

    }
});
