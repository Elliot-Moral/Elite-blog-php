function c(dato){
    console.log(dato);
}

const url_alt = 'https://www.fundacionamigosdejesus.org/';
const url = 'http://localhost/elite/';



const confi_cards = document.querySelectorAll('.about__card');
const tabla = document.getElementById('datos_tabla');

confi_cards.forEach((e, index) => {
    e.addEventListener('click', () => {
        if(index === 0 ){
            cerar_casos();
            abrir_actividades();
        }else if(index === 1 ){
            cerra_articulos();
            abrir_casos();
        }else{
            
        }
    });
})




// APARTIR DE ACA COMIENZA LA FUNCINALIDAD DE ARTICULOS

//abrir modal articulos.
function abrir_actividades(){
    const modal = document.getElementById('modal_actidades');

    if(modal.classList.contains( 'abrir_modal' )){
        //cerrar modal.
        modal.classList.remove("abrir_modal");
    }else{
        //abrir modal.
        modal.classList.add("abrir_modal");
        listar_articulos();
    }

}

function cerra_articulos(){
    const modal = document.getElementById('modal_actidades');
    modal.classList.remove("abrir_modal");
}

// cerrar el modal
function cerrar_modal_actividades() {

    const modal = document.getElementById('modal_actidades');
    const bnt_modal = document.getElementById('btn_modal_acti');

    bnt_modal.addEventListener('click', () => {
        modal.classList.remove("abrir_modal");
    });
}
cerrar_modal_actividades();

let actividadesFuanje = [];
const tabla_acti = document.getElementById('data_actividades');


function listar_articulos() {
    fetch(`${url}configuracion/listar_articulos/`)

        .then(respuesta => respuesta.json())
        .then(data => monstrar_datos(data))

        .catch(error => console.log(error))

    const monstrar_datos = (data) => {
    console.log("🚀 ~ listar_articulos ~ data:", data)

        

        let body = '';

        for (let i = 0; i < data.length; i++) {


            num = i + 1;
            body += `<tr class="tr_columna" id='${num}'>
                            <td>${num}</td>
                            <td>${data[i].title_art}</td>
                            <td>${data[i].desc_art}</td>	          				
                            <td> <img class="img_tabla" src="${url + data[i].url_img1_art}"/></td>
                        </tr>`


                // agregar los datos al array para luego manipularlos.
                actividadesFuanje.push({ 'id': data[i].id_art, 'title': data[i].title_art, 'desc': data[i].desc_art, 'autor': data[i].autor_art, 
                'body': data[i].body_art, 'fecha': data[i].fecha_art,  'img1': data[i].url_img1_art, 'img2': data[i].url_img2_art, 'img3': data[i].url_img3_art,
                'likes': data[i].likes_art, 'id_category': data[i].id_cat_art,
                })
            

        }

        tabla_acti.innerHTML = body;

    }
    capturar_el_elemento_acti()
}

let indice_del_actividad_selecionado = 0;

function capturar_el_elemento_acti() {
    setTimeout(() => {
        const columnaTabla = tabla_acti.querySelectorAll('.tr_columna');
        columnaTabla.forEach(e => {

            e.addEventListener('click', () => {
                // recorre y quitar todos los estilos
                removerClaseParaTodos(columnaTabla);

                // Asignar el estilo seleiconado
                e.classList.add('tr_columna_selected');

                

                indice_del_actividad_selecionado = e.id - 1;

                console.log("🚀 ~ e.addEventListener ~ columnaTabla:", actividadesFuanje[indice_del_actividad_selecionado])
            })
        })

    }, 700)
}


//traeme los modales
const ventana_modal_act = document.getElementById('ventana_modal_act');
const modal_1_act = document.getElementById('modal_1_act');
const modal_2_act = document.getElementById('modal_2_act');
const h2_action_modal_act = document.getElementById('action_modal_act');

// traer los botonoes
const bnt_add_act = document.getElementById('bnt_add_acti');
const bnt_update_act = document.getElementById('bnt_update_acti');
const bnt_delete_act = document.getElementById('bnt_delete_acti');

