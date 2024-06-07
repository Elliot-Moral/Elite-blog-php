<?php
 
  class home extends controllers{
      
    public function _construct(){
      parent::_construct();
    }

    public function home($paramtro_fun){ //se puede quitar el parametro ya que
      #este viene vacio desde el index
      #echo "<br>";
      #echo "<br> EL mparametro recibido desde clase home metodo home capturado de la url por index.php es: ".$paramtro_fun;

      #cargar la vista
      $this->ob_vista->get_vista($this, 'home' );
      #echo '<h1>Mensaje Desde El Controlador Home</h1>';
      #data es array que contiene toda la informacion de nuetsra pagina

    }


  }
?>
