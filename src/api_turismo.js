//Elementos recuperados para modificar
const sel_idioma = document.getElementById("sel_idioma");
var idioma = sel_idioma.value;
const sel_provincia = document.getElementById('sel_provincia');
const sel_municipio = document.getElementById('sel_municipio');
const sel_tipo = document.getElementById('sel_tipo');
const boton_buscar = document.getElementById('buscar');
const tabla_resultados = document.getElementById('tabla_resultados');
const cuerpo_resultados = document.getElementById('cuerpo_resultados');
const sel_year = document.getElementById('year');
const sel_month = document.getElementById('mes');
const sel_day = document.getElementById('dia');
let elementos_por_pag = document.getElementById('elementos_por_pag');
let pagina = document.getElementById('numero_pagina');
let fetch_url;
let busqueda_desde_cero = 1;
const prev_page = document.getElementById('prev_page');
const next_page = document.getElementById('next_page');
const navigate_pages = document.querySelector('.navigate_pages');
let total_elementos=0;

const url_base = 'https://api.euskadi.eus/culture/events/v1.0/';

//Funcion de busqueda

const tipoDeEventos = function() {
    fetch(url_base + 'eventType')
    .then(response => {
        if (!response.ok){
            throw new Error("Fetch de tipo de eventos fallado");
        }
        return response.json();
    })
    .then(datos =>{
        let opcion;
        for(const tipo of datos){
                opcion = document.createElement('option')
                opcion.value = tipo['id'];
                opcion.textContent= tipo['name'+idioma];
                sel_tipo.appendChild(opcion);
            }
    })
    .catch(error => {
        console.error("Ha habido un problema con las peticiones :" + error);
    })
}

const provincia = function(){
    sel_provincia.innerHTML='<option value="">Provincia</option>';
    fetch(url_base + 'provinces')
    .then(response => {
        if (!response.ok){
            throw new Error("Fetch de provincias fallado");
        }
        return response.json();
    })
    .then(datos =>{
        let opcion;
        
        for(const prov of datos["items"]){
            if (prov['provinceId']>0){
                opcion = document.createElement('option');
                opcion.value = prov['provinceId'];
                opcion.textContent= prov['name'+idioma];
                sel_provincia.appendChild(opcion);
            }
        }
    })
    .catch(error => {
        console.error("Ha habido un problema con las peticiones :" + error);
    })
}

//Para municipios tenía que hacer 2 fetch seguidos para recuperar la totalidad, sino solo nos daba 20 por defecto
const municipio = function(){
    sel_municipio.innerHTML='<option value="">Municipio</option>';
    if (sel_provincia.value==''){
        sel_municipio.hidden=true;
    }
    else {
        fetch(url_base + 'municipalities/byProvince/' + sel_provincia.value)
        
        .then(response => {
            if (!response.ok){
                throw new Error("Fetch de provincias fallado");
            }
            return response.json();
        })
        .then(datos =>{
            let tot_munic = datos["totalItems"];
            
            let opcion;
            fetch(url_base + 'municipalities/byProvince/' + sel_provincia.value + '?_elements=' + tot_munic)
            .then(response => {
                if (!response.ok){
                    throw new Error("Fetch de provincias fallado");
                }
                return response.json();
            })
            .then(datos2 =>{
                let opcion;
                for(const prov of datos2["items"]){           
                    opcion = document.createElement('option')
                    opcion.value = prov['municipalityId'];
                    opcion.textContent= prov['name'+idioma];
                    sel_municipio.appendChild(opcion);   
                }
                sel_municipio.hidden=false;
            })
            .catch(error => {
            console.error("Ha habido un problema con las peticiones :" + error);
        })
        })
        .catch(error => {
            console.error("Ha habido un problema con las peticiones:" + error);
        })
    }
}


const recargar_todo = function(){
    provincia();
    municipio();
    tipoDeEventos();
    tabla_resultados.hidden=true;
    elementos_por_pag.hidden=true;
    pagina.hidden=true;
    navigate_pages.hidden=true;
}