//botones modal 2//
const btn_modal2_cerrar_act = document.getElementById('btn_modal2_cerrar_act');
const btn_modal2_guardar_act = document.getElementById('btn_modal2_guardar_act');

//imagenes
const img1_update_act = document.getElementById('img1_update_act');
const img2_update_act = document.getElementById('img2_update_act');
const img3_update_act = document.getElementById('img3_update_act');
const montrar_imagen_act = document.getElementById('montrar_imagen_act');


// inputs valores     
const form_data_act = document.getElementById('data_form_act');
const input_tit_act = document.getElementById('in_tit_act');
const input_desc_act = document.getElementById('in_desc_act');
const input_autor_act = document.getElementById('in_autor_act');
const input_categ_act = document.getElementById('in_categ_act');
const input_body_act = document.getElementById('in_body_act');
const input_file1_act = document.getElementById('in_img1_act');
const input_file2_act = document.getElementById('in_img2_act');
const input_file3_act = document.getElementById('in_img3_act');




// agregar los eventos
bnt_add_act.addEventListener('click', cambiar_ventana_2_act)

//evento de abrir la ventana agregar.
function cambiar_ventana_2_act() {
    modal_1_act.classList.remove('modal_activo');
    modal_2_act.classList.add('modal_activo');
    ventana_modal_act.classList.add('ventana2');
    btn_modal2_guardar_act.value = "Guardar";
    limpiar_campos_act();
}
function cambiar_ventana_1_act() {

    modal_2_act.classList.remove('modal_activo');
    modal_1_act.classList.add('modal_activo');
    ventana_modal_act.classList.remove('ventana2');
    listar_articulos()

}

//captuar el evento de cambio para capturar la imagen a subir
let imagen_actividad_1 = null;
let imagen_actividad_2 = null;
let imagen_actividad_3 = null;

input_file1_act.addEventListener('change', (e) => {
	imagen_actividad_1 = e.target.files[0];

    // Verificar si hay un archivo seleccionado y es una imagen
    if (imagen_actividad_1 && imagen_actividad_1.type.startsWith('image/')) {
        // Crear un FileReader para leer el archivo de imagen
        const reader = new FileReader();

        // Evento que se dispara cuando la lectura del archivo es exitosa
        reader.onload = function (event) {
            // Establecer el src de la imagen con el resultado de la lectura
            img1_update_act.src = event.target.result;
        };

        // Leer el archivo de imagen como una URL de datos
        reader.readAsDataURL(imagen_actividad_1);
    } else {
        // Si no es una imagen válida, puedes manejar el error aquí
        img1_update_act.src = '';
        console.log('Por favor selecciona un archivo de imagen válido.');
    }

});

input_file2_act.addEventListener('change', (e) => {
	imagen_actividad_2 = e.target.files[0];

    // Verificar si hay un archivo seleccionado y es una imagen
    if (imagen_actividad_2 && imagen_actividad_2.type.startsWith('image/')) {
        // Crear un FileReader para leer el archivo de imagen
        const reader = new FileReader();

        // Evento que se dispara cuando la lectura del archivo es exitosa
        reader.onload = function (event) {
            // Establecer el src de la imagen con el resultado de la lectura
            img2_update_act.src = event.target.result;
        };

        // Leer el archivo de imagen como una URL de datos
        reader.readAsDataURL(imagen_actividad_2);
    } else {
        // Si no es una imagen válida, puedes manejar el error aquí
        img2_update_act.src = '';
        console.log('Por favor selecciona un archivo de imagen válido.');
    }

});

input_file3_act.addEventListener('change', (e) => {
	imagen_actividad_3 = e.target.files[0];

    // Verificar si hay un archivo seleccionado y es una imagen
    if (imagen_actividad_3 && imagen_actividad_3.type.startsWith('image/')) {
        // Crear un FileReader para leer el archivo de imagen
        const reader = new FileReader();

        // Evento que se dispara cuando la lectura del archivo es exitosa
        reader.onload = function (event) {
            // Establecer el src de la imagen con el resultado de la lectura
            img3_update_act.src = event.target.result;
        };

        // Leer el archivo de imagen como una URL de datos
        reader.readAsDataURL(imagen_actividad_3);
    } else {
        // Si no es una imagen válida, puedes manejar el error aquí
        img3_update_act.src = '';
        console.log('Por favor selecciona un archivo de imagen válido.');
    }

});


