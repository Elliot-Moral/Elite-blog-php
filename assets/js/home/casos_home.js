

const url_alt_casos = 'https://www.fundacionamigosdejesus.org/';
const url_casos = 'http://localhost/elite/';


const data_casos_cards = document.getElementById('casos__data__card');
let array_casos = [];


function listar_casos() {
    fetch(`${url_casos}configuracion/listar_casos/`)

        .then(respuesta => respuesta.json())
        .then(data => monstrar_datos(data))

        .catch(error => console.log(error))

        const monstrar_datos = (data) => {
        
        
        console.log("🚀 ~ listar_casos ~ data:", data);

        
        let body = '';
        let text = '';

        for (let i = 0; i < 3; i++) {

            //recotar el texto de des a solo 28 palabras
            text = data[i].desc_caso.split(' ');
            let parrafo28 = text.slice(0, 28);
            let resultado = parrafo28.join(' ');

            num = i + 1;
            body += `<div class="noticias__card" id='${num}'>

                            <img id="img_card_noti" class="noticias__card_img" src="${url_casos + data[i].url_img1_caso}" alt="La imagen representativa del articulo ">
                    
                            <div class="noticias__data">
                                <h3 id="title_card_noti">${data[i].title_caso}</h3>
                                <ul>
                                    <li id="author_card">Cliente: ${data[i].cli_caso}</li>
                                    <li id="fecha_card">${data[i].fecha_caso}</li>
                                </ul>
                                <p id="body_card_text">${resultado}</p>
                            </div> 

                        </div>`

                // agregar los datos al array para luego manipularlos.

                array_casos.push({ 'id': data[i].id_caso, 'title': data[i].title_caso, 'desc': data[i].desc_caso, 'autor': data[i].cli_caso, 
                'body': data[i].body_caso, 'fecha': data[i].fecha_caso,  'img1': data[i].url_img1_caso, 'img2': data[i].url_img2_caso, 'img3': data[i].url_img3_caso,
                'likes': data[i].likes_caso, 'id_category': data[i].id_cat_caso,
                })
            

        }

        data_casos_cards.innerHTML = body;

    }
    
    capturar_el_elemento_acti()
}

listar_casos();

let indice_del_caso_selecionado = 0;

function capturar_el_elemento_acti() {
    setTimeout(() => {
        const columnaTabla = data_casos_cards.querySelectorAll('.noticias__card');
        columnaTabla.forEach(e => {

            e.addEventListener('click', () => {
                indice_del_caso_selecionado = e.id - 1;
                console.log("🚀 ~ e.addEventListener ~ columnaTabla:", array_casos[indice_del_caso_selecionado])
                enviar_id_caso();
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

function enviar_id_caso(){
    
    const id = array_casos[indice_del_caso_selecionado].id;

    const title_lines =  separar_lineas_titulo(array_casos[indice_del_caso_selecionado].title)

	let data_id = new FormData();
    data_id.append('id_caso', id);

    fetch(`${url}caso_de_exito/set_id_global/`, {
		method: 'POST',
		body: data_id
	})
		//obtener respuesta
		.then(respuesta => respuesta.json())
		.then(datos_respuesta => {

			console.log(datos_respuesta)

            setTimeout( function(){ 
                window.location.href = `${url}caso_de_exito/caso_de_exito/${title_lines}${id}`; 
                // window.location.href = `${url}caso_de_exito`; 

            }, 300);
		})
		.catch( err => console.log(err))

    
}
