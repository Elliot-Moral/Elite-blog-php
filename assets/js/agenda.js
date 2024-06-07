const url_alt = 'https://www.fundacionamigosdejesus.org/';
const url = 'http://localhost/funaje/';


const meses = [
    { nombre: "Enero", dias: 31 },
    { nombre: "Febrero", dias: 28 }, // En un año no bisiesto
    { nombre: "Marzo", dias: 31 },
    { nombre: "Abril", dias: 30 },
    { nombre: "Mayo", dias: 31 },
    { nombre: "Junio", dias: 30 },
    { nombre: "Julio", dias: 31 },
    { nombre: "Agosto", dias: 31 },
    { nombre: "Septiembre", dias: 30 },
    { nombre: "Octubre", dias: 31 },
    { nombre: "Noviembre", dias: 30 },
    { nombre: "Diciembre", dias: 31 }
];

//me traigo el contenedor donde voy a poner los dias del mes.
const body_dias = document.getElementById('body_dias');


//capturar el mes del año en un entero.
const fechaActual = new Date();
// Obtener el mes actual (los meses en JavaScript están indexados desde 0)
const mesActual = fechaActual.getMonth() + 1; // Sumamos 1 para ajustar el índice a partir de 1

// ponerlo en el heard del calenrdario.
const title = document.getElementById('mes_actual');
title.textContent = meses[mesActual-1].nombre;

// Obtener el año actual
const yeard = document.getElementById('year_actual');
const añoActual = fechaActual.getFullYear();
yeard.textContent = añoActual;




let eventosFuanje = [];

function listar_clientes(){

	fetch(`${url}agenda/listar_agenda`)

    	.then(respuesta => respuesta.json())
        .then(data => monstrar_datos(data) )

        .catch(error => console.log(error))

	        const monstrar_datos = (data) =>{

                for (let j = 1; j <= meses[mesActual].dias; j++) {

                    const nuevoElemento = document.createElement('div');
                    nuevoElemento.classList.add('about__calendar-number');
                    nuevoElemento.textContent = j;

                            if(j % 7 === 0){
                                nuevoElemento.classList.add('about__calendar-number', 'domingo');
                            }

                            for (let i = 0; i<data.length; i++) {

                                if(data[i].dia_agen === j){
                                    nuevoElemento.classList.add('about__calendar-number', 'agend_active');
                                    nuevoElemento.setAttribute('title', `${data[i].tit_agen}`); 
                                    nuevoElemento.setAttribute('id', `${i+1}`); 
                                }        
                                
                                // agregar los datos al array para luego manipularlos.
                                if(eventosFuanje.length < data.length ){
                                    eventosFuanje.push({'id': data[i].id_agen, 'title': data[i].tit_agen, 'desc': data[i].desc_agen, 'url': data[i].img_agen,})  
                                }
                            }

                        body_dias.appendChild(nuevoElemento);

                }
	        }
}

listar_clientes();


const diaActual = fechaActual.getDate();

setTimeout(()=>{

    const elementos = document.querySelectorAll('.about__calendar-number');
    const divPadre =   document.querySelector('.elementos');

    elementos.forEach(e => {

        //discriminar quines tiene id que son los eventos 
        if(e.getAttribute('id')){
            e.addEventListener('click', ()=>{
                //monstrar CARDS
    
                
                //captuar el id.
                const id_evento = e.getAttribute('id')
                // console.log(id_evento)
                abrir_modal(id_evento - 1);
            });
        }
        
        //colorear en el calendario en dia actual.
        if(e.textContent == diaActual){

            if(e.classList.contains("agend_active")){
                e.classList.add("dia_actual_letra");
            }else{
                e.classList.add("dia_actual_fondo");
            }
        }

    })
}, 1000)

function abrir_modal(id){
            
            //capturar los elementos
            const modal = document.getElementById('modal');
            const img = document.getElementById('img_modal');
            const titulo = document.getElementById('titleModal');
            const description = document.getElementById('modal_description');

            //abrir modal
            modal.classList.add("abrir_modal");

            //Pimero cargar los datos.
            titulo.textContent = eventosFuanje[id].title;
            description.textContent = eventosFuanje[id].desc;
            img.src = eventosFuanje[id].url;

}


// cerrar el modal
function cerrar_modal(){
    const modal = document.getElementById('modal');
    const bnt_modal = document.getElementById('btn_modal');
    bnt_modal.addEventListener('click', ()=>{
            modal.classList.remove("abrir_modal");
    })
}

cerrar_modal();


