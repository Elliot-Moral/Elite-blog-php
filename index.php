<?php
  
  
  require_once('Config/config.php');
  require_once('Helpers/helpers.php');

  $url = !empty($_GET['url']) ? $_GET['url'] : 'home/home';
  $arr_url = explode("/", $url);// se crea un arreglo. este metodo divide un estring segun el delimitador.
  $controlador = $arr_url[0];
  $metodo = $arr_url[0];
  $parametro = "";

  if(!empty($arr_url[1]))
  {
    if ($arr_url[1] != '')
    {
      $metodo = $arr_url[1];
    }
  }
  //ver si hay parametros
  if(!empty($arr_url[2]))
  {
    if ($arr_url[2] != '') {
      for ($i=2; $i < count($arr_url) ; $i++)
      {
        $parametro .= $arr_url[$i].',';
        // .= se usa para concatenar OJO muy UTIL

      }
      $parametro = trim($parametro, ',');
      //trim() eliminar el ultimo caracter
      //necesita la bariable y el caracter a liminar
    }
  }

require_once ('Libreries/Core/autoload.php');
require_once ('Libreries/Core/load.php');


?>
