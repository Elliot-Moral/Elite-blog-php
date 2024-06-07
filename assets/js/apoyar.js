
const cardsApoyar = document.querySelectorAll('.about__card');
const ventana = document.querySelectorAll('.about__ventana');
const fomularios = document.querySelectorAll('.about__ventana-form');

const url_alt = 'https://www.fundacionamigosdejesus.org/';

cardsApoyar.forEach((card, index)=>{
    if(index == 0){
        card.addEventListener('click', abrirVentana_card);
    }else if(index == 1){
        card.addEventListener('click', abrirVentana_card2);
    }
    else if(index == 2){
        card.addEventListener('click', abrirVentana_card3);
    }

})


function abrirVentana_card(){
    const form = ventana[0].querySelectorAll('.about__ventana-form');
    form[0].classList.add('form_active');
    form[1].classList.remove('form_active');
    ventana[0].classList.add('active');

    //cerrar todas
    const form2 = ventana[1].querySelectorAll('.about__ventana-form');
    form2[0].classList.remove('form_active');
    form2[1].classList.remove('form_active');

    ventana[1].classList.remove('active');

    //cerrar todas
    const form3 = ventana[2].querySelectorAll('.about__ventana-form');
    form3[0].classList.remove('form_active');
    form3[1].classList.remove('form_active');
    
    ventana[2].classList.remove('active');

}


function abrirVentana_card2(){
    const form = ventana[1].querySelectorAll('.about__ventana-form');
    form[0].classList.add('form_active');
    form[1].classList.remove('form_active');
    ventana[1].classList.add('active');


    //cerrar todas
    const form2 = ventana[0].querySelectorAll('.about__ventana-form');
    form2[0].classList.remove('form_active');
    form2[1].classList.remove('form_active');
    ventana[0].classList.remove('active');

    //cerrar todas
    const form3 = ventana[2].querySelectorAll('.about__ventana-form');
    form3[0].classList.remove('form_active');
    form3[1].classList.remove('form_active');
    ventana[2].classList.remove('active');
}


function abrirVentana_card3(){
    const form = ventana[2].querySelectorAll('.about__ventana-form');
    ventana[2].classList.add('active');
    form[0].classList.add('form_active');
    form[1].classList.remove('form_active');


        //cerrar todas
        const form2 = ventana[0].querySelectorAll('.about__ventana-form');
        form2[0].classList.remove('form_active');
        form2[1].classList.remove('form_active');

        ventana[0].classList.remove('active');
    
        //cerrar todas
        const form3 = ventana[1].querySelectorAll('.about__ventana-form');
        form3[0].classList.remove('form_active');
        form3[1].classList.remove('form_active');
        ventana[1].classList.remove('active');
}



// BOTONES VENTANA 1
const bnt_siguiente_form1 = document.getElementById('form__bnt-next-form1');
bnt_siguiente_form1.addEventListener('click', (e) => {
    e.preventDefault();
    const form = ventana[0].querySelectorAll('.about__ventana-form');
    form[0].classList.remove('form_active');
    form[1].classList.add('form_active');
})

const bnt_atras_form1 = document.getElementById('bnt_atras-form1');
bnt_atras_form1.addEventListener('click', (e) => {
    e.preventDefault();
    const form = ventana[0].querySelectorAll('.about__ventana-form');
    form[1].classList.remove('form_active');
    form[0].classList.add('form_active');
})




// BOTONES VENTANA 2
const bnt_siguiente_form2 = document.getElementById('form__bnt-next-form2');
bnt_siguiente_form2.addEventListener('click', (e) => {
    e.preventDefault();
    const form = ventana[1].querySelectorAll('.about__ventana-form');
    form[0].classList.remove('form_active');
    form[1].classList.add('form_active');
})

const bnt_atras_form2 = document.getElementById('bnt_atras-form2');
bnt_atras_form2.addEventListener('click', (e) => {
    e.preventDefault();
    const form = ventana[1].querySelectorAll('.about__ventana-form');
    form[1].classList.remove('form_active');
    form[0].classList.add('form_active');
})



// BOTONES VENTANA 3
const bnt_siguiente_form3 = document.getElementById('form__bnt-next-form3');
bnt_siguiente_form3.addEventListener('click', (e) => {
    e.preventDefault();
    const form = ventana[2].querySelectorAll('.about__ventana-form');
    form[0].classList.remove('form_active');
    form[1].classList.add('form_active');
})

const bnt_atras_form3 = document.getElementById('bnt_atras-form3');
bnt_atras_form3.addEventListener('click', (e) => {
    e.preventDefault();
    const form = ventana[2].querySelectorAll('.about__ventana-form');
    form[1].classList.remove('form_active');
    form[0].classList.add('form_active');
})


//capturar los montos de los cirulos segun la donacion
const monto_circle = document.querySelectorAll('.form__circle');


// Función para manejar el evento de clic en los elementos
function handleClick() {
    // Eliminar la clase "selected" de todos los elementos
    monto_circle.forEach(function(elemento) {
      elemento.classList.remove('selected');
    });
    // Agregar la clase "selected" al elemento clicado
    this.classList.add('selected');
        // Verificar si el elemento clicado es el elemento "otro"
        if (this.id === 'otro') {

            const especificar_monto = document.querySelectorAll('.espefifico');
            // Asignar el evento de clic a cada elemento
              especificar_monto.forEach(function(elemento) {
                elemento.classList.remove('desactivado');
            });

        }else{

            const especificar_monto = document.querySelectorAll('.espefifico');
            // Asignar el evento de clic a cada elemento
            especificar_monto.forEach(function(elemento) {
              elemento.classList.add('desactivado');
          });
        }
  }



  // Asignar el evento de clic a cada elemento
  monto_circle.forEach(function(elemento) {
    elemento.addEventListener('click', handleClick);
  });