//id name_img
let datos_para_actualizar = [];

//agragar evento para guardar datos
btn_modal2_guardar_act.addEventListener('click', (e) =>{
    e.preventDefault();

    if(btn_modal2_guardar_act.value === "Actulizar"){
        actualizar_articulos(datos_para_actualizar);
    }else{
        guardar_datos_act();
    }
})

//cerra modal 2 // volver al 1
btn_modal2_cerrar_act.addEventListener('click', (e) => {
    e.preventDefault();
    modal_2_act.classList.remove('modal_activo');
    modal_1_act.classList.add('modal_activo');
    ventana_modal_act.classList.remove('ventana2');
})


function guardar_datos_act() {

    const data_evento = new FormData(form_data_act);
    const datos_validados = validar_campos(input_tit_act.value, input_desc_act.value, input_autor_act.value, input_body_act.value,  imagen_actividad_1);
    
    if(datos_validados){

        fetch(`${url}configuracion/guardar_articulo/`, {
            method: 'POST',
            body: data_evento
        })
            //# obtener respuesta
            .then(respuesta => respuesta.json())
            .then(datos_respuesta => {

                console.log(datos_respuesta)
                
               //# validar si el back envia 'correcto' o 'error'
                if (datos_respuesta == 'correcto') {
                    alert('Datos Guardados Correctamente!');
                    limpiar_campos_act();    
                    listar_articulos();
                    imagen_actividad_1 = null;
                    imagen_actividad_2 = null;
                    imagen_actividad_3 = null;
                    cambiar_ventana_1_act();

                } else if (datos_respuesta == 'error') {
                    alert('LLenar todo los campos por favor!');
                } else if (datos_respuesta == 'ya_existe') {
                    alert('Ya existe producto con el mismo codigo!!');
                } else {
                    alert('Error en el envio de codigo_producto AJAX!!!');
                }
        })
        .catch(err => console.log(err))

    }else{
        alert('Debes llenar todos los campos y cargar una imagen.')
    }
}



function limpiar_campos_act(){
    input_tit_act.value = '';
    input_desc_act.value = '';
    input_autor_act.value = '';
    input_body_act.value = '';

    imagen_actividad_1 = null;
    imagen_actividad_2 = null;
    imagen_actividad_3 = null;

    img1_update_act.src = '';
    img2_update_act.src = '';
    img3_update_act.src = '';
}



//===== EDITAR ARTICULOS
bnt_update_act.addEventListener('click', () => {

    modal_1_act.classList.remove('modal_activo');
    modal_2_act.classList.add('modal_activo');
    ventana_modal_act.classList.add('ventana2');
    h2_action_modal_act.textContent = "Editar Articulo";
    btn_modal2_guardar_act.value = "Actulizar";
    console.log(actividadesFuanje[indice_del_actividad_selecionado])
    input_tit_act.value = actividadesFuanje[indice_del_actividad_selecionado].title;
    input_desc_act.value = actividadesFuanje[indice_del_actividad_selecionado].desc;
    input_autor_act.value = actividadesFuanje[indice_del_actividad_selecionado].autor;
    input_body_act.value = actividadesFuanje[indice_del_actividad_selecionado].body;
    
    let categiria  = actividadesFuanje[indice_del_actividad_selecionado].id_category;
    if(categiria == 1 ){
        input_categ_act.value = 'noticias';
      }else if(categiria == 2){
        input_categ_act.value = 'leyes';
      }else if(categiria == 3){
        input_categ_act.value = 'derechos';
      }else if(categiria == 4){
        input_categ_act.value = 'financiera';
      }

    img1_update_act.src = `${url}${actividadesFuanje[indice_del_actividad_selecionado].img1}`;
    img2_update_act.src = `${url}${actividadesFuanje[indice_del_actividad_selecionado].img2}`;
    img3_update_act.src = `${url}${actividadesFuanje[indice_del_actividad_selecionado].img3}`;

    const id_actividad = actividadesFuanje[indice_del_actividad_selecionado].id;

    const url_img1 = actividadesFuanje[indice_del_actividad_selecionado].img1.split('/');
    let url_img2 = actividadesFuanje[indice_del_actividad_selecionado].img2;
    let url_img3 = actividadesFuanje[indice_del_actividad_selecionado].img3;

    datos_para_actualizar[0] = id_actividad;
    datos_para_actualizar[1] = url_img1[2];

    //#img2
    if(url_img2){
        url_img2 = actividadesFuanje[indice_del_actividad_selecionado].img2.split('/');
        datos_para_actualizar[2] = url_img2[2];
    }else{
        datos_para_actualizar[2] = url_img2 = null;
    }

    //#img3
    if(url_img3){
        url_img3 = actividadesFuanje[indice_del_actividad_selecionado].img3.split('/');
        datos_para_actualizar[3] = url_img3[2];
    }else{
        datos_para_actualizar[3] = url_img3 = null;
    }

})


