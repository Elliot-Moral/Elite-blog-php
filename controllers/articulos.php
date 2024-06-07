<?php

  class articulos extends controllers{
    public function _construct(){
      parent::_construct();
    }

    public function articulos($articulo_id){

      $this->ob_vista->get_vista($this, 'articulos' );
     
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
