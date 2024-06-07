<?php

  class conexcion
  {
    private $connect;

    function __construct()
    {

      try {
        $connection_string = "mysql:host=".DB_HOST.";dbname=".DB_DATA_BASE.";charset=utf8";
        $this->connect = new PDO($connection_string, DB_USER, DB_PASSWORD);
        $this->connect->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        #echo '<strong>conexion exitosa from: class Conexcion</strong>';

      } catch (\Exception $e) {
        echo ("1 ERROR: ".$e->getMessage()); //el evento que maneja errires
      }
      
       #echo " hi from conexion";
             
    }

    public function retorneme_connect(){
      return $this->connect;
      #echo "hola retorneme_connect() si me llaman";
      
    }


  }
  #$connexion = new Conexcion();
  #$connexion->name();
?>