function actualizar_articulos(array_datos){

    //##=== Array_datos tiene = (id, img1 que son fijos) ya img2 img3 toca saber si estan o no.

    const data_articulo  = new FormData(form_data_act);
    data_articulo.append('id_art', array_datos[0]);
    data_articulo.append('old_img1', array_datos[1]);
    data_articulo.append('old_img2', array_datos[2]);
    data_articulo.append('old_img3', array_datos[3]);



    console.log("🚀 ~ actualizar_articulos ~ array_datos:", array_datos[2])
    
    const datos_validados = validar_campos(input_tit_act.value, input_desc_act.value, input_autor_act.value, input_body_act.value,  false);        

    if(datos_validados){

        fetch(`${url}configuracion/actualizar_articulo/`, {
            method: 'POST',
            body: data_articulo
        })
            //# obtener respuesta
            .then(respuesta => respuesta.json())
            .then(datos_respuesta => {

                // console.log(datos_respuesta)
                
               //# validar si el back envia 'correcto' o 'error'
                if (datos_respuesta == true) {
                    alert('Datos Guardados Correctamente!');
                    limpiar_campos_act();    
                    listar_articulos();
                    imagen_actividad_1 = null;
                    imagen_actividad_2 = null;
                    imagen_actividad_3 = null;
                    cambiar_ventana_1_act();

                }else{
                    alert('Error al guardar!');
                }
        })
        .catch(err => console.log(err))

    }else{
        alert('No debes dejar campos vacios.');
    }
}


//==========  ELIMINAR ========== 

bnt_delete_act.addEventListener('click', eliminar_actividad );
function eliminar_actividad() {

    let confirmacion = confirm(`Segura quieres eliminar el evento numero ${indice_del_actividad_selecionado+1}`)

    const id = actividadesFuanje[indice_del_actividad_selecionado].id
    const url_img1 = actividadesFuanje[indice_del_actividad_selecionado].img1
    const url_img2 = actividadesFuanje[indice_del_actividad_selecionado].img2
    const url_img3 = actividadesFuanje[indice_del_actividad_selecionado].img3

    let array_url = url_img1.split('/');

    let name_img1 = array_url[2];
    let name_img2 = '';
    let name_img3 = '';

    if(url_img2 !== null){

        let array_url = url_img2.split('/');
        name_img2 = array_url[2];
        
        if(url_img3 !== null){

            let array_url = url_img3.split('/');
            name_img3 = array_url[2];

        }
    }

    
    if(confirmacion){
        
        console.log(` ${id} ${name_img1} ${name_img2}  ${name_img3} `)

        const data_delete = new FormData();
        data_delete.append('id', id);
        data_delete.append('name1_img', name_img1);
        data_delete.append('name2_img', name_img2);
        data_delete.append('name3_img', name_img3);


        fetch(`${url}configuracion/eliminar_actividad/`, {
		method: 'POST',
		body: data_delete	
		})
 			//# obtener respuesta
			.then(respuesta => respuesta.json())
			.then(datos_respuesta => {

				console.log(datos_respuesta);
                listar_articulos()

			})
			.catch( err => console.log(err)) 

    }

}












