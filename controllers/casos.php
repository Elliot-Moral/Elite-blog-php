<?php

  class agenda extends controllers{
    public function _construct(){
      parent::_construct();
    }

    public function agenda($paramtro_fun){

      $this->ob_vista->get_vista($this, 'agenda' );
     
    }

 #================================= METODOS ================================
    #comunicaion con EL MODELO>>>>>>>>>>>>>
    public function listar_agenda(){
      $data = $this->model->get_agenda();
      $j_data = json_encode($data);
      echo $j_data;
    }

  }
?>
