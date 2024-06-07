/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/* Menu show */
navToggle.addEventListener('click', () =>{
   navMenu.classList.add('show-menu')
})

/* Menu hidden */
navClose.addEventListener('click', () =>{
   navMenu.classList.remove('show-menu')
})

/*=============== SEARCH ===============*/
const search = document.getElementById('search'),
      searchBtn = document.getElementById('search-btn'),
      searchClose = document.getElementById('search-close')

/* Search show */
searchBtn.addEventListener('click', () =>{
   search.classList.add('show-search')
})

/* Search hidden */
searchClose.addEventListener('click', () =>{
   search.classList.remove('show-search')
})

/*=============== LOGIN ===============*/
const login = document.getElementById('login'),
      loginBtn = document.getElementById('login-btn'),
      loginClose = document.getElementById('login-close')

/* Login show */
loginBtn.addEventListener('click', () =>{
   login.classList.add('show-login')
})

/* Login hidden */
loginClose.addEventListener('click', () =>{
   login.classList.remove('show-login')
})


/* abrir modal programa abogado */
const padre_modal = document.getElementById('padre_modal'),
      home__abrid_modal = document.getElementById('home__abrid_modal');
      card_cerrar_modal = document.getElementById('card_cerrar_modal');

//# modal show 

home__abrid_modal.addEventListener('click', () =>{
   padre_modal.classList.add('show-modal')
});


//# modal hide 
card_cerrar_modal.addEventListener('click', () =>{
   padre_modal.classList.remove('show-modal')
});



//## funcionalidad de las cards mision y vision

let cards = document.querySelectorAll(".card");
let playing = false;

cards.forEach(elem => {

   elem.addEventListener('click',function() {

   if(playing)
     return;
   
   playing = true;

   anime({
     targets: elem,
     scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
     rotateY: {value: '+=180', delay: 200},
     easing: 'easeInOutSine',
     duration: 400,
     complete: function(anim){
        playing = false;
     }
   });
 });

})


document.addEventListener("DOMContentLoaded", function() {
   let zindex = 10;
   let cards = document.querySelectorAll("div.card_servicios");
 
   cards.forEach(function(card) {
     card.addEventListener("click", function(e) {
       e.preventDefault();
 
       let isShowing = false;
 
       if (this.classList.contains("show")) {
         isShowing = true;
       }
 
       let cardsContainer = document.querySelector("div.contenedor__cards_servicios");
 
       if (cardsContainer.classList.contains("showing")) {
         // A card is already in view
         let showingCard = document.querySelector("div.card_servicios.show");
         showingCard.classList.remove("show");
 
         if (isShowing) {
           // This card was showing - reset the grid
           cardsContainer.classList.remove("showing");
         } else {
           // This card isn't showing - get in with it
           this.style.zIndex = zindex;
           this.classList.add("show");
         }
 
         zindex++;
 
       } else {
         // No cards in view
         cardsContainer.classList.add("showing");
         this.style.zIndex = zindex;
         this.classList.add("show");
 
         zindex++;
       }
     });
   });
 });



 //### funcionalidad de poner la vista al click del nav y me de la sesion si mochar el titulo
 


 //## funcionalidad de ir al home desde la imagen.