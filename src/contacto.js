const campo_mensaje = document.getElementById("message_answer");
const label_mensaje = document.getElementById("message_label");
const label_mensaje_texto_original=  label_mensaje.textContent;
const maxlenght_message = 3000;
const tipo_de_mensaje = document.getElementById("tema_del_mensaje_answer")
const tema2_label = document.getElementById("tema2_label")
const tema2 = document.getElementById("tema2")
const name_answer = document.getElementById("name_answer");
const phone_answer = document.getElementById("phone_answer");
const email_answer = document.getElementById("email_answer");
const tema_del_mensaje_answer = document.getElementById("tema_del_mensaje_answer");
const message_answer = document.getElementById("message_answer");
const contact_form_button = document.getElementById("contact_form_button");

const caracteresrestantes = () => {
    var car_restantes = maxlenght_message - campo_mensaje.value.length;
    label_mensaje.textContent = label_mensaje_texto_original + " (" + car_restantes + " caracteres restantes)";
}

const otra_razon = function () {
    if (tipo_de_mensaje.value==4){
        tema2_label.hidden=false;
        tema2.hidden=false;
        tema2.required = true;
    }
    else {
        tema2_label.hidden=true;
        tema2.hidden=true;
        tema2.required = false;
    }
}

campo_mensaje.addEventListener('keyup',caracteresrestantes);
tipo_de_mensaje.addEventListener('change',otra_razon);

name_answer.addEventListener('keyup',()=>{sessionStorage.setItem("name_answer",name_answer.value)});
phone_answer.addEventListener('keyup',()=>{sessionStorage.setItem("phone_answer",phone_answer.value)});
email_answer.addEventListener('keyup',()=>{sessionStorage.setItem("email_answer",email_answer.value)});
tipo_de_mensaje.addEventListener('change',()=>{sessionStorage.setItem("tipo_de_mensaje",tipo_de_mensaje.value)});
tema2.addEventListener('keyup',()=>{sessionStorage.setItem("tema2",tema2.value)});
message_answer.addEventListener('keyup',()=>{sessionStorage.setItem("message_answer",message_answer.value)});

contact_form_button.addEventListener('click',()=>{
    name_answer.value=sessionStorage.getItem("name_answer");
    phone_answer.value=sessionStorage.getItem("phone_answer");
    email_answer.value=sessionStorage.getItem("email_answer");
    tipo_de_mensaje.value=sessionStorage.getItem("tipo_de_mensaje");
    tema2.value=sessionStorage.getItem("tema2");
    message_answer.value=sessionStorage.getItem("message_answer");
})

caracteresrestantes();