//=========================  #APARTIR DE ACA COMIENZA LA LOGIA DE CASOS DE EXITO =========================

function abrir_casos() { 
    const modal = document.getElementById('modal'); 
    if(modal.classList.contains( 'abrir_modal' )){
        //cerrar modal.
        modal.classList.remove("abrir_modal");
    }else{
        //abrir modal.
        modal.classList.add("abrir_modal");
        listar_casos();
    }
}

function cerar_casos() {
    const modal = document.getElementById('modal');
    modal.classList.remove("abrir_modal");
}



// cerrar el modal por boton
function cerrar_modal_agenda() {

    const modal = document.getElementById('modal');
    const bnt_modal = document.getElementById('btn_modal');

    bnt_modal.addEventListener('click', () => {
        modal.classList.remove("abrir_modal");
    })
}

cerrar_modal_agenda();

let array_casos = [];


function listar_casos() {

    fetch(`${url}configuracion/listar_casos/`)

        .then(respuesta => respuesta.json())
        .then(data => monstrar_datos(data))

        .catch(error => console.log(error))

    const monstrar_datos = (data) => {

        let body = '';

        for (let i = 0; i < data.length; i++) {


            num = i + 1;
            body += `<tr class="tr_columna" id='${num}'>
                            <td>${num}</td>
                            <td>${data[i].title_caso}</td>
                            <td>${data[i].desc_caso}</td>	          				
                            <td> <img class="img_tabla" src="${url + data[i].url_img1_caso}"/></td>
                        </tr>`


                // Agregar los datos al array para luego manipularlos.           
                array_casos.push({ 'id': data[i].id_caso, 'title': data[i].title_caso, 'desc': data[i].desc_caso, 'autor': data[i].cli_caso, 
                'body': data[i].body_caso, 'fecha': data[i].fecha_caso,  'img1': data[i].url_img1_caso, 'img2': data[i].url_img2_caso, 'img3': data[i].url_img3_caso,
                'likes': data[i].likes_caso, 'id_category': data[i].id_cat_caso,
                })
           

        }

        tabla.innerHTML = body;

    }
    capturar_el_elemento_caso()
}

let indice_del_caso_selecionado = 0;

function capturar_el_elemento_caso() {
    setTimeout(() => {
        const columnaTabla = tabla.querySelectorAll('.tr_columna');
        columnaTabla.forEach(e => {

            e.addEventListener('click', () => {
                // ## recorre y quitar todos los estilos.
                removerClaseParaTodos(columnaTabla);

                // ## Asignar el estilo seleiconado.
                e.classList.add('tr_columna_selected');

                indice_del_caso_selecionado = e.id - 1;
                console.log(array_casos[indice_del_caso_selecionado]);

            })
        })

    }, 500)
}




// Función para manejar el evento de clic en los elementos
function removerClaseParaTodos(columnaTabla) {

    // Eliminar la clase "selected" de todos los elementos
    columnaTabla.forEach(function (elemento) {
        elemento.classList.remove('tr_columna_selected');
    });
}

//traeme los modales
const ventana_modal = document.getElementById('ventana_modal');
const modal_1 = document.getElementById('modal_1');
const modal_2 = document.getElementById('modal_2');
const action_modal_caso = document.getElementById('action_modal_caso');

// traer los botonoes
const bnt_add = document.getElementById('bnt_add');
const bnt_update = document.getElementById('bnt_update');
const bnt_delete = document.getElementById('bnt_delete');

//botones modal 2//
const btn_modal2_cerrar_caso = document.getElementById('btn_modal2_cerrar_caso');
const btn_modal2_guardar_caso = document.getElementById('btn_modal2_guardar_caso');

