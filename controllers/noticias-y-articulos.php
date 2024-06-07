<?php

  class agenda extends controllers{
    public function _construct(){
      parent::_construct();
    }

    public function agenda($paramtro_fun){

      $this->ob_vista->get_vista($this, 'agenda' );
     
    }

 #================================= METODOS ================================

  }
?>
