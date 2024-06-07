//captuara el año actual y ponerlo en futter
const span_footer_año = document.getElementById('yeard_current');
const fechaActual = new Date();
const añoActual = fechaActual.getFullYear();
span_footer_año.textContent = añoActual;