// inputs valores  
const form_caso = document.getElementById('data_form_caso');
const in_tit_caso = document.getElementById('in_tit_caso');
const in_desc_caso = document.getElementById('in_desc_caso');
const in_autor_caso = document.getElementById('in_autor_caso');
const in_categ_caso = document.getElementById('in_categ_caso');
const in_body_caso = document.getElementById('in_body_caso');
// inputs valores  imagenges
const in_img1_caso = document.getElementById('in_img1_caso');
const in_img2_caso = document.getElementById('in_img2_caso');
const in_img3_caso = document.getElementById('in_img3_caso');

//## imagenes -> 
const img1_update_caso = document.getElementById('img1_update_caso');
const img2_update_caso = document.getElementById('img2_update_caso');
const img3_update_caso = document.getElementById('img3_update_caso');



// agregar los eventos
bnt_add.addEventListener('click', cambiar_ventana_2)

//evento de abrir la ventana agregar.
function cambiar_ventana_2() {
    modal_1.classList.remove('modal_activo');
    modal_2.classList.add('modal_activo');
    ventana_modal.classList.add('ventana2');
    btn_modal2_guardar_act.value = "Guardar";
    limpiar_campos_caso();
}
function cambiar_ventana_1() {
    modal_2.classList.remove('modal_activo');
    modal_1.classList.add('modal_activo');
    ventana_modal.classList.remove('ventana2');
    limpiar_campos_caso();
    listar_casos();
}

//captuar el evento de cambio para capturar la imagen a subir
let imagen_1_caso =  null;
let imagen_2_caso =  null;
let imagen_3_caso =  null;

in_img1_caso.addEventListener('change', (e) => {
	imagen_1_caso = e.target.files[0];

    // Verificar si hay un archivo seleccionado y es una imagen
    if (imagen_1_caso && imagen_1_caso.type.startsWith('image/')) {
        // Crear un FileReader para leer el archivo de imagen
        const reader = new FileReader();

        // Evento que se dispara cuando la lectura del archivo es exitosa
        reader.onload = function (event) {
            // Establecer el src de la imagen con el resultado de la lectura
            img1_update_caso.src = event.target.result;
        };

        // Leer el archivo de imagen como una URL de datos
        reader.readAsDataURL(imagen_1_caso);
    } else {
        // Si no es una imagen válida, puedes manejar el error aquí
        img1_update_caso.src = '';
    }
});

in_img2_caso.addEventListener('change', (e) => {
	imagen_2_caso = e.target.files[0];

    // Verificar si hay un archivo seleccionado y es una imagen
    if (imagen_2_caso && imagen_2_caso.type.startsWith('image/')) {
        // Crear un FileReader para leer el archivo de imagen
        const reader = new FileReader();

        // Evento que se dispara cuando la lectura del archivo es exitosa
        reader.onload = function (event) {
            // Establecer el src de la imagen con el resultado de la lectura
            img2_update_caso.src = event.target.result;
        };

        // Leer el archivo de imagen como una URL de datos
        reader.readAsDataURL(imagen_2_caso);
    } else {
        // Si no es una imagen válida, puedes manejar el error aquí
        img2_update_caso.src = '';
    }
});

in_img3_caso.addEventListener('change', (e) => {
	imagen_3_caso = e.target.files[0];

    // Verificar si hay un archivo seleccionado y es una imagen
    if (imagen_3_caso && imagen_3_caso.type.startsWith('image/')) {
        // Crear un FileReader para leer el archivo de imagen
        const reader = new FileReader();

        // Evento que se dispara cuando la lectura del archivo es exitosa
        reader.onload = function (event) {
            // Establecer el src de la imagen con el resultado de la lectura
            img3_update_caso.src = event.target.result;
        };

        // Leer el archivo de imagen como una URL de datos
        reader.readAsDataURL(imagen_3_caso);
    } else {
        // Si no es una imagen válida, puedes manejar el error aquí
        img3_update_caso.src = '';
    }
});

//id name_img
let datos_para_actualizar_lo_casos = [];

