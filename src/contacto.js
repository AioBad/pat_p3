const campo_mensaje = document.getElementById("message_answer");
const label_mensaje = document.getElementById("message_label");
const label_mensaje_texto_original=  label_mensaje.textContent
const maxlenght_message = 3000;

const caracteresrestantes = () => {
    var car_restantes = maxlenght_message - campo_mensaje.value.length;
    label_mensaje.textContent = label_mensaje_texto_original + " (" + car_restantes + " caracteres restantes)";
}

campo_mensaje.addEventListener('keyup',caracteresrestantes);
caracteresrestantes();