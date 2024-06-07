/*==================== SLIDER HOME INICIO BANNER ====================*/
var slides = document.querySelectorAll('.slider__side');
var botones = document.querySelectorAll('.slider__btn');
let boton_actual = 1;

// bloque para seleccionar las imagnes manualmente

var navegacion_manual = function(manual){
// y acá de quita la clase active despues de pulsar por segunda vez el
// boton osa uno cliquea se agrega la clase y si pulsa en otro boton
// se quita la clase del primer elemento y se agreana en el otro que se
// pulso. 
  slides.forEach( (slide) => {
    slide.classList.remove('activado');
  });
  botones.forEach( (boton) =>{
    boton.classList.remove('activado');
  });
// aca se agrega la clase activado despues de pusar el boton
  slides[manual].classList.add('activado');
  botones[manual].classList.add('activado');
}
botones.forEach( (boton, i) => {
  boton.addEventListener('click', ()=>{
    navegacion_manual(i);
    boton_actual = i;
  });
});


// bloque para slider de imagnes automatico.

 var repetir = function(activeClass){
      let activado = document.getElementsByClassName('activado');
      let i = 1;

      var repetidor = () => {
        setTimeout(function(){
          [...activado].forEach((activar_slide) => {
            activar_slide.classList.remove('activado');
          });

          slides[i].classList.add('activado');
          botones[i].classList.add('activado');
          i++;

          if(slides.length == i){
            i = 0;
          }
          if(i >= slides.length){
            return;
          }
          repetidor();
        }, 10000);
      }
      repetidor();
    }
    repetir();

    

/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*===== ACTIVE AND REMOVE MENU =====*/
const navLink = document.querySelectorAll('.nav__link');   

function linkAction(){
  /*Active link*/
  navLink.forEach(n => n.classList.remove('active'));
  this.classList.add('active');
  
  /*Remove menu mobile*/
  const navMenu = document.getElementById('nav-menu')
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

/*SCROLL HOME*/
sr.reveal('.home__title',{}); 
sr.reveal('.button',{delay: 200}); 
sr.reveal('.home__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 

// /*SCROLL ABOUT*/
sr.reveal('.about__img',{}); 
sr.reveal('.about__subtitle',{delay: 400}); 
sr.reveal('.about__text',{delay: 400}); 

// SCROLL SKILLS
// sr.reveal('.skills__subtitle',{}); 
// sr.reveal('.skills__text',{}); 
// sr.reveal('.skills__data',{interval: 200}); 
// sr.reveal('.skills__img',{delay: 600});

// /*SCROLL WORK*/
// sr.reveal('.work__img',{interval: 200}); 

// /*SCROLL CONTACT*/
// sr.reveal('.contact__input',{interval: 200}); 


/*Redireccionar las cards*/
const cards = document.querySelectorAll('.programas__card');


cards.forEach(function(elemento, index) {

  if(index == 0){
    elemento.addEventListener('click', importante)
  }else if(index == 1){
    elemento.addEventListener('click', habilidades)
  }
  else if(index == 2){
    elemento.addEventListener('click', salud)
  }
  else if(index == 3){
    elemento.addEventListener('click', util)
  }

});

function importante(){
  window.location.href = "soyimportante"
}
function habilidades(){
  window.location.href = "saludybienestar"
}
function salud(){
  window.location.href = "habilidades"
}
function util(){
  window.location.href = "soyutil"
}




//**Informacion del desarrollador como sooporte laboral 07-01-2022.**

const Desarrollador = "Hola soy Andres Morales Desarrollador web, este proyecto lo hice yo."
const info_desarrollador = " mi numero es +57 304-600-5171 colombia"
console.log(Desarrollador + info_desarrollador);
console.log("mi facebook: https://www.facebook.com/amoralesdias/");