//agragar evento para guardar datos
btn_modal2_guardar_caso.addEventListener('click', (e) =>{
    e.preventDefault();

    if(btn_modal2_guardar_caso.value === "Actulizar"){
        actualizar_caso(datos_para_actualizar_lo_casos);
    }else{
        guardar_caso();
    }
})


function validar_campos(tiulo, desc, autor, body, img){
    if(tiulo !== "" && desc !== "" & autor !== "" & body !== "" && img != null){
        return true
    }else{
        console.log(`titulo ${tiulo}: desc ${desc}: dia ${autor}: mes ${body}: img ${img != null}:`)
        return false
    }    
}

function guardar_caso() {

    const data_evento = new FormData(form_caso);
    const datos_validados = validar_campos(in_tit_caso.value, in_desc_caso.value, in_autor_caso.value, in_body_caso.value,  imagen_1_caso);
    
    if(datos_validados){

        fetch(`${url}configuracion/guardar_caso/`, {
            method: 'POST',
            body: data_evento
        })
            //# obtener respuesta
            .then(respuesta => respuesta.json())
            .then(datos_respuesta => {

                console.log(datos_respuesta)
                
               //# validar si el back envia 'correcto' o 'error'
                if (datos_respuesta >= 0) {
                    alert('Datos Guardados Correctamente!');
                    limpiar_campos_caso();    
                    listar_casos();
                    imagen_1_caso = null;
                    imagen_2_caso = null;
                    imagen_3_caso = null;
                    cambiar_ventana_1();

                } else {
                    alert('Error al guardar los datos!');
                }
        })
        .catch(err => console.log(err))

    }else{
        alert('Debes llenar todos los campos y cargar una imagen.')
    }



}



//===== EDITAR EVENTOS
bnt_update.addEventListener('click', () => {

    modal_1.classList.remove('modal_activo');
    modal_2.classList.add('modal_activo');
    ventana_modal.classList.add('ventana2');
    action_modal_caso.textContent = "Editar Caso";

    btn_modal2_guardar_caso.value = "Actulizar";
    console.log(array_casos[indice_del_caso_selecionado])
    in_tit_caso.value = array_casos[indice_del_caso_selecionado].title;
    in_desc_caso.value = array_casos[indice_del_caso_selecionado].desc;
    in_autor_caso.value = array_casos[indice_del_caso_selecionado].autor;
    in_body_caso.value = array_casos[indice_del_caso_selecionado].body;
    
    let categiria  = array_casos[indice_del_caso_selecionado].id_category;
    if(categiria == 1 ){
        in_categ_caso.value = 'derecho comercial';
      }else if(categiria == 2){
        in_categ_caso.value = 'derecho civil';
      }else if(categiria == 3){
        in_categ_caso.value = 'derecho laboral';
      }else if(categiria == 4){
        in_categ_caso.value = 'derecho tributario';
      }else if(categiria == 5){
        in_categ_caso.value = 'derecho financiero';
      }else if(categiria == 6){
        in_categ_caso.value = 'dderecho penal';
      }else if(categiria == 7){
        in_categ_caso.value = 'libertad financiera';
      }

      img1_update_caso.src = `${url}${array_casos[indice_del_caso_selecionado].img1}`;
      img2_update_caso.src = `${url}${array_casos[indice_del_caso_selecionado].img2}`;
      img3_update_caso.src = `${url}${array_casos[indice_del_caso_selecionado].img3}`;

    const id_caso = array_casos[indice_del_caso_selecionado].id;

    const url_img1 = array_casos[indice_del_caso_selecionado].img1.split('/');
    let url_img2 = array_casos[indice_del_caso_selecionado].img2;
    let url_img3 = array_casos[indice_del_caso_selecionado].img3;

    datos_para_actualizar_lo_casos[0] = id_caso;
    datos_para_actualizar_lo_casos[1] = url_img1[2];

    //#img2
    if(url_img2){
        url_img2 = array_casos[indice_del_caso_selecionado].img2.split('/');
        datos_para_actualizar_lo_casos[2] = url_img2[2];
    }else{
        datos_para_actualizar_lo_casos[2] = url_img2 = null;
    }

    //#img3
    if(url_img3){
        url_img3 = array_casos[indice_del_caso_selecionado].img3.split('/');
        datos_para_actualizar_lo_casos[3] = url_img3[2];
    }else{
        datos_para_actualizar_lo_casos[3] = url_img3 = null;
    }

})


