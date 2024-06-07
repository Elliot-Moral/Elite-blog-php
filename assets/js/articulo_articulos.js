

const url_alt_art = 'https://www.fundacionamigosdejesus.org/';
const url_art = 'http://localhost/elite/';


const data_articulos_cards = document.getElementById('articulos__data__card');
let acticulosArray = [];


function listar_articulos() {
    fetch(`${url_art}configuracion/listar_articulos/`)

        .then(respuesta => respuesta.json())
        .then(data => monstrar_datos(data))

        .catch(error => console.log(error))

        const monstrar_datos = (data) => {
        
        
        console.log("🚀 ~ listar_articulos ~ data:", data)

        
        let body = '';
        let text = '';

        for (let i = 0; i < data.length; i++) {

            //recotar el texto de des a solo 28 palabras
            text = data[i].desc_art.split(' ');
            let parrafo28 = text.slice(0, 28);
            let resultado = parrafo28.join(' ');

            num = i + 1;
            body += `<div class="noticias__card" id='${num}'>

                            <img id="img_card_noti" class="noticias__card_img" src="${url_art + data[i].url_img1_art}" alt="La imagen representativa del articulo ">
                    
                            <div class="noticias__data">
                                <h3 id="title_card_noti">${data[i].title_art}</h3>
                                <ul>
                                    <li id="author_card">${data[i].autor_art}</li>
                                    <li id="fecha_card">${data[i].fecha_art}</li>
                                </ul>
                                <p id="body_card_text">${resultado}</p>
                            </div> 

                        </div>`

            // agregar los datos al array para luego manipularlos.
            if (acticulosArray.length < data.length) {
                acticulosArray.push({ 'id': data[i].id_art, 'title': data[i].title_art, 'desc': data[i].desc_art, 'autor': data[i].autor_art, 
                'body': data[i].body_art, 'fecha': data[i].fecha_art,  'img1': data[i].url_img1_art, 'img2': data[i].url_img2_art, 'img3': data[i].url_img3_art,
                'likes': data[i].likes_art, 'id_category': data[i].id_cat_art,
                })
            }

        }

        data_articulos_cards.innerHTML = body;

    }
    
    capturar_el_elemento_acti()
}

listar_articulos()

let indice_del_actividad_selecionado = 0;

function capturar_el_elemento_acti() {
    setTimeout(() => {
        const columnaTabla = data_articulos_cards.querySelectorAll('.noticias__card');
        columnaTabla.forEach(e => {

            e.addEventListener('click', () => {
                indice_del_actividad_selecionado = e.id - 1;
                console.log("🚀 ~ e.addEventListener ~ columnaTabla:", acticulosArray[indice_del_actividad_selecionado])
                enviar_id_arti();
            })
        })

    }, 700)
}


//ejemplo hola mundo  => hola-munodo
function separar_lineas_titulo(title){
    const array_title = title.split(' ');
    let title_con_lineas = '';
    array_title.map(word => {
        title_con_lineas +=  `${word}-`
    });
    return title_con_lineas;
}


function enviar_id_arti(){

    let id = acticulosArray[indice_del_actividad_selecionado].id;
    const title_lines =  separar_lineas_titulo(acticulosArray[indice_del_actividad_selecionado].title)


	let data_id = new FormData();
    data_id.append('id_art', id);

    fetch(`${url}articulo/set_id_global/`, {
		method: 'POST',
		body: data_id
	})
		//obtener respuesta
		.then(respuesta => respuesta.json())
		.then(datos_respuesta => {

			console.log(datos_respuesta)

            setTimeout( function(){ 
                window.location.href = `${url}articulo/articulo/${title_lines}${id}`; 
                // window.location.href = `${url}articulo`; 

            }, 300);
		})
		.catch( err => console.log(err))

    
}

