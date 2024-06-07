<?php

spl_autoload_register(function ($class){
  if(file_exists(LIBRERIAS.'core/'.$class.'.php')){
    require_once(LIBRERIAS.'core/'.$class.".php");
    #echo " autoload llama a la clase ".$class;
  }
});

?>
