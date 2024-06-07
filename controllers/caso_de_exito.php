<?php

  class caso_de_exito extends controllers{
    public function _construct(){
      parent::_construct();
    }

    public function caso_de_exito($paramtro_fun){

      #obtener el id que se envio por parametro junto al nombre.
      $ultimoGuionPos = strrpos($paramtro_fun, '-'); 
      $id = substr($paramtro_fun, $ultimoGuionPos + 1);

      $this->set_id_global_by_url($id);
       
      $this->ob_vista->get_vista($this, 'caso_de_exito');
     
    }

 #================================= METODOS ================================

    public function cosultar_caso($id){

      if (isset($_POST['id_caso'])) {
        
        $id = $_POST['id_caso']; 

        try {

          $data = $this->model->get_caso($id);       
          echo json_encode($data);

          } catch (Exception $e) {
            echo json_encode($e);
          }

      } else {
          echo json_encode("Error: No se recibió ningún dato del formulario.");
      }

    }

    
    public function set_id_global_by_url($url_id){
      session_start();
      $_SESSION['id_caso'] = $url_id;
    }


    public function set_id_global($url_id){

      if (isset($_POST['id_caso'])) {


          session_start();

          $id = $_POST['id_caso'];
          
          $_SESSION['id_caso'] = $id;
          echo json_encode($_SESSION['id_caso']);
      }
      
    }

    public function get_id_global(){

      session_start();
        $id = $_SESSION['id_caso'];
        echo json_encode($id);
    }

  }
?>
