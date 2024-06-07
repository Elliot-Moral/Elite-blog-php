//============= ACA ESTOY ENVIARDO LOS DATOS AL SERVERDIOR ============
//se envian por fetch a la clase controlador login quen valida los datos.
const url_alt = 'https://www.fundacionamigosdejesus.org/';
const url = 'http://localhost/elite/';

const form = document.getElementById('formulario_login');

form.addEventListener('submit', (e) =>{
	
	//util para formularios
	e.preventDefault();

	//algo nuevo en javascript para mi!
	let datos_formulario = new FormData(form);

	//enviar los datos a la api backend
	fetch(`${url}login/recibir_datos/`, {
		method: 'POST',
		body: datos_formulario
	})
		//obtener respuesta
		.then(respuesta => respuesta.json())
		.then(datos_respuesta => {

			//validar si el back envia 'correcto' o 'error'
			if(datos_respuesta == 'correcto'){

				// console.log(datos_respuesta)
				// Redireccionamiento tras 0.5 segundos
				 setTimeout( function(){ 
				 	window.location.href = `${url}configuracion`; 

				 }, 500);
			}else if(datos_respuesta == 'error'){
				alert('Llenar Todos Los Campos');
			}else{
				alert('Contraseña o usuario incorrecta!!!');
			}
		})
		.catch( err => console.log(err))

})