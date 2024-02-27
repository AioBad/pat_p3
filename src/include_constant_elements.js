//cargar el header, footer, y el return to top
fetch("para_incluir.html")
    .then(respuesta => {
        if (respuesta.ok) {
            return respuesta.text();
        }
        else {
            throw respuesta.status;
        }
    })
    .then (texto => {
        var parser = new DOMParser();
        var doc = parser.parseFromString(texto, "text/html");
        const body = document.getElementById("body");

        const cabeza = document.createElement('header');
        cabeza.appendChild(doc.getElementById("menu_to_include"));
        body.prepend(cabeza);

        const flecha_arriba = doc.getElementById("button_top_of_page")
        body.appendChild(flecha_arriba)

        const pie_de_pagina = document.createElement("footer");
        pie_de_pagina.appendChild(doc.getElementById("pie_de_pagina"));
        body.appendChild(pie_de_pagina)
    })
    .catch (error => {
        console.log("Error occurred: ", error);
    });