//document.addEventListener('change',sel_idioma);
sel_idioma.onchange = function () {
    idioma = sel_idioma.value;
    recargar_todo();
    console.log(idioma);
}

const busqueda = function (){
    if (busqueda_desde_cero==1){fetch_url = url_base + 'events?_elements='+ elementos_por_pag.value + '&_page=1';}
    else{fetch_url = url_base + 'events?_elements='+ elementos_por_pag.value + '&_page=' + pagina.value;}
    if (sel_day.value!=''){
        fetch_url = fetch_url + '&day=' + sel_day.value ;
    }
    if (sel_month.value!=''){
        fetch_url = fetch_url + '&month='+sel_month.value;
    }
    if (sel_year.value!=''){
        fetch_url = fetch_url + '&year='+sel_year.value;
    }
    if (sel_municipio.value!=''){
        fetch_url = fetch_url + '&municipalityNoraCode=' + sel_municipio.value;
    }
    if (sel_provincia.value!=''){
        fetch_url = fetch_url + '&provinceNoraCode=' + sel_provincia.value;
    }
    if (sel_tipo.value!=''){
        fetch_url = fetch_url + '&type='+sel_tipo.value;
    }
    console.log(fetch_url)
    fetch(fetch_url)
    .then( response => {
        if (!response.ok){
            throw new Error("Error al cargar los eventos");
        }
        return response.json();
    })
    .then(datos => {
        cuerpo_resultados.innerHTML='';
        if (busqueda_desde_cero==1){total_pages = datos["totalPages"];}
        let linea;
        if (datos["totalItems"]==0){
            tabla_resultados.hidden=true;
            elementos_por_pag.hidden=true;
            pagina.hidden=true;
            navigate_pages.hidden=true;
            setTimeout(() => alert("No hay resultados para esta búsqueda.",.5));
        }
        else {for (evento of datos["items"]) {
            linea = document.createElement('tr');
            let nombre = document.createElement('td');
            nombre.textContent = evento['name'+idioma];
            nombre.className = "nombre_evento"
            linea.appendChild(nombre);
            let begin_date = document.createElement('td');
            begin_date.textContent=new Date(evento['startDate']).toLocaleDateString('es-ES');
            begin_date.className="fecha";
            linea.appendChild(begin_date);
            let end_date = document.createElement('td');
            end_date.className="fecha";
            end_date.textContent= new Date(evento['endDate']).toLocaleDateString('es-ES');
            linea.appendChild(end_date);
            let descripcion = document.createElement('td');
            descripcion.innerHTML=evento['description'+idioma];
            descripcion.className="descripcion";
            linea.appendChild(descripcion);
            cuerpo_resultados.appendChild(linea);
        }
        if (busqueda_desde_cero==1){
            pagina.innerHTML='';
            for (let pag_nb=1;pag_nb <= datos["totalPages"];pag_nb++){
                pagina_nb = document.createElement('option');
                pagina_nb.value=pag_nb;
                pagina_nb.textContent='Página '+pag_nb;
                pagina.appendChild(pagina_nb);
            }
        }
        tabla_resultados.hidden=false;
        elementos_por_pag.hidden=false;
        pagina.hidden=false;
        navigate_pages.hidden=false;
        sel_tipo.scrollIntoView();}
    })
    .catch(error=> {
        console.error("Ha habido un error: " + error)
    })
}

elementos_por_pag.onchange = function () {
    busqueda_desde_cero=1;
    pagina.value=1;
    busqueda();
}

boton_buscar.onclick = function (){
    busqueda_desde_cero=1;
    pagina.value=1;
    busqueda();
}

sel_provincia.addEventListener('change',municipio)
pagina.onchange = function(){
    busqueda_desde_cero=0;
    busqueda();
}

next_page.onclick = function(){
    if (pagina.value<total_pages){
        pagina.value++;
        busqueda_desde_cero=0;
        busqueda();}
    else {
        alert("Estás ya en la última página.")
    }
}

prev_page.onclick = function(){
    if (pagina.value>1){
        pagina.value--;
        busqueda_desde_cero=0;
        busqueda();}
    else {
        alert("Estás ya en la primera página.")
    }
}

recargar_todo();
