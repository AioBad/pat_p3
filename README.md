# PAT_p3

2nda publicación de la página web
Principales aportaciones:

## Web completa
Fichero include_constant_elements.js

Automatizado la importación de header, footer y flecha en cada página del sitio web.

## Página Turismo
Fichero api_turismo.js

Implementación de la interacción con una API del País Vasco que lista eventos culturales de la región.

Documentación de la API ([aquí](https://opendata.euskadi.eus/api-culture/?api=culture_events)).

Añadido CSS para que salga más bonito.

La llamada al API se hace teniendo en cuenta qué elementos se han rellenado o no de manera automática. Se puede rellenar entre 0 y todos los campos, sin requisitos.

La selección del idioma cambia el nombre de las provincias y de las ciudades así como los nombres y la descripción de los eventos.
Provincias, municipios y tipos de eventos se recuperan mediante la API.
La selección de alguna provincia provoca una llamada al API para listar las ciudades de dicha provincia.

La descripción de los eventos venía en HTML, así que se uso como tal para dar el visual final.
Las fechas se parsearon para recuperar únicamente los días, sin las horas.
Se seleccionaron 4 de las muchas informaciones que daba la API para que no fuera demasiado en la página.

El número de páginas se recupera con la API.
Si se está en la primera o última página y se intenta ir respectivamente a pagina previa o página suiguiente, sale una alerta del navegador.
Si salen 0 eventos, salta un error del navegador.


## Página Contacto
Añadido un seguimiento de los caracteres restantes en el campo del mensaje.
