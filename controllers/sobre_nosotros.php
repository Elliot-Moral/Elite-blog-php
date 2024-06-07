<?php

  class sobre_nosotros extends controllers{
    public function _construct(){
      parent::_construct();
    }

    public function sobre_nosotros($paramtro_fun){

      $this->ob_vista->get_vista($this, 'sobre_nosotros' );
     
    }

 #================================= METODOS ================================

  }
?>
