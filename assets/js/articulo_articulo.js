

const url_alt_art = 'https://www.fundacionamigosdejesus.org/';
const url_art = 'http://localhost/elite/';

const data_aritculo = document.getElementById('aritculo_data');
const title_main_page = document.getElementById('title_page');

//Traer el id global.
function get_id_arti(){
    fetch(`${url_art}articulo/get_id_global/`)

    .then(respuesta => respuesta.json())
    .then(data => monstrar_datos(data))
    .catch(error => {
        
        console.error('Fetch error:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
    })

    const monstrar_datos = (data) => {

        
        let id_articulo = data;
        listar_articulo(id_articulo);
        listar_otros_articulos(id_articulo)
    }
}
get_id_arti();



const title = document.getElementById('title');
const desc = document.getElementById('desc');
const fecha = document.getElementById('fecha');
const main_img = document.getElementById('main_img');
const primeros_parrafos = document.getElementById('parrafo123');
const next_parrafos = document.getElementById('next_parrafos');
const secun_img = document.getElementById('secun_img');
const terce_img = document.getElementById('terce_img');



function listar_articulo(id_articulo) {

    const data_id = new FormData();
    data_id.append('id_art', id_articulo);

    function formatear_body_articulo(body){
        const arrayparrafos = body.split('|')

        let ArroyFinalParrafos = []

        let primeros3 = []
        let resto_de_parrafos = []
        
        arrayparrafos.map((parrafo, index )=> {
            if(index >= 0 && index <= 2){
                primeros3[index] =  `<br>${parrafo}</br>`    
                // alert(primeros3)

            }else{ 
                resto_de_parrafos[index] = `<br>${parrafo}</br>` 
            }
        })
        
        primeros_parrafos.innerHTML =  primeros3;
        next_parrafos.innerHTML =  resto_de_parrafos;

        // ArroyFinalParrafos[0] = primeros3
        // ArroyFinalParrafos[1] = resto_de_parrafos

            console.log(arrayparrafos)


        // return ArroyFinalParrafos;
        
       
        
    }

    fetch(`${url}articulo/cosultar_articulo/`, {
    method: 'POST',
    body: data_id	
    })
         //# obtener respuesta
        .then(respuesta => respuesta.json())
        .then(data => {

           formatear_body_articulo(data.body_art);
            // console.log(body_parrafos)

            title_main_page.textContent = `Articlos Y Noticias | ${data.title_art}`;
            title.textContent = data.title_art;
            desc.textContent = data.desc_art;
            fecha.textContent = data.fecha_art
            main_img.src = `${url_art}${data.url_img1_art}`;

            // body_parrafos[0].map(p => {
            //     primeros_parrafos.innerHTML = p
            // });

            // primeros_parrafos.innerHTML =  body_parrafos[0];
            // next_parrafos.innerHTML =  body_parrafos[1];

            secun_img.src = `${url_art}${data.url_img2_art}`
            terce_img.src = `${url_art}${data.url_img3_art}`     
    

        })

        .catch( err => console.log(err)) 
 

}

function listar_otros_articulos(id_articulo){
    
    const content_other_cards = document.getElementById('data_other_cards')
    
    fetch(`${url_art}configuracion/listar_articulos/`)
    
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
    

            if(Number(id_articulo) !== card.id_art){
                body_card += `
    
                <div class="card__articulos" id="${card.id_art}">

                    <h3>${card.title_art}</h3>
                    <hr class="card__hr">

                    <div class="card__data">

                    
                        <div class="card__data-meta">
                            <p>${card.desc_art}</p>
                            <span >Por: ${card.autor_art}</span>
                            <span >Fecha: ${card.fecha_art}4</span>
                        </div>

                        <div>
                            <img class="card__img" src="${url_art}${card.url_img1_art}" alt="">
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
            enviar_id_articulo(id, title);
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
function enviar_id_articulo(id, title){

    const title_lines =  separar_lineas_titulo(title)

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