function actualizar_caso(){

        //##=== Array_datos tiene = (id, img1 que son fijos) ya img2 img3 toca saber si estan o no.

        const data_caso  = new FormData(form_caso);
        data_caso.append('id_caso', datos_para_actualizar_lo_casos[0]);
        data_caso.append('old_img1', datos_para_actualizar_lo_casos[1]);
        data_caso.append('old_img2', datos_para_actualizar_lo_casos[2]);
        data_caso.append('old_img3', datos_para_actualizar_lo_casos[3]);
    
        
        const datos_validados = validar_campos(in_tit_caso.value, in_desc_caso.value, in_autor_caso.value, in_body_caso.value, true);    
        
        
        if(datos_validados){

            fetch(`${url}configuracion/actualizar_caso/`, {
                method: 'POST',
                body: data_caso
            })
                //# obtener respuesta
                .then(respuesta => respuesta.json())
                .then(datos_respuesta => {

                    
                   //# validar si el back envia 'correcto' o 'error'
                    if (datos_respuesta == true) {
                        alert('Datos Guardados Correctamente!');
                        limpiar_campos_caso();    
                        listar_casos();
                        imagen_1_caso = null;
                        imagen_2_caso = null;
                        imagen_3_caso = null;
                        cambiar_ventana_1();
    
                    }else{
                        alert('Error al Actualizar!');
                    }
            })
            .catch(err => console.log(err))
    
        }else{
            alert('No debes dejar campos vacios.');
        }

}


//cerra modal 2 // volver al 1
btn_modal2_cerrar_caso.addEventListener('click', () => {
    modal_2.classList.remove('modal_activo');
    modal_1.classList.add('modal_activo');
    ventana_modal.classList.remove('ventana2');
})



bnt_delete.addEventListener('click', ()=>{
    eliminar_caso();
});

function eliminar_caso() {

    let confirmacion = confirm(`Segura quieres eliminar el evento numero ${indice_del_caso_selecionado+1}`)

    const id = array_casos[indice_del_caso_selecionado].id
    const url_img1 = array_casos[indice_del_caso_selecionado].img1
    const url_img2 = array_casos[indice_del_caso_selecionado].img2
    const url_img3 = array_casos[indice_del_caso_selecionado].img3

    let array_url = url_img1.split('/');

    let name_img1 = array_url[2];
    let name_img2 = '';
    let name_img3 = '';

    if(url_img2 !== null){

        let array_url = url_img2.split('/');
        name_img2 = array_url[2];
        
        if(url_img3 !== null){

            let array_url = url_img3.split('/');
            name_img3 = array_url[2];

        }
    }

    
    if(confirmacion){
        
        // console.log(` ${id} ${name_img1} ${name_img2}  ${name_img3} `)
        console.log(name_img1)

        const data_delete = new FormData();
        data_delete.append('id', id);
        data_delete.append('name1_img', name_img1);
        data_delete.append('name2_img', name_img2);
        data_delete.append('name3_img', name_img3);


        fetch(`${url}configuracion/eliminar_caso/`, {
		method: 'POST',
		body: data_delete	
		})
 			//# obtener respuesta.
			.then(respuesta => respuesta.json())
			.then(datos_respuesta => {

				console.log(datos_respuesta);
                listar_casos();

			})
			.catch( err => console.log(err)) 

    }


}



function limpiar_campos_caso() {

    in_tit_caso.value = "";
    in_desc_caso.value = "";
    in_autor_caso.value = "";
    in_categ_caso.value = "";
    in_body_caso.value = "";

    // inputs valores  imagenges
    imagen_1_caso = null;
    imagen_2_caso = null;
    imagen_3_caso = null;

    //## imagenes -> 
    img1_update_caso.src = '';
    img2_update_caso.src = '';
    img3_update_caso.src = '';
}


