

const url_alt_art = 'https://www.fundacionamigosdejesus.org/';
const url_art = 'http://localhost/elite/';

const title_main_page = document.getElementById('title_page');



//Traer el id global.
function get_id_caso(){
    fetch(`${url_art}caso_de_exito/get_id_global/`)

    .then(respuesta => respuesta.json())
    .then(data => monstrar_datos(data))
    .catch(error => {
        
        console.error('Fetch error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
    })

    const monstrar_datos = (data) => {

        
        let id_caso = data;
        listar_otros_casos(id_caso);
        listar_caso(id_caso);

    }
}

get_id_caso();



const title = document.getElementById('title');
const desc = document.getElementById('desc');
const fecha = document.getElementById('fecha');
const main_img = document.getElementById('main_img');
const body = document.getElementById('parrafo');
const secun_img = document.getElementById('secun_img');
const terce_img = document.getElementById('terce_img');



function listar_caso(id_articulo) {

    const data_id = new FormData();
    data_id.append('id_caso', id_articulo);

    fetch(`${url}caso_de_exito/cosultar_caso/`, {
    method: 'POST',
    body: data_id	
    })
         //# obtener respuesta
        .then(respuesta => respuesta.json())
        .then(data => {

            title_main_page.textContent = `Caso de exito | ${data.title_caso}`;
            title.textContent = data.title_caso;
            desc.textContent = data.desc_caso;
            fecha.textContent = data.fecha_caso
            main_img.src = `${url_art}${data.url_img1_caso}`;
            body.textContent = data.body_caso;
            secun_img.src = `${url_art}${data.url_img2_caso}`
            terce_img.src = `${url_art}${data.url_img3_caso}`

        })

        .catch( err => console.log(err)) 
 

}


function listar_otros_casos(id_caso){
    
    const content_other_cards = document.getElementById('data_other_cards')
    
    fetch(`${url_art}configuracion/listar_casos/`)
    
    .then(respuesta => respuesta.json())
    .then(data => monstrar_datos(data))
    .catch(error => {
        
        console.error('Fetch error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
    })
    
    const monstrar_datos = (data) => {
        
            
        let body_card = '';

        data.map(card => {
    

            if(Number(id_caso) !== card.id_caso){
                body_card += `
    
                <div class="card__articulos" id="${card.id_caso}">

                    <h3>${card.title_caso}</h3>
                    <hr class="card__hr">

                    <div class="card__data">

                    
                        <div class="card__data-meta">
                            <p>${card.desc_caso}</p>
                            <span >Por: ${card.cli_caso}</span>
                            <span >Fecha: ${card.fecha_caso}4</span>
                        </div>

                        <div>
                            <img class="card__img" src="${url_art}${card.url_img1_caso}" alt="">
                        </div>

                    </div>

                </div>`

            }

        
        })
        
        content_other_cards.innerHTML = body_card;
        capturar_card()

    }
}


async function capturar_card(){
    const cards = document.querySelectorAll('.card__articulos')
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.getAttribute('id'));
            const title = card.childNodes[1].textContent;
            enviar_id_caso(id, title)
        })
    })
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


//#enviar el id para cargar el siguente articulo
function enviar_id_caso(id, title){

    const title_lines =  separar_lineas_titulo(title)

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