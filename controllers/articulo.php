<?php

  class articulo extends controllers{
    public function _construct(){
      parent::_construct();
    }
    
    public function articulo($paramtro_fun){
      
      #obtener el id que se envio por parametro junto al nombre.
      $ultimoGuionPos = strrpos($paramtro_fun, '-'); 
      $id = substr($paramtro_fun, $ultimoGuionPos + 1);

      $this->set_id_global_by_url($id);
      
      $this->ob_vista->get_vista($this, 'articulo'  );
      
    }

    #================================= METODOS ================================
    #comunicaion con EL MODELO
    public function cosultar_articulo($id){

      
      if (isset($_POST['id_art'])) {
        
        $id = $_POST['id_art']; 

        try {

          $data = $this->model->get_articulo($id);       
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
      $_SESSION['id_articulo'] = $url_id;
    }

    public function set_id_global(){

      if (isset($_POST['id_art'])) {


          session_start();

          $id = $_POST['id_art'];
          
          $_SESSION['id_articulo'] = $id;
          echo json_encode($_SESSION['id_articulo']);
      }
      
    }
    
    public function get_id_global(){

      session_start();
        $id = $_SESSION['id_articulo'];
        echo json_encode($id);
    }

  }
  
?>
