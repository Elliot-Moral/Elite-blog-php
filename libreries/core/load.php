<?php

#load Esta varieble $controller esla lisma que se pasa en la url y esta declarada arriba
$controllerFile = 'controllers/'.$controlador.'.php';

#validar si existe el archivo
if(file_exists($controllerFile)){
    
  require_once($controllerFile);
  $controlador = new $controlador();  #instanciar esta variable me manda a controlador por defaul home "raro"
  #instanciar la clase con el mismo nombre del controlador

  #ahora validar el controlador
  if (method_exists($controlador, $metodo)) {
              
    $controlador->{$metodo}($parametro); //aca se llama al metodo
    
  }else{
    echo "<br> El metodo No existe mensaje desde load.php";
  }

}else{
  echo "<br> No existe el controlador";
  require_once ('controllers/error_404.php');
}



?>
